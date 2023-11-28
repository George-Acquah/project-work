import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { VehiclesController } from './vehicles.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Vehicle, VehicleSchema } from 'src/shared/schemas/vehicle.schema';
import { VehiclesService } from './vehicles.service';
import { UsersModule } from 'src/users/users.module';
import {
  VehicleImage,
  VehicleImageSchema,
} from 'src/shared/schemas/vehicle-image.schema';
import { UploadService } from 'src/storage/uploads.service';
import { StorageService } from 'src/storage/storage.service';
import { ConfigModule } from '@nestjs/config';
import { UploadMiddleware } from 'src/shared/middlewares/uploads.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Vehicle.name, schema: VehicleSchema },
      { name: VehicleImage.name, schema: VehicleImageSchema },
    ]),
    UsersModule,
    ConfigModule,
  ],
  providers: [VehiclesService, UploadService, StorageService],
  controllers: [VehiclesController],
})
export class VehiclesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UploadMiddleware).forRoutes({
      path: 'customer/vehicle/add',
      method: RequestMethod.POST,
    });
  }
}
