/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ConflictException,
  Injectable,
  Logger,
  NotAcceptableException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
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
import {
  sanitizeVehicles,
  sanitizevehicle,
} from 'src/shared/utils/vehicles.utils';
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

  async getAllVehicles(): Promise<_IVehicle[]> {
    const vehicles = await this.vehicleModel.find().populate('images');
    return sanitizeVehicles(vehicles);
  }

  async getDriverVehicles(driver: string): Promise<_IVehicle[]> {
    try {
      const vehicles = await this.vehicleModel
        .find({ driver })
        .populate('images');
      return sanitizeVehicles(vehicles);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getSingleVehicle(id: string): Promise<_IVehicle> {
    try {
      const vehicle = await this.vehicleModel
        .findById(new Types.ObjectId(id))
        .populate('images');
      return sanitizevehicle(vehicle);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async addVehicleImages(images: _ICloudRes[]): Promise<_IDbVehicleImage[]> {
    try {
      const dbImages = images.map((image) => {
        console.log(image);
        const { publicUrl, ...res } = image;
        console.log(res);
        return res;
      });

      const savedImages = await this.vehicleImageModel.create(dbImages);

      return savedImages as unknown as _IDbVehicleImage[];
    } catch (error) {
      throw new Error('An Error Occurred while saving Images');
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

    const images = await this.addVehicleImages(img);
    // Check if the vehicle already exists
    const existingVehicle = await this.vehicleModel.findOne({ vehicle_no });

    if (existingVehicle) {
      await this.vehicleModel.updateOne(
        { _id: existingVehicle._id },
        { $push: { images: { $each: images } } },
      );

      return sanitizevehicle(existingVehicle);
    }

    // Vehicle doesn't exist, create a new one
    const newVehicle = await this.newVehicle({
      vehicle_no,
      isVerified: false,
      hasSlot: false,
      images,
      driver,
    });

    await newVehicle.save();
    return sanitizevehicle(newVehicle);
  }
}
