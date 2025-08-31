import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { strategies } from 'src/shared/constants/auth.constants';
import { _IRegisterResponse } from 'src/shared/interfaces/refactored/user.interface';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class LocalJwtStrategy extends PassportStrategy(
  Strategy,
  strategies.LOCAL
) {
  constructor(private userService: UsersService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<_IRegisterResponse> {
    const user = await this.userService.findByLogin({ email, password });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
