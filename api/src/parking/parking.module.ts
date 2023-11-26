import { Module } from '@nestjs/common';
import { ParkingsGateway } from './parking.gateway';

@Module({
  imports: [],
  providers: [ParkingsGateway],
  controllers: [],
  exports: [],
})
export class ParkingModule {}
