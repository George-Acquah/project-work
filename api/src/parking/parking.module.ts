import { Module } from '@nestjs/common';
import { ParkingsGateway } from './parking.gateway';
import { ParkingCenterController } from './parking-center.controller';
import { ParkingCenterService } from './parking-center.service';
import { SlotService } from './slots.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ParkingCenter,
  ParkingCenterSchema,
} from 'src/shared/schemas/parking-centers.schema';
import {
  CenterImage,
  CenterImageSchema,
} from 'src/shared/schemas/center-image.schema';
import { Slot, SlotSchema } from 'src/shared/schemas/slot.schema';
import {
  SlotImage,
  SlotImageSchema,
} from 'src/shared/schemas/slot-image.schema';
import { SlotData, SlotDataSchema } from 'src/shared/schemas/slot-data.schema';
import {
  CentertData,
  CentertDataSchema,
} from 'src/shared/schemas/center-data.schema';
import { ScheduleModule } from '@nestjs/schedule';
import {
  ParkingReservationData,
  ParkingReservationDataSchema,
} from 'src/shared/schemas/slot-reservation.schema';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    MongooseModule.forFeature([
      { name: ParkingCenter.name, schema: ParkingCenterSchema },
      { name: CenterImage.name, schema: CenterImageSchema },
      { name: CentertData.name, schema: CentertDataSchema },
      { name: Slot.name, schema: SlotSchema },
      { name: SlotImage.name, schema: SlotImageSchema },
      { name: SlotData.name, schema: SlotDataSchema },
      {
        name: ParkingReservationData.name,
        schema: ParkingReservationDataSchema,
      },
    ]),
  ],
  providers: [ParkingsGateway, ParkingCenterService, SlotService],
  controllers: [ParkingCenterController],
  exports: [],
})
export class ParkingModule {}
