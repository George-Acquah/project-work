import { Controller, Get, Logger, UseGuards } from '@nestjs/common';
import { ReservationsAuthGuard } from 'src/shared/guards/reservations.guard';

@Controller('auth')
export class AuthController {
  @UseGuards(ReservationsAuthGuard)
  @Get()
  testToken() {
    const logger = new Logger();
    logger.log('Passed');
  }
}
