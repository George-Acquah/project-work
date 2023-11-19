/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Request } from 'express';
// import { _IReservationsPayload } from 'src/shared/interfaces/jwt_payload.interface';

@Injectable()
export class ReservationsStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      ignoreExpiration: false,
      secretOrKey: 'random-secret',
      jwtFromRequest: (request: Request) => {
        const authHeader = request.headers.reservation as string;
        console.log(authHeader);
        // if (authHeader && authHeader.split(' ')[0] === 'Reservation') {
        //   console.log('passed');
        //   return authHeader.split(' ')[1];
        // }
        if (authHeader) {
          console.log('passed');
          return authHeader;
        }
        console.log('unauthorized');
        return undefined;
      },
    });
  }

  async validate() {}
}
