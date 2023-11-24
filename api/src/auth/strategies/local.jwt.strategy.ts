import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { _TSanitizedUser } from 'src/shared/interfaces/users.interface';
import { AuthService } from '../auth.service';
import { strategies } from 'src/shared/constants/auth.constants';

@Injectable()
export class LocalJwtStrategy extends PassportStrategy(
  Strategy,
  strategies.LOCAL,
) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<_TSanitizedUser> {
    console.log({ email, password });
    const user = await this.authService.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
