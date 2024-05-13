/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model, Types } from 'mongoose';
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

@Injectable()
export class UsersService {
  private logger = new Logger(UsersService.name);
  constructor(
    @InjectModel('User') private userModel: Model<_TUser>,
    @InjectModel(Customer.name) private customerModel: Model<_ICustomer>,
    @InjectModel(ParkOwner.name)
    private parkOwnerModel: Model<_IParkOwner>,
    @InjectModel('Profile') private profileModel: Model<_IDbProfile>,
    @InjectModel('UserImage') private userImageModel: Model<_IDbUserImage>,
    private readonly aggregationService: AggregationService
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
      throw new Error('An Error Ocuured while saving Image');
    }
  }

  async newCustomer(userDetails: CreateUserDto): Promise<_ICustomer> {
    const profile = new this.profileModel();
    const newUser = new this.customerModel(userDetails);

    await profile.save();
    newUser.profile = profile;

    return newUser;
  }

  async newOwner(userDetails: CreateUserDto): Promise<_IParkOwner> {
    const profile = new this.profileModel();
    const newUser = new this.parkOwnerModel(userDetails);

    await profile.save();
    newUser.profile = profile;

    return newUser;
  }

  async createCustomer(
    userDetails: CreateUserDto
  ): Promise<_ISanitizedCustomer> {
    const { email } = userDetails;
    const existingCustomer = await this.userModel.findOne({ email });

    if (existingCustomer) {
      throw new ConflictException('Email is already used');
    }

    const newCustomer = await this.newCustomer(userDetails);

    // Save the new user to the database
    await newCustomer.save();

    // Sanitize and return the user
    return sanitizeUser(newCustomer) as _ISanitizedCustomer;
  }

  async createOwner(userDetails: CreateUserDto): Promise<_ISanitizedParkOwner> {
    const { email } = userDetails;
    this.logger.log('email: ', email);
    const existingOwner = await this.userModel.findOne({ email });
    this.logger.log('user: ', existingOwner);

    if (existingOwner) {
      throw new ConflictException('Email is already used');
    }

    const newOwner = await this.newOwner(userDetails);

    // Save the new user to the database
    await newOwner.save();

    // Sanitize and return the user
    return sanitizeUser(newOwner) as _ISanitizedParkOwner;
  }

  async findByLogin(loginData: LoginUserDto) {
    const { email, password } = loginData;
    try {
      const user = await this.userModel.findOne({ email });

      if (await bcrypt.compare(password, user.password)) {
        return sanitizeUser(user);
      } else {
        // Passwords don't match, throw UnauthorizedException
        throw new UnauthorizedException('Incorrect username or password');
      }
    } catch (error) {
      // Entity not found or other error occurred, throw appropriate error
      throw new UnauthorizedException('Incorrect username or password');
    }
  }

  /* used by  modules to search user by email */
  async findUser(email: string): Promise<_TUser> {
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
      throw new Error(`User with email ${email} does not exist.`);
    } else {
      return user;
    }
  }

  /* used by  modules to search user by email */
  async findUserById(userId: string) {
    const user: _TUser = await this.userModel.findOne({ _id: userId }).exec();

    if (!user) {
      throw new Error(`User does not exist.`);
    } else {
      return user;
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

  async updateApplicant(
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

  async updateUser(email: string, userDetails: any): Promise<_TSanitizedUser> {
    this.logger.log(userDetails);
    const user = await this.findUser(email);
    this.logger.log('user: ', user);

    // user.profile.username = `${userDetails.first_name.toLocaleLowerCase()} ${userDetails.last_name.toLocaleLowerCase()}`;

    if (userDetails.contact_no) {
      user.profile.contact_no = userDetails.contact_no;
    }
    if (userDetails.first_name) {
      user.profile.first_name = userDetails.first_name;
    }
    if (userDetails.last_name) {
      user.profile.last_name = userDetails.last_name;
    }
    if (userDetails.area) {
      user.profile.area = userDetails.area;
    }
    if (userDetails.city) {
      user.profile.city = userDetails.city;
    }
    if (userDetails.state) {
      user.profile.state = userDetails.state;
    }
    if (userDetails.pincode) {
      user.profile.pinCode = userDetails.pincode;
    }

    user.save();
    this.logger.log('saved user: ', user);
    return sanitizeUser(user);
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
}
