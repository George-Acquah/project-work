/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ConflictException,
  Injectable,
  Logger,
  NotAcceptableException,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import mongoose, { AnyExpression, ClientSession, Model, Types } from 'mongoose';
import { CreateUserDto } from './dtos/create-users.dto';
import { Customer } from 'src/shared/schemas/customer.schema';
import { ParkOwner } from 'src/shared/schemas/owner.schema';
import { sanitizeUser, sanitizeUserImage } from 'src/shared/utils/users.utils';
import {
  _ICustomer,
  _IDbProfile,
  _IParkOwner,
  _ISanitizedCustomer,
  _ISanitizedParkOwner,
  _IUpdatedUserRes,
  _TSanitizedUser,
  _TUser
} from 'src/shared/interfaces/users.interface';
import { LoginUserDto } from './dtos/login-users.dtos';
import {
  _ICloudRes,
  _IDbUserImage,
  _IUserImage
} from 'src/shared/interfaces/images.interface';
import { AggregationService } from 'src/aggregation.service';
import { TransactionService } from 'src/transaction.service';
import {
  _INewProfile,
  _IRegisterResponse,
  _IUsersTable
} from 'src/shared/interfaces/refactored/user.interface';
import {
  sanitizeAdminUserFn,
  sanitizeUserFn
} from 'src/shared/helpers/users.sanitizers';
import { CREATE_PIPELINE } from 'src/shared/enums/general.enum';
import { FETCH_USERS_BY_ADMIN_AGGREGATION } from 'src/shared/constants/users.constants';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class UsersService {
  private logger = new Logger(UsersService.name);
  private projectCreateFields = ['email', 'userType'];
  constructor(
    @InjectModel('User') private userModel: Model<_TUser>,
    @InjectModel(Customer.name) private customerModel: Model<_ICustomer>,
    @InjectModel(ParkOwner.name)
    private parkOwnerModel: Model<_IParkOwner>,
    @InjectModel('Profile') private profileModel: Model<_IDbProfile>,
    @InjectModel('UserImage') private userImageModel: Model<_IDbUserImage>,
    private readonly aggregationService: AggregationService,
    private readonly mailService: MailService
  ) {}

  async populateUserFields<T>(
    users: _TUser[],
    fields: string,
    deepFields = ''
  ): Promise<T | any> {
    const populatedUsers = await Promise.all(
      users.map(async (user) => {
        const populatedUser = await this.userModel.populate(user, {
          path: fields,
          strictPopulate: false,
          populate: {
            path: deepFields,
            strictPopulate: false
          }
        });
        return populatedUser;
      })
    );

    return populatedUsers;
  }

  async returnId(email: string) {
    return await this.aggregationService.returnIdPipeline(
      this.userModel,
      email
    );
  }

  async addUserImage(userImage: _ICloudRes, id: string): Promise<_IUserImage> {
    try {
      const { publicUrl, ...image } = userImage;

      const savedImage = new this.userImageModel({
        userId: id,
        ...image
      });

      await savedImage.save();

      return sanitizeUserImage(savedImage);
    } catch (error) {
      throw new Error(error);
    }
  }

  async createCustomer(
    userDetails: CreateUserDto
  ): Promise<_IRegisterResponse> {
    try {
      const uniqueFields = { email: userDetails.email };

      const sanitizedCustomer =
        await this.aggregationService.createDocumentPipeline<
          _ICustomer,
          _IRegisterResponse
        >(
          this.customerModel,
          this.projectCreateFields,
          userDetails,
          uniqueFields,
          ['Email', 'Account'],
          CREATE_PIPELINE.USER,
          sanitizeUserFn
        );

      await this.createProfile(sanitizedCustomer._id);

      await this.mailService.sendTest();
      return sanitizedCustomer;
    } catch (error) {
      throw error;
    }
  }

  async createProfile(user_id: string) {
    try {
      const existingProfile = await this.profileModel.findOne({
        user: user_id
      });
      if (existingProfile) {
        throw new ConflictException(`This user already has a profile exists`);
      }
      const profile = new this.profileModel({ user: user_id });
      await profile.save();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async createOwner(userDetails: CreateUserDto): Promise<_IRegisterResponse> {
    const uniqueFields = { email: userDetails.email };

    const sanitizedOwner = await this.aggregationService.createDocumentPipeline<
      _IParkOwner,
      _IRegisterResponse
    >(
      this.parkOwnerModel,
      this.projectCreateFields,
      userDetails,
      uniqueFields,
      ['Email', 'Account'],
      CREATE_PIPELINE.USER,
      sanitizeUserFn
    );
    await this.createProfile(sanitizedOwner._id);
    return sanitizedOwner;
  }

  async findByLogin(loginData: LoginUserDto) {
    const { email, password } = loginData;
    try {
      const user = await this.userModel.findOne({ email });
      if (!user) {
        throw new NotFoundException('Incorrect email');
      }

      if (await bcrypt.compare(password, user.password)) {
        return sanitizeUser(user);
      } else {
        // Passwords don't match, throw UnauthorizedException
        throw new NotAcceptableException('Incorrect password');
      }
    } catch (error) {
      // Entity not found or other error occurred, throw appropriate error
      throw new Error(error.message);
    }
  }

  /* used by  modules to search user by email */
  async findUser(email: string): Promise<_TUser> {
    try {
      const user = await this.userModel
        .findOne({ email })
        .populate({
          path: 'image profile vehicles centers',
          strictPopulate: false,
          populate: {
            path: 'images center_images',
            strictPopulate: false
          }
        })
        .exec();

      if (!user) {
        throw new NotFoundException(`User with email ${email} does not exist.`);
      } else {
        return user;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findOne(userId: string): Promise<_TSanitizedUser> {
    try {
      const foundUser = await this.userModel
        .findById(new Types.ObjectId(userId))
        .populate({
          path: 'image profile vehicles',
          strictPopulate: false,
          populate: {
            path: 'images',
            strictPopulate: false
          }
        })
        .exec();

      if (!foundUser) {
        throw new NotFoundException('User with this ID does not exist');
      }

      return sanitizeUser(foundUser);
    } catch (error) {
      throw new Error(error.message || 'Invalid user ID');
    }
  }

  async updateUserByAdmin(
    id: string,
    data: any,
    isAdmin: boolean
  ): Promise<_TSanitizedUser | null> {
    const user = await this.userModel.findOne({ _id: id });

    if (!user) {
      throw new NotFoundException(`User with this ID does not exist`);
    }

    const profile = await this.profileModel.findOne({ _id: user.profile.id });

    if (isAdmin) {
      // Admin can update role and isActive
      if (data.userType) {
        user.userType = data.userType;
      }
    } else {
      if (data.email && (data.email !== '' || data.email !== user.email)) {
        user.email = data.email;
      }
      if (data.first_name && data.first_name !== '') {
        profile.first_name = data.first_name;
      }
      if (data.last_name && data.last_name !== '') {
        profile.last_name = data.last_name;
      }
      if (data.contact_no && data.contact_no !== '') {
        profile.contact_no = data.contact_no;
      }
      if (data.area && data.username !== '') {
        profile.area = data.area;
      }
      if (data.city && data.city !== '') {
        profile.city = data.city;
      }
      if (data.state && data.state !== '') {
        profile.state = data.state;
      }
      if (data.pinCode && data.pinCode !== '') {
        profile.pinCode = data.pinCode;
      }
    }

    // user.updatedAt = new Date();

    await profile.save();
    await user.save();

    return sanitizeUser(user);
  }

  async updateUser(
    id: string,
    email: string,
    userDetails: any
  ): Promise<_IUpdatedUserRes> {
    this.logger.log(userDetails);
    const user = await this.returnId(email);
    if (!user) {
      throw new Error('User not found');
    }

    if (user !== id) {
      throw new Error('You can only update your own records');
    }

    console.log(user);

    this.logger.log('user: ', user);

    const updates: any = {};

    if (userDetails.contact_no) {
      updates['profile.contact_no'] = userDetails.contact_no;
    }
    if (userDetails.first_name) {
      updates['profile.first_name'] = userDetails.first_name;
    }
    if (userDetails.last_name) {
      updates['profile.last_name'] = userDetails.last_name;
    }
    if (userDetails.area) {
      updates['profile.area'] = userDetails.area;
    }
    if (userDetails.city) {
      updates['profile.city'] = userDetails.city;
    }
    if (userDetails.state) {
      updates['profile.state'] = userDetails.state;
    }
    if (userDetails.pincode) {
      updates['profile.pinCode'] = userDetails.pincode;
    }

    try {
      const result = await this.aggregationService.updateUserPipeline(
        this.userModel,
        user,
        updates
      );
      const updatedUser = result[0]; // Assuming the pipeline returns an array with one element
      // this.logger.log('updated user: ', updatedUser);
      return updatedUser;
    } catch (error) {
      this.logger.error('Error updating user: ', error);
      throw error;
    }
  }

  async remove(userId: string): Promise<void> {
    return await this.userModel.findByIdAndDelete(userId);
  }

  async fetchLatestUsers(size: number): Promise<_TSanitizedUser[]> {
    try {
      const latestUsers = await this.userModel
        .find()
        // .sort({ applicationDate: 'desc' })
        .limit(size)
        .exec();

      const populatedUsers = (await this.populateUserFields<_TUser[]>(
        latestUsers,
        'profile image vehicles',
        'images'
      )) as _TUser[];

      console.log(populatedUsers);

      return populatedUsers.map((user) => sanitizeUser(user));
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch the latest applicants.');
    }
  }

  async fetchFilteredUsers(
    query = '',
    currentPage: number,
    items: number
  ): Promise<_TSanitizedUser[]> {
    const fieldNames = ['email', 'userType']; // Add more fields as needed
    try {
      const users = await this.aggregationService.fetchFilteredDocuments(
        this.userModel,
        fieldNames,
        query,
        currentPage,
        items
      );

      const populatedUsers = (await this.populateUserFields<_TUser[]>(
        users,
        'profile image vehicles centers',
        'images'
      )) as _TUser[];

      return populatedUsers.map((user) => sanitizeUser(user));
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch users.');
    }
  }

  async fetchUsers(
    query = '',
    currentPage: number,
    items: number
  ): Promise<_IUsersTable[]> {
    try {
      const {
        project_fields,
        lookups,
        unwind_fields,
        count_fields,
        field_names
      } = FETCH_USERS_BY_ADMIN_AGGREGATION;
      const users = await this.aggregationService.dynamicDocumentsPipeline<
        _TUser,
        _IUsersTable[]
      >(
        this.userModel,
        false,
        project_fields,
        {},
        lookups,
        unwind_fields,
        count_fields,
        currentPage,
        items,
        sanitizeAdminUserFn
      );

      return users;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch users.');
    }
  }

  async fetchUsersPage(query = '', items: number): Promise<number> {
    try {
      const fieldNames = ['email', 'userType'];
      const totalPages = await this.aggregationService.pageNumbersPipeline(
        this.userModel,
        fieldNames,
        query,
        items
      );

      return totalPages;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch applicants.');
    }
  }

  async fetchUserProfile(user_id: string, extra: boolean) {
    try {
      const user = await this.userModel
        .findById(new Types.ObjectId(user_id))
        .populate({
          path: 'image',
          strictPopulate: false
        })
        .exec();

      if (!user) {
        throw new NotFoundException('This user does not exist');
      }

      const profile = await this.aggregationService.fetchDocumentPipeline<
        _IDbProfile,
        _INewProfile
      >(
        this.profileModel,
        [
          'first_name',
          'last_name',
          'contact_no',
          'area',
          'city',
          'state',
          'pinCode'
        ],
        { user: user_id },
        'user profile'
      );

      if (extra) {
        return {
          ...profile,
          _id: user._id.toString(),
          user_image: user?.user_image?.file_id ?? null,
          phone_number: user.phone_number,
          email: user.email
        };
      }

      return profile;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async newFetchUserProfile(user_id: string, extra: boolean) {
    try {
      const user = await this.returnId(user_id);

      if (!user) {
        throw new NotFoundException('This user does not exist');
      }

      console.log(user);

      const profile = await this.aggregationService.dynamicDocumentsPipeline<
        _IDbProfile,
        _INewProfile
      >(
        this.profileModel,
        true,
        [
          'first_name',
          'last_name',
          'contact_no',
          'area',
          'city',
          'state',
          'pinCode'
        ],
        { user: new mongoose.Types.ObjectId(user) }
        // [],
        // 'user profile'
      );

      console.log(profile);

      if (extra) {
        return {
          ...profile,
          _id: user
          // user_image: user?.user_image?.file_id ?? null,
          // phone_number: user.phone_number,
          // email: user.email
        };
      }

      return profile;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  //With Yransactions
  async updateUserTransaction(
    id: string,
    email: string,
    userDetails: any,
    session: ClientSession
  ): Promise<_IUpdatedUserRes> {
    this.logger.log(userDetails);
    const user = await this.returnId(email);
    if (!user) {
      throw new Error('User not found');
    }

    if (user !== id) {
      throw new Error('You can only update your own records');
    }

    console.log(user);

    this.logger.log('user: ', user);

    const updates: any = {};

    if (userDetails.contact_no) {
      updates['profile.contact_no'] = userDetails.contact_no;
    }
    if (userDetails.first_name) {
      updates['profile.first_name'] = userDetails.first_name;
    }
    if (userDetails.last_name) {
      updates['profile.last_name'] = userDetails.last_name;
    }
    if (userDetails.area) {
      updates['profile.area'] = userDetails.area;
    }
    if (userDetails.city) {
      updates['profile.city'] = userDetails.city;
    }
    if (userDetails.state) {
      updates['profile.state'] = userDetails.state;
    }
    if (userDetails.pincode) {
      updates['profile.pinCode'] = userDetails.pincode;
    }

    try {
      const result = await this.aggregationService.updateUserPipeline(
        this.userModel,
        user,
        updates,
        session
      );
      const updatedUser = result[0]; // Assuming the pipeline returns an array with one element
      // this.logger.log('updated user: ', updatedUser);
      return updatedUser;
    } catch (error) {
      this.logger.error('Error updating user: ', error);
      throw error;
    }
  }

  async addUserImageTransaction(
    userImage: _ICloudRes,
    id: string,
    session: ClientSession
  ): Promise<_IUserImage> {
    try {
      const { publicUrl, ...image } = userImage;

      const savedImage = new this.userImageModel({
        userId: id,
        ...image
      });

      await savedImage.save({ session });

      return sanitizeUserImage(savedImage);
    } catch (error) {
      throw new Error(`An Error Ocuured while saving Image: ${error}`);
    }
  }
}
