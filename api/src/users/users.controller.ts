/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Logger,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserType } from 'src/shared/enums/users.enum';
import { ApiResponse } from 'src/shared/services/api-responses';
import { _TSanitizedUser } from 'src/shared/interfaces/users.interface';
import { JwtAuthGuard } from 'src/shared/guards/Jwt.guard';
import { UploadService } from 'src/storage/uploads.service';
import { User } from 'src/shared/decorators/user.decorator';
import { ConfigService } from '@nestjs/config';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  private logger = new Logger(UsersController.name);
  constructor(
    private readonly usersService: UsersService,
    private readonly uploadsService: UploadService,
    private readonly configService: ConfigService,
  ) {}

  @Post('set-image')
  @UseGuards(JwtAuthGuard)
  async create(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          // ... Set of file validator instances here
          new MaxFileSizeValidator({ maxSize: 2000 * 1024 }),
        ],
      }),
    )
    files: Express.Multer.File[],
    @User() userObj: _TSanitizedUser,
  ) {
    try {
      const { userImageBucket } = this.configService.get('GCPStorageConfig');
      const images = await this.uploadsService.uploadFilesToDrive(
        files,
        userImageBucket,
      );

      if (images.length > 0) {
        const firstImage = images[0];

        const savedUserImage = await this.usersService.addUserImage(
          firstImage,
          userObj._id,
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

  @Get('admin')
  async getFilteredUsers(
    @Query('users') query: string,
    @Query('currentPage') currentPage: number,
    @Query('size') size: number,
  ): Promise<ApiResponse<_TSanitizedUser[] | object>> {
    try {
      const filteredUsers = await this.usersService.fetchFilteredUsers(
        query,
        currentPage,
        size,
      );

      //TODO implement next page token

      return new ApiResponse(200, 'Your query was successful', filteredUsers);
    } catch (error) {
      return new ApiResponse(
        403,
        error.message ?? 'Your query was not successful',
        {},
      );
    }
  }

  @Get(':id')
  async getSingleUser(
    @Param() id: string,
  ): Promise<ApiResponse<_TSanitizedUser | object>> {
    try {
      const user = await this.usersService.findOne(id);
      return new ApiResponse(200, 'Your query was successful', user);
    } catch (err) {
      return new ApiResponse(404, err.message, {});
    }
  }

  @Get('admin/total-pages')
  async getUsersPage(
    @Query('users') query: string,
    @Query('size') size: number,
  ): Promise<ApiResponse<number | object>> {
    try {
      const filteredUsers = await this.usersService.fetchUsersPage(query, size);
      return new ApiResponse(200, 'You query was successful', filteredUsers);
    } catch (error) {
      return new ApiResponse(
        403,
        error.message ?? 'Your query was not successful',
        {},
      );
    }
  }

  @Get('admin/latest')
  async getLatestUsers(
    @Query('size') size: number,
  ): Promise<ApiResponse<_TSanitizedUser | object>> {
    try {
      const latestUsers = await this.usersService.fetchLatestUsers(size);
      return new ApiResponse(200, 'You query was successful', latestUsers);
    } catch (error) {
      return new ApiResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        error.message ?? 'Your query was not successful',
        {},
      );
    }
  }

  @Get('admin/roles')
  getAllRoles(): ApiResponse<UserType[]> {
    return new ApiResponse(200, 'SUccess', [
      UserType.CUSTOMER,
      UserType.PARK_OWNER,
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
        {},
      );
    } catch (error) {
      return new ApiResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'You have successfully deleted this user',
        {},
      );
    }
  }
}
