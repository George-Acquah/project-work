import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Logger,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserType } from 'src/shared/enums/users.enum';
import { ApiResponse } from 'src/shared/services/api-responses';
import { _TSanitizedUser } from 'src/shared/interfaces/users.interface';
import { JwtAuthGuard } from 'src/shared/guards/Jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  private logger = new Logger(UsersController.name);
  constructor(private readonly usersService: UsersService) {}

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
    } catch {
      return new ApiResponse(404, 'User with this ID does not exist', {});
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
