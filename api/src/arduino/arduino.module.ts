import { Module } from '@nestjs/common';
import { ArduinoService } from './arduino.service';
import { ArduinoController } from './arduino.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ArduinoData,
  ArduinoDataSchema
} from 'src/shared/schemas/arduino-data.schema';

@Module({
  controllers: [ArduinoController],
  providers: [ArduinoService],
  imports: [
    MongooseModule.forFeature([
      { name: ArduinoData.name, schema: ArduinoDataSchema }
    ])
  ]
})
export class ArduinoModule {}
