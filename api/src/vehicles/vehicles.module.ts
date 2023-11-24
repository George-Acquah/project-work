import { Module } from '@nestjs/common';
import { VehiclesController } from './vehicles.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Vehicle, VehicleSchema } from 'src/shared/schemas/vehicle.schema';
import { VehiclesService } from './vehicles.service';
import { UsersModule } from 'src/users/users.module';
import {
  VehicleImage,
  VehicleImageSchema,
} from 'src/shared/schemas/vehicle-image.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Vehicle.name, schema: VehicleSchema },
      { name: VehicleImage.name, schema: VehicleImageSchema },
    ]),
    UsersModule,
  ],
  providers: [VehiclesService],
  controllers: [VehiclesController],
})
export class VehiclesModule {}
