import {
  BadRequestException,
  Injectable,
  Logger,
  NotAcceptableException,
  NotFoundException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Document, Model } from 'mongoose';
import { AggregationService } from 'src/aggregation.service';
import {
  FETCH_SLOTS_AGGREGATION,
  setPopularParkingCenterFields,
  slotsFilterFields
} from 'src/shared/constants/centers.constants';
import { createFilterConditions } from 'src/shared/constants/global.constants';
import {
  FETCH_RESERVATIONS_BY_ADMIN_AGGREGATION,
  setReservationFields
} from 'src/shared/constants/reservations.constants';
import { CREATE_PIPELINE } from 'src/shared/enums/general.enum';
import { SlotTypes } from 'src/shared/enums/slots.enum';
import { sanitizeSlotsFn } from 'src/shared/helpers/centers.sanitizers';
import { sanitizeReservationsFn } from 'src/shared/helpers/reservations.sanitizers';
import {
  _ICloudRes,
  _IDbSlotImage,
  _ISlotImage
} from 'src/shared/interfaces/images.interface';
import { _IFormattedReservation } from 'src/shared/interfaces/refactored/slots.interface';
import { _ILookup } from 'src/shared/interfaces/responses.interface';
import {
  _IAddSlot,
  _IAddress,
  _IDbSlot,
  _IDbSlotAddress,
  _IDbSlotData,
  _IDbSlotReservation,
  _INewSlot,
  _IReserveSlot,
  _ISlot,
  _ISlotData
  // _ISlotReservation,
} from 'src/shared/interfaces/slot.interface';
import { SlotAddress } from 'src/shared/schemas/slot-address.schema';
import { SlotData } from 'src/shared/schemas/slot-data.schema';
import { SlotImage } from 'src/shared/schemas/slot-image.schema';
import { SlotReservation } from 'src/shared/schemas/slot-reservation.schema';
import { Slot } from 'src/shared/schemas/slot.schema';
import {
  determineSlotType,
  sanitizeSlot,
  sanitizeSlotData,
  sanitizeSlotImages,
  sanitizeSlots
} from 'src/shared/utils/slots.utils';
import { VehiclesService } from 'src/vehicles/vehicles.service';

export interface _ITest {
  _id: string;
  latitude: number;
  longitude: number;
  city: string;
}
@Injectable()
export class SlotService {
  private logger = new Logger(SlotService.name);
  constructor(
    @InjectModel(Slot.name) private slotModel: Model<_IDbSlot>,
    @InjectModel(SlotImage.name) private slotImageModel: Model<_IDbSlotImage>,
    @InjectModel(SlotData.name) private slotDataModel: Model<_IDbSlotData>,
    @InjectModel(SlotAddress.name)
    private slotAddressModel: Model<_IDbSlotAddress>,
    @InjectModel(SlotReservation.name)
    private slotReservationModel: Model<_IDbSlotReservation>,
    private readonly aggregationService: AggregationService,
    private readonly vehicleService: VehiclesService
  ) {}

  async findAvailableSlots() {
    // size = 5 // currentPage = 1, // duration: number, // startTime: Date, // center_id: string,
    try {
      const conditions = createFilterConditions<_IDbSlot>(
        slotsFilterFields,
        ''
      );
      const {
        project_fields,
        lookups,
        unwind_fields,
        deepLookups,
        deep_unwind_fields
      } = FETCH_SLOTS_AGGREGATION;

      return this.aggregationService.dynamicDocumentsPipeline(
        this.slotModel,
        false,
        project_fields,
        conditions,
        lookups,
        unwind_fields,
        [],
        1,
        5,
        sanitizeSlotsFn,
        deepLookups,
        deep_unwind_fields
        // setPopularParkingCenterFields
      );
    } catch (error) {
      throw new Error(error.message || 'Error finding available slots');
    }
  }

