import {
  ConflictException,
  Injectable,
  Logger,
  NotAcceptableException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { _IDbVehicleImage } from 'src/shared/interfaces/images.interface';
import {
  _IAddVehicle,
  _IDbVehicle,
  _INewVehicle,
  _IVehicle,
} from 'src/shared/interfaces/vehicles.interface';
import { VehicleImage } from 'src/shared/schemas/vehicle-image.schema';
import { Vehicle } from 'src/shared/schemas/vehicle.schema';
import { sanitizevehicle } from 'src/shared/utils/vehicles.utils';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class VehiclesService {
  private logger = new Logger();
  constructor(
    @InjectModel(Vehicle.name) private vehicleModel: Model<_IDbVehicle>,
    @InjectModel(VehicleImage.name)
    private vehicleImage: Model<_IDbVehicleImage>,
    private userService: UsersService,
  ) {}

  async newVehicle(data: _INewVehicle) {
    try {
      return await this.vehicleModel.create(data);
    } catch (error) {
      throw new NotAcceptableException(error.message);
    }
  }

  async addVehicle(
    driver: string,
    data: _IAddVehicle,
    image: string,
  ): Promise<_IVehicle> {
    const { vehicle_no } = data;
    const images = []; // Image will be handled in the controller
    images.push(image);
    //TODO some mechanism to verify vehicle_no

    const existingVehicle = await this.vehicleModel.findOne({ vehicle_no });

    if (existingVehicle) {
      throw new ConflictException('This vehicle is already added');
    }

    const vehicle = await this.newVehicle({
      vehicle_no,
      isVerified: false, // boolean value returned after verification
      hasSlot: false, // Will always be false during creation
      images,
      driver,
    });

    await vehicle.save();

    return sanitizevehicle(vehicle);
  }
}
