/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  Injectable,
  Logger,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Model, Types } from 'mongoose';
import { AggregationService } from 'src/aggregation.service';
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
  _IDbReservationData,
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
import { CenterData } from 'src/shared/schemas/center-data.schema';
import { CenterImage } from 'src/shared/schemas/center-image.schema';
import { ParkingCenter } from 'src/shared/schemas/parking-centers.schema';
import { ParkingReservationData } from 'src/shared/schemas/slot-reservation.schema';
import {
  determineCenterType,
  sanitizeCenter,
  sanitizeCenterData,
  sanitizeCenters,
} from 'src/shared/utils/slots.utils';

@Injectable()
export class ParkingCenterService {
  private logger = new Logger();
  constructor(
    @InjectModel(ParkingCenter.name)
    private parkingCenterModel: Model<_IDbParkingCenter>,
    @InjectModel(CenterData.name)
    private centerDataModel: Model<_IDbCenterData>,
    @InjectModel(CenterImage.name)
    private centerImagesModel: Model<_IDbCenterImage[]>,
    @InjectModel(ParkingReservationData.name)
    private reservationDataSchema: Model<_IDbReservationData>,
    private readonly aggregationService: AggregationService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleDailyReset() {
    try {
      // Find all documents in the CentertData collection
      const allCenterData = await this.centerDataModel.find();

      // Use Promise.all to execute the updates concurrently
      await Promise.all(
        allCenterData.map(async (centerData) => {
          // Store the daily bookings in the ReservationData collection
          await this.reservationDataSchema.create({
            center_id: centerData.center_id,
            date: new Date(),
            total_daily_bookings: centerData.total_daily_bookings,
          });

          // Reset total_daily_bookings to zero and save the updated CentertData document
          await this.centerDataModel.findByIdAndUpdate(centerData._id, {
            $set: { total_daily_bookings: 0 },
          });
        }),
      );

      this.logger.log('Daily reset completed successfully.');
    } catch (error) {
      this.logger.error(`Error during daily reset: ${error.message}`);
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

    const populatedCenters = await Promise.all(
      centers.map(async (center) => {
        return await this.populateCentersFields<_IDbParkingCenter>(center, '');
      }),
    );

    return populatedCenters;
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

    const populatedCenters = await Promise.all(
      centers.map(async (center) => {
        return await this.populateCentersFields<_IDbParkingCenter>(center, '');
      }),
    );

    return populatedCenters;
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
    center: _IDbParkingCenter,
    fields: string,
    deepFields = '',
  ): Promise<T | _IDbParkingCenter> {
    const populatedCenter = await this.parkingCenterModel.populate(center, {
      path: fields,
      strictPopulate: false,
      populate: {
        path: deepFields,
        strictPopulate: false,
      },
    });
    return populatedCenter;
  }

  //GET METHODS
  async getAllParkingCenters(
    query = '',
    currentPage: number,
    items: number,
  ): Promise<_IParkingCenter[]> {
    const fieldNames = ['center_name', 'type'];
    const parkingCenters = await this.aggregationService.fetchFilteredDocuments(
      this.parkingCenterModel,
      fieldNames,
      query,
      currentPage,
      items,
    );
    const populatedCenters = await Promise.all(
      parkingCenters.map(async (center) => {
        return await this.populateCentersFields<_IDbParkingCenter>(
          center,
          'center_images center_data slots',
          'slot_images slot_data',
        );
      }),
    );

    return sanitizeCenters(populatedCenters);
  }

  async getAvailableParkingCenters(
    currentPage = 1,
    items = 3,
  ): Promise<_IParkingCenter[]> {
    const centers = await this.aggregationService.aggregate(
      this.parkingCenterModel,
      'slots',
      'center_id',
      {
        'slots.isAvailable': false,
      },
      currentPage,
      items,
    );

    const populatedCenters = await Promise.all(
      centers.map(async (center) => {
        return await this.populateCentersFields<_IDbParkingCenter>(
          center,
          'center_images center_data slots',
          'slot_images slot_data',
        );
      }),
    );

    return sanitizeCenters(populatedCenters);
  }

  async getCentersByOwners(owner: string): Promise<_IParkingCenter[]> {
    try {
      const parkingCenters = (await this.parkingCenterModel
        .find({ owner })
        .populate('images')
        .lean()) as _IParkingCenter[];
      return parkingCenters;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getSingleParkingCenter(id: string): Promise<_IParkingCenter> {
    try {
      const parkingCenter = await this.parkingCenterModel.findById(
        new Types.ObjectId(id),
      );

      const populatedCenter =
        await this.populateCentersFields<_IDbParkingCenter>(
          parkingCenter,
          'center_images center_data slots',
          'slot_images slot_data',
        );
      return sanitizeCenter(populatedCenter);
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

  //ADD METHODS
  async addCenterImages(
    images: _ICloudRes[],
    center_id: string,
  ): Promise<_IDbCenterImage[]> {
    try {
      if (!center_id || center_id === null || center_id === '') {
        throw new BadRequestException('Center Id was not provided');
      }
      // Extracting relevant fields from each image
      const dbImages = images.map(({ publicUrl, ...res }) => {
        const imageReq = { ...res, center_id };
        return imageReq;
      });

      // Save the images in the database
      const savedImages = await this.centerImagesModel.create(dbImages);

      return savedImages as unknown as _IDbCenterImage[];
    } catch (error) {
      throw new Error('An error occurred while saving images');
    }
  }

  async addCenterData(data: _IAddCenterData): Promise<_ICenterData> {
    try {
      // Create center data in the database
      const centerData = await this.centerDataModel.create(data);

      return sanitizeCenterData(centerData);
    } catch (error) {
      throw new Error(error.message || 'Could not add data');
    }
  }

  async addCenter(owner: string, data: _IAddParkingCenter): Promise<string> {
    try {
      const { center_name, description } = data;

      // Check if the center already exists
      const existingCenter = await this.parkingCenterModel.findOne({
        center_name,
      });

      if (existingCenter) {
        throw new NotAcceptableException('This center already exists');
      }

      // Create a new parking center
      const newCenter = await this.newParkingCenter({
        center_name,
        description,
        type: CenterTypes.TYPE_C,
        owner,
      });

      // Save the new parking center
      await newCenter.save();
      this.logger.debug(newCenter);

      // Fetch data for the created center
      const centerData = await this.centerDataModel.findOne({
        center_id: newCenter._id,
      });

      // If center data is not found, return the id
      if (!centerData) {
        this.logger.log('returned short');
        return newCenter._id.toString();
      }

      // Determine the type based on fetched center data
      const type = determineCenterType(centerData);

      // Update the new center with the determined type
      newCenter.type = type;

      // Save the center again with the determined type
      await newCenter.save();

      return newCenter._id.toString();
    } catch (error) {
      throw new Error(
        `Failed to add center. ${error.message || 'Please try again.'}`,
      );
    }
  }

  //END OF ADD METHODS
}
