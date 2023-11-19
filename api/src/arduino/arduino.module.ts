import { Module } from '@nestjs/common';
import { ArduinoService } from './arduino.service';
import { ArduinoController } from './arduino.controller';

@Module({
  controllers: [ArduinoController],
  providers: [ArduinoService],
})
export class ArduinoModule {}
