import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { _ISanitizedCustomer } from 'src/shared/interfaces/users.interface';
import {
  _IAddVehicle,
  _INewVehicle,
  _IVehicle,
} from 'src/shared/interfaces/vehicles.interface';
import { Vehicle } from 'src/shared/schemas/vehicle.schema';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class VehiclesService {
  private logger = new Logger();
  constructor(
    @InjectModel(Vehicle.name) private vehicleModel: Model<_IVehicle>,
    private userService: UsersService,
  ) {}

  async newVehicle(data: _INewVehicle) {
    // const { vehicle_no, isVerified, images, hasSlot } = data;
    // const vehicle = this.vehicleModel.create({
    //   vehicle_no,
    //   isVerified,
    //   images,
    //   hasSlot,
    // });
    return await this.vehicleModel.create(data);
  }

  async addVehicle(
    customer: _ISanitizedCustomer,
    data: _IAddVehicle,
    image: string,
  ) {
    const { vehicle_no } = data;
    const images = []; // Image will be handled in the controller
    images.push(image);
    //TODO some mechanism to verify vehicle_no

    const existingVehicle = await this.vehicleModel.findOne({ vehicle_no });

    if (existingVehicle) {
      throw new ConflictException('This vehicle is already added');
    }

    const user = await this.userService.findUserById(customer._id);

    const vehicle = await this.newVehicle({
      vehicle_no,
      isVerified: false, // boolean value returned after verification
      hasSlot: false, // Will always be false during creation
      images,
      driver: customer._id,
    });
  }
}
