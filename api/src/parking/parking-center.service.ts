/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  Injectable,
  Logger,
  NotAcceptableException,
  NotFoundException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import mongoose, { Model, Types } from 'mongoose';
import { AggregationService } from 'src/aggregation.service';
import {
  centersFilterFields,
  FETCH_POPULAR_CENTERS_AGGREGATION,
  setPopularParkingCenterFields
} from 'src/shared/constants/centers.constants';
import { createFilterConditions } from 'src/shared/constants/global.constants';
import { SORT } from 'src/shared/enums/general.enum';
import { CenterTypes } from 'src/shared/enums/slots.enum';
import { sanitizeCentersFn } from 'src/shared/helpers/centers.sanitizers';
import {
  _ICloudRes,
  _IDbCenterImage,
  _IDbVehicleImage
} from 'src/shared/interfaces/images.interface';
import { _ILookup } from 'src/shared/interfaces/responses.interface';
import {
  _IAddCenterData,
  _IAddParkingCenter,
  _ICenterData,
  _IDbCenterData,
  _IDbParkingCenter,
  _IDbSlotReservation,
  _IDbReservationData,
  _INewParkingCenter,
  _IParkingCenter,
  _ISlotData,
  _IDbSlot,
  _IDbCenterAddress,
  _IAddCenterAddress,
  _ICenterAddress
} from 'src/shared/interfaces/slot.interface';
import {
  _IAddVehicle,
  _IDbVehicle,
  _INewVehicle,
  _IVehicle
} from 'src/shared/interfaces/vehicles.interface';
import { CenterAddress } from 'src/shared/schemas/center-address.schema';
import { CenterData } from 'src/shared/schemas/center-data.schema';
import { CenterImage } from 'src/shared/schemas/center-image.schema';
import { ParkingCenter } from 'src/shared/schemas/parking-centers.schema';
import {
  ParkingReservationData,
  SlotReservation
} from 'src/shared/schemas/slot-reservation.schema';
import { Slot } from 'src/shared/schemas/slot.schema';
import {
  determineCenterType,
  sanitizeCenter,
  sanitizeCenterAddress,
  sanitizeCenterData,
  sanitizeCenters
} from 'src/shared/utils/slots.utils';

