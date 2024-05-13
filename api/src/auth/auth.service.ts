import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import {
  _IPayload,
  _ITokens,
  _TJwtPayload
} from 'src/shared/interfaces/jwt_payload.interface';
import { sign, verify } from 'jsonwebtoken';
import { _TSanitizedUser } from 'src/shared/interfaces/users.interface';
import { UsersService } from 'src/users/users.service';
import { LoginUserDto } from 'src/users/dtos/login-users.dtos';
import { compare } from 'bcrypt';
import {
  appendRandomTextAndLength,
  getExpirationTime,
  sanitizeUser
} from 'src/shared/utils/users.utils';

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);
  constructor(private userService: UsersService) {}
  async signPayload(payload: _IPayload, secret: string, exp: string) {
    return sign(payload, secret, { expiresIn: exp });
  }

  async verifyToken(token: string, secret: string): Promise<_IPayload> {
    const tokenPayload = verify(token, secret) as _TJwtPayload;
    return {
      sub: {
        email: tokenPayload.sub.email
      },
      user_id: tokenPayload.user_id,
      userType: tokenPayload.userType
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findUser(email);
    //Compare password from user to password in DB
    const isValidPassword = await compare(password, user.password);

    if (user && isValidPassword) {
      return sanitizeUser(user);
    }

    throw new UnauthorizedException('Wrong Password');
  }

  async refreshToken(user: _TSanitizedUser) {
    const payload: _IPayload = {
      user_id: user._id?.toString() ?? '',
      userType: user.userType,
      sub: {
        email: user.email
      }
    };

    const access_token = await this.signPayload(
      payload,
      process.env.SECRET_KEY,
      '2h'
    );

    const u_id = appendRandomTextAndLength(user._id);
    const refresh_token = await this.signPayload(
      payload,
      process.env.REFRESH_KEY,
      '2d'
    );

    const expiresIn = getExpirationTime(45);

    const tokens: _ITokens = {
      access_token,
      u_id,
      refresh_token,
      expiresIn
    };

    return {
      tokens
    };
  }

  async login(dto: LoginUserDto) {
    const { email, password } = dto;
    const user = await this.validateUser(email, password);

    const payload: _IPayload = {
      user_id: user._id?.toString() ?? '',
      userType: user.userType,
      sub: {
        email: user.email
      }
    };

    const access_token = await this.signPayload(
      payload,
      process.env.SECRET_KEY,
      '10h'
    );

    const u_id = appendRandomTextAndLength(user._id);
    const refresh_token = await this.signPayload(
      payload,
      process.env.REFRESH_KEY,
      '2d'
    );

    const expiresIn = getExpirationTime(5);

    const tokens: _ITokens = {
      access_token,
      u_id,
      refresh_token,
      expiresIn
    };

    return {
      user,
      tokens
    };
  }

  async findByPayload(payload: _IPayload) {
    const {
      sub: { email }
    } = payload;

    return await this.userService.findUser(email);
  }

  async verifyUser(payload: _IPayload) {
    const user = await this.findByPayload(payload);

    return sanitizeUser(user);
  }

  // async verifyUser(token: string) {
  //   const payload = await this.verifyToken(token, process.env.SECRET_KEY);
  //   console.log(payload);
  //   const user = await this.findByPayload(payload);

  //   return sanitizeUser(user);
  // }
}
