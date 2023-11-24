/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ConflictException,
  Injectable,
  Logger,
  NotAcceptableException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  _ICloudRes,
  _IDbVehicleImage,
} from 'src/shared/interfaces/images.interface';
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
    private vehicleImageModel: Model<_IDbVehicleImage[]>,
    private userService: UsersService, //might be used in verifying vehicle no
  ) {}

  async addVehicleImages(images: _ICloudRes[]): Promise<_IDbVehicleImage[]> {
    try {
      const dbImages = images.map((image) => {
        const { publicUrl, ...res } = image;
        return res;
      });

      const savedImages = new this.vehicleImageModel({
        dbImages,
      });

      return await savedImages.save();
    } catch (error) {
      throw new Error('An Error Ocuured while saving Images');
    }
  }

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
    img: any[],
  ): Promise<_IVehicle> {
    const { vehicle_no } = data;
    // TODO: Some mechanism to verify vehicle_no

    const images = await this.addVehicleImages(img);

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
