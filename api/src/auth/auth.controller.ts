import { Body, Controller, Logger, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/create-users.dto';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import {
  _ISanitizedCustomer,
  _ISanitizedParkOwner,
  _TSanitizedUser,
} from 'src/shared/interfaces/users.interface';
import { ApiResponse } from 'src/shared/services/api-responses';
import { LoginUserDto } from 'src/users/dtos/login-users.dtos';
import { RefreshJwtAuthGuard } from 'src/shared/guards/refreshJwt.guard';
import { User } from 'src/shared/decorators/user.decorator';
import { LocalJwtAuthGuard } from 'src/shared/guards/localJwt.guard';

@Controller('auth')
export class AuthController {
  private logger = new Logger(AuthController.name);
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Post('users/customer')
  async registerCustomer(
    @Body() data: CreateUserDto,
  ): Promise<ApiResponse<_ISanitizedCustomer>> {
    this.logger.warn(data);
    const customer = await this.userService.createCustomer(data);

    return new ApiResponse(
      200,
      'You have successfully created an acount',
      customer,
    );
  }

  @Post('users/owner')
  async registerOwner(
    @Body() data: CreateUserDto,
  ): Promise<ApiResponse<_ISanitizedParkOwner>> {
    this.logger.warn(data);
    const owner = await this.userService.createOwner(data);

    return new ApiResponse(
      200,
      'You have successfully created an acount',
      owner,
    );
  }

  @UseGuards(LocalJwtAuthGuard)
  @Post('login')
  async login(@Body() userDto: LoginUserDto) {
    try {
      const data = await this.authService.login(userDto);

      if (data) {
        return new ApiResponse(
          200,
          `You have Successfully logged in as ${data.user.email}`,
          data,
        );
      }
    } catch (error) {
      return new ApiResponse(
        400,
        error.message ?? 'Something Bad Occured while logging in',
        {},
      );
    }
  }

  @UseGuards(RefreshJwtAuthGuard)
  @Post('refresh')
  async refreshToken(@User() user: _TSanitizedUser) {
    try {
      const tokens = await this.authService.refreshToken(user);
      return new ApiResponse(200, 'Session successfully refreshed', tokens);
    } catch (error) {
      return new ApiResponse(400, error.message ?? "Couldn't refresh", {});
    }
  }
}
