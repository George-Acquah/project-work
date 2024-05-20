/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Logger,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseGuards
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserType } from 'src/shared/enums/users.enum';
import { ApiResponse } from 'src/shared/services/api-responses';
import {
  _IUpdatedUserRes,
  _TSanitizedUser
} from 'src/shared/interfaces/users.interface';
import { JwtAuthGuard } from 'src/shared/guards/Jwt.guard';
import { UploadService } from 'src/storage/uploads.service';
import { User } from 'src/shared/decorators/user.decorator';
import { TransactionService } from 'src/transaction.service';
import { Connection } from 'mongoose';
import { UpdateUserDetailsDto } from './dtos/update-user.dto';
import { InjectConnection } from '@nestjs/mongoose';

@Controller('users')
export class UsersController {
  private logger = new Logger(UsersController.name);
  constructor(
    private readonly usersService: UsersService,
    private readonly uploadsService: UploadService,
    private readonly transactionService: TransactionService,
    @InjectConnection() private readonly connection: Connection // Injecting the Connection object
  ) {}

  @Post('set-image')
  @UseGuards(JwtAuthGuard)
  async create(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          // ... Set of file validator instances here
          new MaxFileSizeValidator({ maxSize: 2000 * 1024 })
        ]
      })
    )
    files: Express.Multer.File[],
    @User() userObj: _TSanitizedUser
  ) {
    try {
      const images = await this.uploadsService.uploadFilesToDrive(files);

      if (images.length > 0) {
        const firstImage = images[0];

        const savedUserImage = await this.usersService.addUserImage(
          firstImage,
          userObj._id
        );

        const { userId, ...resp } = savedUserImage;

        return new ApiResponse(200, 'image Set Successfully', resp);
      } else {
        throw new ApiResponse(400, 'No images were uploaded.', {});
      }
    } catch (error) {
      console.error('Error uploading program files:', error);
      throw new ApiResponse(HttpStatus.BAD_REQUEST, error.message, {});
    }
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  verifyUser(@User() user: _TSanitizedUser) {
    return new ApiResponse(200, 'User Verified', user);
  }

  @Get('me-mobile')
  @UseGuards(JwtAuthGuard)
  verifyMobileUser(@User() user: _TSanitizedUser) {
    return new ApiResponse(200, 'User Verified', {
      _id: user._id,
      email: user.email,
      user_image: user?.image?.file_id ?? null,
      first_name: user.profile.first_name,
      phone_number: user.profile.contact_no,
      last_name: user.profile.last_name,
      state: user.profile.state,
      area: user.profile.area,
      pincode: user.profile.pinCode
    });
  }

  @Get('admin')
  async getFilteredUsers(
    @Query('users') query: string,
    @Query('currentPage') currentPage: number,
    @Query('size') size: number
  ): Promise<ApiResponse<_TSanitizedUser[] | object>> {
    try {
      const filteredUsers = await this.usersService.fetchFilteredUsers(
        query,
        currentPage,
        size
      );

      //TODO implement next page token

      return new ApiResponse(200, 'Your query was successful', filteredUsers);
    } catch (error) {
      return new ApiResponse(
        error.statusCode || 403,
        error.message ?? 'Your query was not successful',
        {}
      );
    }
  }

  @Get(':id')
  async getSingleUser(
    @Param() param: { id: string }
  ): Promise<ApiResponse<_TSanitizedUser | object>> {
    try {
      console.log(param);
      const user = await this.usersService.findOne(param.id);
      return new ApiResponse(200, 'Your query was successful', user);
    } catch (err) {
      return new ApiResponse(404, err.message, {});
    }
  }

  @Put(':id/update')
  @UseGuards(JwtAuthGuard)
  async updateUser(
    @UploadedFiles() files: Express.Multer.File[],
    @Param('id') id: string,
    @Query('email') email: string,
    @Body() userDetails: UpdateUserDetailsDto // Assuming userDetails is passed in the request body
  ) {
    console.log(typeof id);
    try {
      const res: _IUpdatedUserRes = {
        _id: id,
        email: email,
        userType: '',
        first_name: null,
        last_name: null,
        user_image: null
      }; // Initialize res with default values

      // Check if there are files uploaded for the user image
      if (files && files.length > 0) {
        // Upload only the first file to limit update to a single file
        const firstFile = files[0];
        const savedUserImage = await this.uploadsService.uploadFileToDrive(
          firstFile
        );

        // Update the user's image details
        const userImage = await this.usersService.addUserImage(
          savedUserImage,
          id
        );

        res.user_image = userImage.file_id;
      }

      // Update the user details
      const updatedUser = await this.usersService.updateUser(
        id,
        email,
        userDetails
      );

      const { user_image, ...rest } = updatedUser;

      Object.assign(res, rest); // Merge updatedUser into res

      // Return success response
      return new ApiResponse(HttpStatus.OK, 'User Updated Successfully', res);
    } catch (error) {
      console.error('Error updating user:', error);
      throw new ApiResponse(HttpStatus.BAD_REQUEST, error.message, {});
    }
  }

  @Get('admin/total-pages')
  async getUsersPage(
    @Query('users') query: string,
    @Query('type') type: string,
    @Query('size') size: number
  ): Promise<ApiResponse<number | object>> {
    this.logger.log('hit', size);
    try {
      const totalPages = await this.usersService.fetchUsersPage(query, size);
      return new ApiResponse(200, 'You query was successful', totalPages);
    } catch (error) {
      return new ApiResponse(
        403,
        error.message ?? 'Your query was not successful',
        {}
      );
    }
  }

  @Get('admin/latest')
  async getLatestUsers(
    @Query('size') size: number
  ): Promise<ApiResponse<_TSanitizedUser | object>> {
    try {
      const latestUsers = await this.usersService.fetchLatestUsers(size);
      return new ApiResponse(200, 'You query was successful', latestUsers);
    } catch (error) {
      return new ApiResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        error.message ?? 'Your query was not successful',
        {}
      );
    }
  }

  @Get('admin/roles')
  getAllRoles(): ApiResponse<UserType[]> {
    return new ApiResponse(200, 'SUccess', [
      UserType.CUSTOMER,
      UserType.PARK_OWNER,
      UserType.ADMIN,
      UserType.MODERATOR
    ]);
  }

  //TODO implement update user and admin

  @Delete('admin/:id')
  async delete(@Param('id') id: string) {
    try {
      await this.usersService.remove(id);
      return new ApiResponse(
        200,
        'You have successfully deleted this user',
        {}
      );
    } catch (error) {
      return new ApiResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'You have successfully deleted this user',
        {}
      );
    }
  }

  // @Put(':id/update')
  // @UseGuards(JwtAuthGuard)
  // async updateTransaction(
  //   @UploadedFiles() files: Express.Multer.File[],
  //   @Param('id') id: string,
  //   @Query('email') email: string,
  //   @Body() userDetails: UpdateUserDetailsDto // Assuming userDetails is passed in the request body
  // ) {
  //   return this.transactionService
  //     .mongooseTransactionHandler(async (session) => {
  //       const res: _IUpdatedUserRes = {
  //         _id: id,
  //         email: email,
  //         userType: '',
  //         first_name: null,
  //         last_name: null,
  //         user_image: null
  //       }; // Initialize res with default values

  //       // Check if there are files uploaded for the user image
  //       if (files && files.length > 0) {
  //         // Upload only the first file to limit update to a single file
  //         const firstFile = files[0];
  //         const savedUserImage = await this.uploadsService.uploadFileToDrive(
  //           firstFile
  //         );

  //         // Update the user's image details
  //         const userImage = await this.usersService.addUserImageTransaction(
  //           savedUserImage,
  //           id,
  //           session
  //         );

  //         res.user_image = userImage.file_id;
  //       }

  //       // Update the user details
  //       const updatedUser = await this.usersService.updateUserTransaction(
  //         id,
  //         email,
  //         userDetails,
  //         session
  //       );

  //       Object.assign(res, updatedUser); // Merge updatedUser into res

  //       // Return success response
  //       return new ApiResponse(HttpStatus.OK, 'User Updated Successfully', res);
  //     }, this.connection)
  //     .catch((error) => {
  //       console.error('Error updating user:', error);
  //       throw new ApiResponse(HttpStatus.BAD_REQUEST, error.message, {});
  //     });
  // }
}
