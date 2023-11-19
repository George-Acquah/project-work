import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Request } from 'express';
import { _IPayload } from 'src/shared/interfaces/jwt_payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private authService: any) {
    super({
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET_KEY,
      jwtFromRequest: (request: Request) => {
        const authHeader = request.headers.authorization;
        if (authHeader && authHeader.split(' ')[0] === 'Bearer') {
          return authHeader.split(' ')[1];
        }
        console.log('unauthorized');
        return undefined;
      },
    });
  }

  async validate(payload: _IPayload) {
    console.log('passed');
    const user = await this.authService.verifyUser(payload);

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }
}