@Injectable()
export class ParkingCenterService {
  private logger = new Logger();
  private center_populate_fields =
    'center_images center_data center_address slots';
  constructor(
    @InjectModel(ParkingCenter.name)
    private parkingCenterModel: Model<_IDbParkingCenter>,
    @InjectModel(CenterData.name)
    private centerDataModel: Model<_IDbCenterData>,
    @InjectModel(CenterImage.name)
    private centerImagesModel: Model<_IDbCenterImage[]>,
    @InjectModel(ParkingReservationData.name)
    private reservationDataModel: Model<_IDbReservationData>,
    @InjectModel(SlotReservation.name)
    private slotReservationModel: Model<_IDbSlotReservation>,
    @InjectModel(CenterAddress.name)
    private centerAddressModel: Model<_IDbCenterAddress>,
    @InjectModel(Slot.name)
    private slotModel: Model<_IDbSlot>,
    private readonly aggregationService: AggregationService
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
          await this.reservationDataModel.create({
            center_id: centerData.center_id,
            date: new Date(),
            total_daily_bookings: centerData.total_daily_bookings
          });

          // Reset total_daily_bookings to zero and save the updated CentertData document
          await this.centerDataModel.findByIdAndUpdate(centerData._id, {
            $set: { total_daily_bookings: 0 }
          });
        })
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
      })
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
      })
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
    deepFields = ''
  ): Promise<T | _IDbParkingCenter> {
    const populatedCenter = await this.parkingCenterModel.populate(center, {
      path: fields,
      strictPopulate: false,
      populate: {
        path: deepFields,
        strictPopulate: false
      }
    });
    return populatedCenter;
  }

  //GET METHODS
  async getAllParkingCenters(
    query = '',
    currentPage: number,
    items: number
  ): Promise<_IParkingCenter[]> {
    const conditions = createFilterConditions<_IDbParkingCenter>(
      centersFilterFields,
      query
    );
        const { project_fields, lookups, unwind_fields, deepLookups, deep_unwind_fields } =
          FETCH_POPULAR_CENTERS_AGGREGATION;

        return this.aggregationService.dynamicDocumentsPipeline(
          this.parkingCenterModel,
          false,
          project_fields,
          conditions,
          lookups,
          unwind_fields,
          ['slots'],
          currentPage,
          items,
          sanitizeCentersFn,
          deepLookups,
          deep_unwind_fields,
          setPopularParkingCenterFields
        );
  }

  async getPopularParkingCenters(query = '', currentPage = 1, items = 10) {
    const { project_fields, lookups, unwind_fields } =
      FETCH_POPULAR_CENTERS_AGGREGATION;

    return this.aggregationService.dynamicDocumentsPipeline(
      this.parkingCenterModel,
      false,
      project_fields,
      {},
      lookups,
      unwind_fields,
      ['slots'],
      currentPage,
      items,
      (doc: any) => ({
        ...doc,
        availableSlotsCount: doc.slots.filter((slot) => slot.isAvailable).length
      }),
      [],
      [],
      setPopularParkingCenterFields
    );
  }

  async getNearbySlots(
    latitude: number,
    longitude: number,
    radius: number,
    currentPage = 1,
    items = 10
  ) {
    const matcher = {
      'center_address.location': {
        $geoWithin: {
          $centerSphere: [[longitude, latitude], radius / 6378.1]
        }
      }
    };

    const { project_fields, lookups, unwind_fields } =
      FETCH_POPULAR_CENTERS_AGGREGATION;

    return this.aggregationService.dynamicDocumentsPipeline(
      this.parkingCenterModel,
      false,
      project_fields,
      {},
      lookups,
      unwind_fields,
      ['slots'],
      currentPage,
      items,
      (doc: any) => ({
        ...doc,
        availableSlotsCount: doc.slots.filter((slot) => slot.isAvailable).length
      }),
      [],
      [],
      setPopularParkingCenterFields
    );
  }

  async getAvailableParkingCenters(
    query = '',
    currentPage: number,
    limit: number
  ): Promise<_IParkingCenter[]> {
    const centers = await this.aggregationService.aggregate(
      this.parkingCenterModel,
      'slots',
      'center_id',
      {
        'slots.isAvailable': false
      },
      currentPage,
      limit
    );

    const populatedCenters = await Promise.all(
      centers.map(async (center) => {
        return await this.populateCentersFields<_IDbParkingCenter>(
          center,
          this.center_populate_fields,
          'slot_images slot_data'
        );
      })
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
        new Types.ObjectId(id)
      );

      const populatedCenter =
        await this.populateCentersFields<_IDbParkingCenter>(
          parkingCenter,
          'center_images center_data slots',
          'slot_images slot_data'
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
    center_id: string
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
      const { center_id } = data;

      const center = await this.parkingCenterModel.findById(
        new Types.ObjectId(center_id)
      );

      if (!center) {
        throw new NotFoundException(
          'Can not add any data to a non existent parking center'
        );
      }

      // Create center data in the database
      const centerData = await this.centerDataModel.create(data);

      return sanitizeCenterData(centerData);
    } catch (error) {
      throw new Error(error.message || 'Could not add data');
    }
  }

  async addCenterAddress(data: _IAddCenterAddress): Promise<_ICenterAddress> {
    try {
      const { center_id } = data;

      const center = await this.parkingCenterModel.findById(
        new Types.ObjectId(center_id)
      );

      if (!center) {
        throw new NotFoundException(
          'Can not add an address to a non existent parking center'
        );
      }

      // Create center data in the database
      const address = await this.centerAddressModel.create(data);
      console.log(address)
      

      return sanitizeCenterAddress(address);
    } catch (error) {
      throw new Error(error.message || 'Could not add address');
    }
  }

  async addCenter(owner: string, data: _IAddParkingCenter): Promise<string> {
    try {
      const { center_name, description } = data;

      // Check if the center already exists
      const existingCenter = await this.parkingCenterModel.findOne({
        center_name
      });

      if (existingCenter) {
        throw new NotAcceptableException('This center name already exists');
      }

      // Create a new parking center
      const newCenter = await this.newParkingCenter({
        center_name,
        description,
        type: CenterTypes.TYPE_C,
        owner
      });

      // Save the new parking center
      await newCenter.save();
      this.logger.debug(newCenter);

      // Fetch data for the created center
      const centerData = await this.centerDataModel.findOne({
        center_id: newCenter._id
      });

      // If center data is not found, return the id
      if (!centerData) {
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
        `Failed to add center. ${error.message || 'Please try again.'}`
      );
    }
  }

  //END OF ADD METHODS

  //BEGIN UPDATE METHODS
  async updateCenterAddress(
    data: _IAddCenterAddress,
    address_id: string
  ): Promise<_ICenterAddress> {
    try {
      const { center_id } = data;

      const center = await this.parkingCenterModel.findById(
        new Types.ObjectId(center_id)
      );

      if (!center) {
        throw new NotFoundException(
          'Can not add an address to a non existent parking center'
        );
      }

      // Create center data in the database
      const address = await this.centerAddressModel.create(data);

      return sanitizeCenterAddress(address);
    } catch (error) {
      throw new Error(error.message || 'Could not add address');
    }
  }

  //Aggregation
  async getSingleParkingCenterByAggregatiom(
    id: string
  ): Promise<_IParkingCenter> {
    try {
      const lookups: _ILookup[] = [
        {
          from: 'slots',
          as: 'slots',
          foreignField: 'center_id'
        },
        {
          from: 'centerimages',
          as: 'center_images',
          foreignField: 'center_id'
        },
        {
          from: 'centeraddresses',
          as: 'center_address',
          foreignField: 'center_id'
        }
      ];
      const unwind_fields = ['center_address'] as (keyof _IDbParkingCenter)[];
      const parkingCenter =
        await this.aggregationService.dynamicDocumentsPipeline<
          _IDbParkingCenter,
          _IParkingCenter
        >(
          this.parkingCenterModel,
          true,
          [],
          { _id: new mongoose.Types.ObjectId(id) },
          lookups,
          unwind_fields
        );

      console.log(parkingCenter);
      return parkingCenter;
      // return sanitizeCenter(populatedCenter);
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }
}
