import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod
} from '@nestjs/common';
import { VehiclesController } from './vehicles.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Vehicle, VehicleSchema } from 'src/shared/schemas/vehicle.schema';
import { VehiclesService } from './vehicles.service';
import { UsersModule } from 'src/users/users.module';
import {
  VehicleImage,
  VehicleImageSchema
} from 'src/shared/schemas/vehicle-image.schema';
import { UploadService } from 'src/storage/uploads.service';
import { StorageService } from 'src/storage/storage.service';
import { ConfigModule } from '@nestjs/config';
import { UploadMiddleware } from 'src/shared/middlewares/uploads.middleware';
import { AggregationService } from 'src/aggregation.service';
import {
  VehicleInsurance,
  VehicleInsuranceSchema
} from 'src/shared/schemas/vehicle-insurance.schema';
import {
  VehicleRegistration,
  VehicleRegistrationSchema
} from 'src/shared/schemas/vehicle-registration.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Vehicle.name, schema: VehicleSchema },
      { name: VehicleImage.name, schema: VehicleImageSchema },
      { name: VehicleInsurance.name, schema: VehicleInsuranceSchema },
      { name: VehicleRegistration.name, schema: VehicleRegistrationSchema }
    ]),
    UsersModule,
    ConfigModule
  ],
  providers: [
    VehiclesService,
    UploadService,
    StorageService,
    AggregationService
  ],
  controllers: [VehiclesController],
  exports: [VehiclesService]
})
export class VehiclesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UploadMiddleware).forRoutes({
      path: 'customer/vehicle/add',
      method: RequestMethod.POST
    });
  }
}
