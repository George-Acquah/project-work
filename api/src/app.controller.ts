import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Query('number_plate') number_plate: string): boolean {
    return this.appService.getHello(number_plate);
  }
}
