import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { _TRequestWithAuth } from 'src/shared/interfaces/custom-request.interface';
import { extractToken } from 'src/shared/utils/global.utils';
import { _IReservationPayload } from 'src/shared/interfaces/jwt_payload.interface';
import { AuthService } from '../auth.service';
import { strategies } from 'src/shared/constants/auth.constants';

@Injectable()
export class ReservationsStrategy extends PassportStrategy(
  Strategy,
  strategies.RESERVATION
) {
  constructor(private authService: AuthService) {
    super({
      ignoreExpiration: false,
      secretOrKey: 'random-secret',
      jwtFromRequest: (request: _TRequestWithAuth) => {
        if (request.headers.authorization) {
          return extractToken('Reservation', request.headers.authorization);
        }

        return undefined;
      }
    });
  }

  async validate(payload: _IReservationPayload) {
    const reservation = await this.authService.verifyUser(payload as any);

    if (!reservation) {
      throw new Error('User not found');
    }

    return reservation;
  }
}
