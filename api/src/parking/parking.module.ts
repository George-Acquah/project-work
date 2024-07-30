import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod
} from '@nestjs/common';
import { ParkingsGateway } from './parking.gateway';
import { ParkingCenterController } from './parking-center.controller';
import { ParkingCenterService } from './parking-center.service';
import { SlotService } from './slots.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UploadService } from 'src/storage/uploads.service';
import { ConfigModule } from '@nestjs/config';
import { StorageService } from 'src/storage/storage.service';
import { AggregationService } from 'src/aggregation.service';
import { ScheduleModule } from '@nestjs/schedule';
import { Slot, SlotSchema } from 'src/shared/schemas/slot.schema';
import {
  ParkingCenter,
  ParkingCenterSchema
} from 'src/shared/schemas/parking-centers.schema';
import {
  CenterImage,
  CenterImageSchema
} from 'src/shared/schemas/center-image.schema';
import {
  SlotImage,
  SlotImageSchema
} from 'src/shared/schemas/slot-image.schema';
import { SlotData, SlotDataSchema } from 'src/shared/schemas/slot-data.schema';
import {
  CenterData,
  CenterDataSchema
} from 'src/shared/schemas/center-data.schema';
import {
  ParkingReservationData,
  ParkingReservationDataSchema,
  SlotReservation,
  SlotReservationSchema
} from 'src/shared/schemas/slot-reservation.schema';

import {
  CenterAddress,
  CenterAddressSchema
} from 'src/shared/schemas/center-address.schema';
import {
  SlotAddress,
  SlotAddressSchema
} from 'src/shared/schemas/slot-address.schema';
import { UploadMiddleware } from 'src/shared/middlewares/uploads.middleware';
import { VehiclesModule } from 'src/vehicles/vehicles.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    MongooseModule.forFeature([
      { name: ParkingCenter.name, schema: ParkingCenterSchema },
      { name: CenterImage.name, schema: CenterImageSchema },
      { name: CenterData.name, schema: CenterDataSchema },
      { name: CenterAddress.name, schema: CenterAddressSchema },
      { name: SlotAddress.name, schema: SlotAddressSchema },
      { name: Slot.name, schema: SlotSchema },
      { name: SlotImage.name, schema: SlotImageSchema },
      { name: SlotData.name, schema: SlotDataSchema },
      { name: SlotReservation.name, schema: SlotReservationSchema },
      {
        name: ParkingReservationData.name,
        schema: ParkingReservationDataSchema
      }
    ]),
    VehiclesModule
  ],
  providers: [
    ParkingsGateway,
    ParkingCenterService,
    SlotService,
    UploadService,
    StorageService,
    AggregationService
  ],
  controllers: [ParkingCenterController],
  exports: [MongooseModule]
})
export class ParkingModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UploadMiddleware).forRoutes({
      path: 'owner/parking-center/:center_id/add-center-image',
      method: RequestMethod.POST
    });
  }
}