  async fetchSlotsPage<T extends Document>(
    items: number,
    query = '',
    type: 'reservation' | 'slot',
    fields: (keyof T)[]
  ): Promise<number> {
    try {
      const fieldNames = fields;
      const totalPages = await this.aggregationService.pageNumbersPipeline(
        type === 'reservation'
          ? this.slotReservationModel
          : (this.slotModel as unknown as any),
        fieldNames,
        query,
        items
      );

      return totalPages;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  private async createReservation(
    slot: _IDbSlot,
    duration: number,
    start_time: Date,
    vehicle_id: string,
    number_plate: string
  ): Promise<_IDbSlotReservation> {
    try {
      const endTime = new Date(start_time.getTime() + duration * 60000); // Calculate end time

      // Create a reservation entry
      const reservation = await this.slotReservationModel.create({
        slot_id: slot._id,
        vehicle_id,
        start_time,
        number_plate,
        end_time: endTime,
        time_of_reservation: new Date(),
        duration_of_reservation: duration,
        cost_of_reservation: 0, // You may calculate or set the cost based on your business logic
        isValid: true
      });

      return reservation;
    } catch (error) {
      throw new Error(error.message || 'Error creating reservation');
    }
  }

  async populateSlotsFields<T>(
    slots: _IDbSlot[],
    fields: string,
    deepFields = ''
  ): Promise<T | any> {
    const populatedSlots = await Promise.all(
      slots.map(async (slot) => {
        const populatedSlot = await this.slotModel.populate(slot, {
          path: fields,
          strictPopulate: false,
          populate: {
            path: deepFields,
            strictPopulate: false
          }
        });
        return populatedSlot;
      })
    );

    return populatedSlots;
  }

  async populateSlotFields<T>(
    slot: _IDbSlot,
    fields: string,
    deepFields = ''
  ): Promise<T | any> {
    const populatedSlot = await this.slotModel.populate(slot, {
      path: fields,
      strictPopulate: false,
      populate: {
        path: deepFields,
        strictPopulate: false
      }
    });
    return populatedSlot;
  }

  async findSlots(center_id: string, options?: Record<string, any>) {
    try {
      const query: Record<string, any> = { center_id, ...options };
      return await this.slotModel.find(query);
    } catch (error) {
      throw new Error(error.message || 'Could not find slots');
    }
  }

  async newSlot(data: _INewSlot): Promise<_IDbSlot> {
    try {
      return await this.slotModel.create(data);
    } catch (error) {
      throw new NotAcceptableException(error.message);
    }
  }

  async addSlotImages(
    images: _ICloudRes[],
    slot_id: string
  ): Promise<_ISlotImage[]> {
    try {
      if (!slot_id || slot_id === null || slot_id === '') {
        throw new BadRequestException('Slot Id was not provided');
      }
      const dbImages = images.map((image) => {
        const { publicUrl, ...res } = image;
        const imageData = { ...res, slot_id };

        console.log(publicUrl);
        return imageData;
      });

      const savedImages = await this.slotImageModel.create(dbImages);

      return sanitizeSlotImages(savedImages) as unknown as _ISlotImage[];
    } catch (error) {
      throw new Error(error.message || 'An Error Occurred while saving Images');
    }
  }

  async addSlot(center_id: string, data: _IAddSlot): Promise<string> {
    try {
      const { slot_name, description } = data;

      const existingSlot = await this.slotModel.findOne({
        slot_name
      });

      if (existingSlot) {
        throw new NotAcceptableException('This slot already exists');
      }

      const newSlot = await this.newSlot({
        slot_name,
        description,
        isAvailable: false,
        type: SlotTypes.TYPE_C,
        center_id
      });

      await newSlot.save();

      const slot_data = await this.slotDataModel.findOne({
        slot_id: newSlot._id
      });

      // If slot data is not found, dont make any change and then return the id
      if (!slot_data) {
        return newSlot._id.toString();
      }

      // Determine the type based on fetched slot data
      const type = determineSlotType(slot_data);

      // Update the new slot with the determined type
      newSlot.type = type;

      // Save the slot again with the determined type
      await newSlot.save();

      return newSlot._id.toString();
    } catch (error) {
      throw new Error(error.message || 'Failed to add slot. Please try again.');
    }
  }

  async createSlotAddress(slot_id: string, data: _IAddress): Promise<_ITest> {
    try {
      console.log(slot_id, data);
      const slotId = '656482912cbf180fcb3aaf4d';

      const uniqueFields = { _id: slotId };
      const project_fields = ['city', 'latitude', 'longitude'];
      const err_helper = ['slot', 'slot address'];
      // Create address near Elmina Castle
      const address_sample = {
        city: 'Elmina',
        latitude: 5.085,
        longitude: -1.351,
        state: 'Central Region',
        country: 'Ghana',
        slot_id: slotId
      };

      // Create slot address in the database
      const address = await this.aggregationService.createDocumentPipeline<
        _IDbSlotAddress,
        _ITest
      >(
        this.slotAddressModel,
        project_fields,
        address_sample,
        uniqueFields,
        err_helper,
        CREATE_PIPELINE.SLOT
      );

      return address;
    } catch (error) {
      throw new Error(error.message || 'Could not add address');
    }
  }
  // END ADD METHODS

  //GET METHODS BEGIN
  async getSlotsForCenter(center_id: string) {
    const slots = await this.findSlots(center_id);

    const populatesSlots = await this.populateSlotsFields(
      slots,
      'slot_data slot_images'
    );

    return sanitizeSlots(populatesSlots);
  }

  async getAllSlots() {
    try {
      const slots = await this.slotModel.find();

      const populatesSlots = await this.populateSlotsFields(
        slots,
        'slot_data slot_images'
      );

      return sanitizeSlots(populatesSlots);
    } catch (error) {
      throw new Error(error.message || 'Could not find slots');
    }
  }

  async getAllSlotsNew(query = '', currentPage: number, items: number) {
    const conditions = createFilterConditions<_IDbSlot>(
      slotsFilterFields,
      query
    );
    const {
      project_fields,
      lookups,
      unwind_fields,
      deepLookups,
      deep_unwind_fields
    } = FETCH_SLOTS_AGGREGATION;

    return this.aggregationService.dynamicDocumentsPipeline(
      this.slotModel,
      false,
      project_fields,
      conditions,
      lookups,
      unwind_fields,
      [],
      currentPage,
      items,
      sanitizeSlotsFn,
      deepLookups,
      deep_unwind_fields
      // setPopularParkingCenterFields
    );
  }

  async getSlotDetails(centerId: string, slotId: string): Promise<_ISlot> {
    try {
      const slot = await this.slotModel
        .findOne({ _id: slotId, center_id: centerId })
        .exec();
      const populatedSlot = await this.populateSlotFields(
        slot,
        'slot_images slot_data'
      );

      return sanitizeSlot(populatedSlot);
    } catch (error) {
      throw new NotFoundException(error.message || 'Slot not found');
    }
  }

  async getSlotReservation(reservation_id: string) {
    try {
      const reservation = await this.slotReservationModel.findById(
        reservation_id
      );
      return {
        reservation_id: reservation._id,
        slot_id: reservation.slot_id,
        vehicle_id: reservation.vehicle_id,
        start_time: reservation.start_time,
        end_time: reservation.end_time,
        wait_time: reservation.wait_time,
        duration: reservation.duration_of_reservation,
        cost: reservation.cost_of_reservation,
        status: reservation.isValid
      };
    } catch (error) {
      throw new Error(error.message || 'Error getting slot bookings');
    }
  }

  async getSlotData(centerId: string, slotId: string): Promise<_ISlotData> {
    try {
      const data = await this.slotDataModel
        .findOne({ slot_id: slotId, center_id: centerId })
        .exec();
      if (!data) throw new NotFoundException('Slot data not found');
      return sanitizeSlotData(data);
    } catch (error) {
      throw new NotFoundException(error.message || 'Slot data not found');
    }
  }

  async reserveParkingSlot(reservationDto: _IReserveSlot): Promise<any> {
    const { center_id, slot_id, vehicle_id, start_time, reservation_duration } =
      reservationDto;

    try {
      const selectedSlot = await this.slotModel
        .findOne({ _id: slot_id, center_id })
        .exec();
      if (!selectedSlot) {
        throw new NotFoundException('This slot does not exist');
      }

      const numberPlate = await this.vehicleService.getLicensePlate(vehicle_id);

      if (!numberPlate) {
        throw new NotFoundException('This vehicle does not exist');
      }

      selectedSlot.isAvailable = false; // Update slot availability
      await selectedSlot.save();

      const reservation = await this.createReservation(
        selectedSlot,
        reservation_duration,
        start_time,
        vehicle_id,
        numberPlate
      );

      // Return reservation details
      return {
        reservationId: reservation._id,
        slotId: selectedSlot._id,
        start_time: reservation.start_time,
        end_time: reservation.end_time,
        cost_of_reservation: reservation.cost_of_reservation,
        free_waiting_time: reservation.wait_time
      };
    } catch (error) {
      throw error;
    }
  }

  async getAllReservations(query?: string, page = 1, limit = 5) {
    try {
      const {
        project_fields,
        lookups,
        unwind_fields,
        count_fields,
        deepLookups,
        deep_unwind_fields
      } = FETCH_RESERVATIONS_BY_ADMIN_AGGREGATION;
      const reservations =
        await this.aggregationService.dynamicDocumentsPipeline<
          _IDbSlotReservation,
          _IFormattedReservation[]
        >(
          this.slotReservationModel,
          false,
          project_fields,
          {},
          lookups,
          unwind_fields,
          count_fields,
          page,
          limit,
          sanitizeReservationsFn,
          deepLookups,
          deep_unwind_fields,
          setReservationFields
        );

      return reservations;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getSingleReservation(reservation_id: string) {
    try {
      const {
        project_fields,
        lookups,
        unwind_fields,
        count_fields,
        deepLookups,
        deep_unwind_fields
      } = FETCH_RESERVATIONS_BY_ADMIN_AGGREGATION;
      const reservation =
        await this.aggregationService.dynamicDocumentsPipeline<
          _IDbSlotReservation,
          _IFormattedReservation
        >(
          this.slotReservationModel,
          true,
          project_fields,
          { _id: new mongoose.Types.ObjectId(reservation_id) },
          lookups,
          unwind_fields,
          count_fields,
          1,
          1,
          sanitizeReservationsFn,
          deepLookups,
          deep_unwind_fields,
          setReservationFields
        );

      return reservation;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async addSlotsToAllCenters() {
    const centers = [
      {
        _id: '66bd77e7f5c9311faadc7137',
        center_name: 'test'
      },
      {
        _id: '66bd787bf5c9311faadc7142',
        center_name: 'The miners'
      },
      {
        _id: '66bd78baf5c9311faadc714d',
        center_name: 'Acc'
      },
      {
        _id: '66bd78e7f5c9311faadc715f',
        center_name: 'Kt'
      },
      {
        _id: '66bd7923f5c9311faadc716a',
        center_name: 'Golden Hill'
      }
    ];

    const slotsToAdd = [{ count: 3 }, { count: 5 }, { count: 8 }];

    for (const center of centers) {
      const slotPromises = [];

      for (const { count } of slotsToAdd) {
        for (let index = 0; index < count; index++) {
          const slotData = {
            slot_name: `${center.center_name}_Slot_${index + 1}`,
            description: `Slot ${index + 1} for ${center.center_name}`
          };

          // Add each slot creation promise to the array
          slotPromises.push(this.addSlot(center._id, slotData));
        }
      }

      // Wait for all slots to be added for the current center
      await Promise.all(slotPromises);
    }

    console.log('Slots added to all centers');
  }
}
