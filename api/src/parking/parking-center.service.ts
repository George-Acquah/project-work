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
  _IDbCenterImage,
  _IDbVehicleImage,
} from 'src/shared/interfaces/images.interface';
import {
  _IDbParkingCenter,
  _IParkingCenter,
} from 'src/shared/interfaces/slot.interface';
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
export class ParkingCenterService {
  private logger = new Logger();
  constructor(
    @InjectModel(Vehicle.name)
    private parkingCenterModel: Model<_IDbParkingCenter>,
    @InjectModel(VehicleImage.name)
    private centerImagesModel: Model<_IDbCenterImage[]>,
    private userService: UsersService, //might be used in verifying vehicle no
  ) {}

  async getAllParkingCenters(): Promise<_IParkingCenter[]> {
    const parkingCenters = await this.parkingCenterModel
      .find()
      .populate('images')
      .exec();
    return parkingCenters as unknown as _IParkingCenter[];
  }

  async getCentersByOwners(owner: string): Promise<_IParkingCenter[]> {
    try {
      const parkingCenters = await this.parkingCenterModel
        .find({ owner })
        .populate('images')
        .exec();
      return parkingCenters as unknown as _IParkingCenter[];
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getSingleParkingCenter(id: string): Promise<_IParkingCenter> {
    try {
      const parkingCenter = await this.parkingCenterModel
        .findById(new Types.ObjectId(id))
        .populate('images')
        .exec();
      return parkingCenter as unknown as _IParkingCenter;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async addCenterImages(images: _ICloudRes[]): Promise<_IDbCenterImage[]> {
    try {
      const dbImages = images.map((image) => {
        console.log(image);
        const { publicUrl, ...res } = image;
        console.log(res);
        return res;
      });

      const savedImages = await this.centerImagesModel.create(dbImages);

      return savedImages as unknown as _IDbCenterImage[];
    } catch (error) {
      throw new Error('An Error Occurred while saving Images');
    }
  }

  async newParkingCenter(data: _INewVehicle) {
    try {
      return await this.parkingCenterModel.create(data);
    } catch (error) {
      throw new NotAcceptableException(error.message);
    }
  }

  // async addVehicle(
  //   driver: string,
  //   data: _IAddVehicle,
  //   img: any[],
  // ): Promise<_IVehicle> {
  //   const { vehicle_no } = data;

  //   const images = await this.addVehicleImages(img);
  //   // Check if the vehicle already exists
  //   const existingVehicle = await this.parkingCenterModel.findOne({
  //     vehicle_no,
  //   });

  //   if (existingVehicle) {
  //     existingVehicle.images.push(...images);
  //     await existingVehicle.save();
  //     return sanitizevehicle(existingVehicle);
  //   }

  //   // Vehicle doesn't exist, create a new one
  //   const newVehicle = await this.newVehicle({
  //     vehicle_no,
  //     isVerified: false,
  //     hasSlot: false,
  //     images,
  //     driver,
  //   });

  //   await newVehicle.save();
  //   return sanitizevehicle(newVehicle);
  // }
}
