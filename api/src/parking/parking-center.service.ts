/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ConflictException,
  Injectable,
  Logger,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Model, Types } from 'mongoose';
import { CenterTypes } from 'src/shared/enums/slots.enum';
import {
  _ICloudRes,
  _IDbCenterImage,
  _IDbVehicleImage,
} from 'src/shared/interfaces/images.interface';
import {
  _IAddCenterData,
  _IAddParkingCenter,
  _ICenterData,
  _IDbCenterData,
  _IDbParkingCenter,
  _INewParkingCenter,
  _IParkingCenter,
  _ISlotData,
} from 'src/shared/interfaces/slot.interface';
import {
  _IAddVehicle,
  _IDbVehicle,
  _INewVehicle,
  _IVehicle,
} from 'src/shared/interfaces/vehicles.interface';
import { CentertData } from 'src/shared/schemas/center-data.schema';
import { CenterImage } from 'src/shared/schemas/center-image.schema';
import { ParkingCenter } from 'src/shared/schemas/parking-centers.schema';
import {
  determineCenterType,
  sanitizeCenterData,
} from 'src/shared/utils/slots.utils';

@Injectable()
export class ParkingCenterService {
  private logger = new Logger();
  constructor(
    @InjectModel(ParkingCenter.name)
    private parkingCenterModel: Model<_IDbParkingCenter>,
    @InjectModel(CentertData.name)
    private centerDataModel: Model<_IDbCenterData>,
    @InjectModel(CenterImage.name)
    private centerImagesModel: Model<_IDbCenterImage[]>,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  handleDailyReset() {
    // Assuming you have a method in ParkingCenterService to reset daily bookings
    this.resetDailyBookings();
  }

  async resetDailyBookings(): Promise<void> {
    try {
      // Reset total_daily_bookings to 0 for all centers
      await this.parkingCenterModel.updateMany(
        {},
        { $set: { total_daily_bookings: 0 } },
      );
    } catch (error) {
      // Handle the error appropriately (log it, throw a custom exception, etc.)
      throw new Error(`Error resetting daily bookings: ${error.message}`);
    }
  }

  //FIND METHODS
  async findAllCenters() {
    try {
      return await this.parkingCenterModel.find();
    } catch (error) {
      throw new Error(error.message || 'Could not find Centers');
    }
  }
  async findPopulatedCenters() {
    const centers = await this.findAllCenters();

    return await this.populateCentersFields<_IDbParkingCenter[]>(centers, '');
  }
  async findCentersOfOwner(owner: string) {
    try {
      return await this.parkingCenterModel.find({ owner });
    } catch (error) {
      throw new Error(error.message || 'Could not find Centers');
    }
  }
  async findPopulatedCentersOfOwner(owner: string) {
    const centers = await this.findCentersOfOwner(owner);

    return await this.populateCentersFields<_IDbParkingCenter[]>(centers, '');
  }
  //END OF FIND METHODS

  // NEW METHODS
  async newParkingCenter(data: _INewParkingCenter) {
    try {
      return await this.parkingCenterModel.create(data);
    } catch (error) {
      throw new NotAcceptableException(error.message);
    }
  }
  // END OF NEW METHODS

  //METHOD TO POPULATE FIELDS
  async populateCentersFields<T>(
    centers: _IDbParkingCenter[],
    fields: string,
    deepFields = '',
  ): Promise<T | _IDbParkingCenter[]> {
    const populatedCenters = await Promise.all(
      centers.map(async (center) => {
        const populatedCenter = await this.parkingCenterModel.populate(center, {
          path: fields,
          strictPopulate: false,
          populate: {
            path: deepFields,
            strictPopulate: false,
          },
        });
        return populatedCenter;
      }),
    );

    return populatedCenters;
  }

  //GET METHODS
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

  async getCenterDataByCenter(center_id: string): Promise<_ICenterData> {
    try {
      const data = await this.centerDataModel.findOne({ center_id }).exec();

      return sanitizeCenterData(data);
    } catch (error) {
      throw new NotFoundException(error.message || 'Slot data not found');
    }
  }

  async getCenterDataById(dataId: string): Promise<_ICenterData> {
    try {
      const data = await this.centerDataModel
        .findById(new Types.ObjectId(dataId))
        .exec();

      return sanitizeCenterData(data);
    } catch (error) {
      throw new NotFoundException(error.message || 'Slot data not found');
    }
  }
  //END OF GET METHODS

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

  //ADD METHODS
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

  async addCenterData(data: _IAddCenterData): Promise<_ICenterData> {
    try {
      const center_data = await this.centerDataModel.create(data);

      return sanitizeCenterData(center_data);
    } catch (error) {
      throw new Error(error.message || 'Could not add data');
    }
  }

  async addCenter(owner: string, data: _IAddParkingCenter): Promise<string> {
    try {
      const { center_name, description } = data;

      const existingCenter = await this.parkingCenterModel.findOne({
        center_name,
      });

      if (existingCenter) {
        throw new NotAcceptableException('This center already exists');
      }

      const newCenter = await this.newParkingCenter({
        center_name,
        description,
        type: CenterTypes.TYPE_C,
        owner,
      });

      await newCenter.save();

      const center_data = await this.centerDataModel.findOne({
        center_id: newCenter._id,
      });

      // If slot data is not found, dont make any change and then return the id
      if (!center_data) {
        return newCenter._id.toString();
      }

      // Determine the type based on fetched slot data
      const type = determineCenterType(center_data);

      // Update the new slot with the determined type
      newCenter.type = type;

      // Save the slot again with the determined type
      await newCenter.save();

      return newCenter._id.toString();
    } catch (error) {
      throw new Error(error.message || 'Failed to add slot. Please try again.');
    }
  }
  //END OF ADD METHODS
}
