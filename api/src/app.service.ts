import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(number_plate: string): boolean {
    console.log(number_plate);
    return true;
  }
}
