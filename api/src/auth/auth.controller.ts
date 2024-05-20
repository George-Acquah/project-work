import { Body, Controller, Logger, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/create-users.dto';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import {
  _ISanitizedParkOwner,
  _TSanitizedUser
} from 'src/shared/interfaces/users.interface';
import { ApiResponse } from 'src/shared/services/api-responses';
import { LoginUserDto } from 'src/users/dtos/login-users.dtos';
import { RefreshJwtAuthGuard } from 'src/shared/guards/refreshJwt.guard';
import { User } from 'src/shared/decorators/user.decorator';

@Controller('auth')
export class AuthController {
  private logger = new Logger(AuthController.name);
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService
  ) {}

  @Post('users/customer')
  async registerCustomer(@Body() data: CreateUserDto) {
    this.logger.warn(data);
    try {
      console.log(data);
      const customer = await this.userService.createCustomer(data);

      if (customer) {
        return new ApiResponse(
          200,
          `You have successfully created an acount with ${customer.email}`,
          customer
        );
      }
    } catch (error) {
      console.log(error);
      return new ApiResponse(
        error.status ?? 400,
        error.message ?? 'Something Bad Occured while logging in',
        {}
      );
    }
  }

  @Post('users/owner')
  async registerOwner(
    @Body() data: CreateUserDto
  ): Promise<ApiResponse<_ISanitizedParkOwner>> {
    this.logger.warn(data);
    const owner = await this.userService.createOwner(data);

    return new ApiResponse(
      200,
      'You have successfully created an acount',
      owner
    );
  }

  // @UseGuards(LocalJwtAuthGuard)
  @Post('login')
  async login(@Body() userDto: LoginUserDto) {
    console.log('received');
    try {
      const data = await this.authService.login(userDto);

      if (data) {
        return new ApiResponse(
          200,
          `You have Successfully logged in as ${data.user.email}`,
          data
        );
      }
    } catch (error) {
      console.log(error);
      return new ApiResponse(
        error?.response?.statusCode ?? 400,
        error?.message ?? 'Something Bad Occured while logging in',
        {}
      );
    }
  }

  @UseGuards(RefreshJwtAuthGuard)
  @Post('refresh')
  async refreshToken(@User() user: _TSanitizedUser) {
    try {
      const tokens = await this.authService.refreshToken(user);
      console.log('Session successfully refreshed');
      return new ApiResponse(200, 'Session successfully refreshed', tokens);
    } catch (error) {
      return new ApiResponse(400, error.message ?? "Couldn't refresh", {});
    }
  }
}
