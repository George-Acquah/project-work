import {
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Request } from 'express';
import { _IPayload } from 'src/shared/interfaces/jwt_payload.interface';
import { AuthService } from '../auth.service';
import { UserType } from 'src/shared/enums/users.enum';
import { strategies } from 'src/shared/constants/auth.constants';

@Injectable()
export class VehicleStrategy extends PassportStrategy(
  Strategy,
  strategies.VEHICLE
) {
  constructor(private authService: AuthService) {
    super({
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET_KEY,
      jwtFromRequest: (request: Request) => {
        console.log(request.headers);
        const authHeader = request.headers.authorization;
        if (authHeader && authHeader.split(' ')[0] === 'Bearer') {
          return authHeader.split(' ')[1];
        }
        return undefined;
      }
    });
  }

  async validate(payload: _IPayload) {
    const driver = await this.authService.verifyUser(payload);

    if (!driver) {
      throw new NotFoundException();
    }

    if (driver.userType !== UserType.CUSTOMER) {
      throw new UnauthorizedException('Only drivers or customers are allowed');
    }

    return driver;
  }
}
