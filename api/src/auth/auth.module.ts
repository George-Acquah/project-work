import { Logger, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { ReservationsStrategy } from './strategies/reservations.jwt';
import { AuthController } from './auth.controller';
import { JwtAuthModule } from 'src/modules.config';
import { UsersModule } from 'src/users/users.module';
import { RefreshStrategy } from './strategies/refresh.jwt.strategy';
import { RefreshJwtAuthGuard } from 'src/shared/guards/refreshJwt.guard';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtAuthGuard } from 'src/shared/guards/Jwt.guard';
import { LocalJwtStrategy } from './strategies/local.jwt.strategy';
import { LocalJwtAuthGuard } from 'src/shared/guards/localJwt.guard';

@Module({
  imports: [JwtAuthModule, PassportModule, UsersModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    ReservationsStrategy,
    RefreshStrategy,
    RefreshJwtAuthGuard,
    JwtStrategy,
    JwtAuthGuard,
    LocalJwtStrategy,
    LocalJwtAuthGuard,
  ],
  exports: [],
})
export class AuthModule {
  constructor() {
    const logger = new Logger();
    logger.log('Auth Module Connected and running.');
  }
}
