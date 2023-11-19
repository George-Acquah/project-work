import { Logger, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ReservationsStrategy } from './strategies/reservations.jwt';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: 'My random secret key never let others see',
      signOptions: { expiresIn: '1h' },
    }),
    PassportModule,
  ],
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
