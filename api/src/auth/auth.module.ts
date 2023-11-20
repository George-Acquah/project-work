import { Logger, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { ReservationsStrategy } from './strategies/reservations.jwt';
import { AuthController } from './auth.controller';
import { JwtAuthModule } from 'src/modules.config';

@Module({
  imports: [JwtAuthModule, PassportModule],
  controllers: [AuthController],
  providers: [AuthService, ReservationsStrategy],
  exports: [],
})
export class AuthModule {
  constructor() {
    const logger = new Logger();
    logger.log('Auth Module Connected and running.');
  }
}
