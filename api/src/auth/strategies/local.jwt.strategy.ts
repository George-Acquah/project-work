import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { _ISanitizedCustomer } from 'src/shared/interfaces/users.interface';

@Injectable()
export class LocalJwtStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: any) {
    super({ usernameField: 'username' });
  }

  async validate(
    username: string,
    password: string,
  ): Promise<_ISanitizedCustomer> {
    const user = await this.authService.validateUserCredentialsByUsername(
      username,
      password,
    );

    if (!user) {
      console.log('I wont aunthenticate you!!!');
      throw new UnauthorizedException();
    }

    return user;
  }
}
