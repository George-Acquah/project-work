import { Controller, Get, Query } from '@nestjs/common';
import { NumberPlateService } from './number-plate.service';
import { Throttle } from '@nestjs/throttler';

@Controller('number-plate')
export class NumberPlateController {
  constructor(private readonly numberPlateService: NumberPlateService) {}

  @Get('verify')
  @Throttle({ default: { limit: 1, ttl: 60 } }) // 1 request per 60 seconds
  verifyNumberPlate(@Query('number_plate') number_plate: string): boolean {
    return this.numberPlateService.verifyNumberPlate(number_plate);
  }
}
