import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Request } from 'express';
import { _IPayload } from 'src/shared/interfaces/jwt_payload.interface';
import { AuthService } from '../auth.service';
import { ApiResponse } from 'src/shared/services/api-responses';
import { UserType } from 'src/shared/enums/users.enum';

@Injectable()
export class VehicleStrategy extends PassportStrategy(Strategy, 'vehicle') {
  constructor(private authService: AuthService) {
    super({
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET_KEY,
      jwtFromRequest: (request: Request) => {
        const authHeader = request.headers.authorization;
        if (authHeader && authHeader.split(' ')[0] === 'Bearer') {
          return authHeader.split(' ')[1];
        }
        return undefined;
      },
    });
  }

  async validate(payload: _IPayload) {
    const user = await this.authService.verifyUser(payload);

    if (!user) {
      throw new ApiResponse(402, 'User does not exist', {});
    }

    if (user.userType !== UserType.CUSTOMER) {
      throw new UnauthorizedException(
        'Only drivers or customers are allowed to add vehicles',
      );
    }

    return user;
  }
}
