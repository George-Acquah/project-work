import {
  BadRequestException,
  Injectable,
  Logger,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AggregationService } from 'src/aggregation.service';
import { SlotTypes } from 'src/shared/enums/slots.enum';
import {
  _ICloudRes,
  _IDbSlotImage,
  _ISlotImage,
} from 'src/shared/interfaces/images.interface';
import {
  _IAddSlot,
  _IDbSlot,
  _IDbSlotData,
  _IDbSlotReservation,
  _INewSlot,
  _IReserveSlot,
  _ISlot,
  _ISlotData,
  // _ISlotReservation,
} from 'src/shared/interfaces/slot.interface';
import { SlotData } from 'src/shared/schemas/slot-data.schema';
import { SlotImage } from 'src/shared/schemas/slot-image.schema';
import { SlotReservation } from 'src/shared/schemas/slot-reservation.schema';
import { Slot } from 'src/shared/schemas/slot.schema';
import {
  determineSlotType,
  sanitizeSlot,
  sanitizeSlotData,
  sanitizeSlotImages,
  sanitizeSlots,
} from 'src/shared/utils/slots.utils';

@Injectable()
export class SlotService {
  private logger = new Logger(SlotService.name);
  constructor(
    @InjectModel(Slot.name) private slotModel: Model<_IDbSlot>,
    @InjectModel(SlotImage.name) private slotImageModel: Model<_IDbSlotImage>,
    @InjectModel(SlotData.name) private slotDataModel: Model<_IDbSlotData>,
    @InjectModel(SlotReservation.name)
    private slotReservationModel: Model<_IDbSlotReservation>,
    private readonly aggregationService: AggregationService,
  ) {}

  async findAvailableSlots(
    center_id: string,
    startTime: Date,
    duration: number,
    currentPage = 1,
    size = 5,
  ): Promise<_ISlot[]> {
    try {
      const endTime = new Date(startTime.getTime() + duration * 60000); // Calculate end time

      const availableSlots =
        await this.aggregationService.fetchAvailableDocuments(
          this.slotModel,
          center_id,
          startTime,
          endTime,
          currentPage,
          size,
          { center_id, isAvailable: false },
        );

      const populatedAvailableSlots = await this.populateSlotsFields(
        availableSlots,
        'slot_data slot_images',
      );

      return sanitizeSlots(populatedAvailableSlots);
    } catch (error) {
      throw new Error(error.message || 'Error finding available slots');
    }
  }

  async fetchSlotsPage(
    center_id: string,
    items: number,
    query = '',
  ): Promise<number> {
    try {
      const fieldNames = [];
      const totalPages = await this.aggregationService.fetchPageNumbers(
        this.slotModel,
        fieldNames,
        query,
        items,
        { center_id, isAvailable: false },
      );

      return totalPages;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch applicants.');
    }
  }

  private async createReservation(
    slot: _IDbSlot,
    duration: number,
    vehicle_id: string,
  ): Promise<_IDbSlotReservation> {
    try {
      const startTime = new Date();
      const endTime = new Date(startTime.getTime() + duration * 60000); // Calculate end time

      // Create a reservation entry
      const reservation = await this.slotReservationModel.create({
        slot_id: slot._id,
        vehicle_id,
        start_time: startTime,
        end_time: endTime,
        time_of_reservation: new Date(),
        duration_of_reservation: duration,
        cost_of_reservation: 0, // You may calculate or set the cost based on your business logic
        isValid: true,
      });

      return reservation;
    } catch (error) {
      throw new Error(error.message || 'Error creating reservation');
    }
  }

  async populateSlotsFields<T>(
    slots: _IDbSlot[],
    fields: string,
    deepFields = '',
  ): Promise<T | any> {
    const populatedSlots = await Promise.all(
      slots.map(async (slot) => {
        const populatedSlot = await this.slotModel.populate(slot, {
          path: fields,
          strictPopulate: false,
          populate: {
            path: deepFields,
            strictPopulate: false,
          },
        });
        return populatedSlot;
      }),
    );

    return populatedSlots;
  }

  async populateSlotFields<T>(
    slot: _IDbSlot,
    fields: string,
    deepFields = '',
  ): Promise<T | any> {
    const populatedSlot = await this.slotModel.populate(slot, {
      path: fields,
      strictPopulate: false,
      populate: {
        path: deepFields,
        strictPopulate: false,
      },
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
    slot_id: string,
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
        slot_name,
      });

      if (existingSlot) {
        throw new NotAcceptableException('This slot already exists');
      }

      const newSlot = await this.newSlot({
        slot_name,
        description,
        isAvailable: false,
        type: SlotTypes.TYPE_C,
        center_id,
      });

      await newSlot.save();

      const slot_data = await this.slotDataModel.findOne({
        slot_id: newSlot._id,
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

  //GET METHODS BEGIN
  async getSlotsForCenter(center_id: string) {
    const slots = await this.findSlots(center_id);

    const populatesSlots = await this.populateSlotsFields(
      slots,
      'slot_data slot_images',
    );

    return sanitizeSlots(populatesSlots);
  }

  async getAllSlots() {
    try {
      const slots = await this.slotModel.find();

      const populatesSlots = await this.populateSlotsFields(
        slots,
        'slot_data slot_images',
      );

      return sanitizeSlots(populatesSlots);
    } catch (error) {
      throw new Error(error.message || 'Could not find slots');
    }
  }
  async getSlotDetails(centerId: string, slotId: string): Promise<_ISlot> {
    try {
      const slot = await this.slotModel
        .findOne({ _id: slotId, center_id: centerId })
        .exec();
      const populatedSlot = await this.populateSlotFields(
        slot,
        'slot_images slot_data',
      );

      return sanitizeSlot(populatedSlot);
    } catch (error) {
      throw new NotFoundException(error.message || 'Slot not found');
    }
  }

  async getSlotReservation(reservation_id: string) {
    try {
      const reservation = await this.slotReservationModel.findById(
        reservation_id,
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
        status: reservation.isValid,
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
    const {
      center_id,
      slot_id,
      vehicle_id,
      start_time,
      reservation_duration,
      currentPage,
      size,
    } = reservationDto;
    const end_time = new Date(
      start_time.getTime() + reservation_duration * 60000,
    );
    const availableSlots =
      await this.aggregationService.fetchAvailableDocuments(
        this.slotModel,
        center_id,
        start_time,
        end_time,
        currentPage,
        size,
        { _id: slot_id, center_id, isAvailable: false },
      );

    if (availableSlots.length === 0) {
      throw new NotFoundException(
        'No available slots for the specified time and duration',
      );
    }

    const selectedSlot = availableSlots[0];
    selectedSlot.isAvailable = false; // Update slot availability
    await selectedSlot.save();

    const reservation = await this.createReservation(
      selectedSlot,
      reservation_duration,
      vehicle_id,
    );

    // Return reservation details
    return {
      reservationId: reservation._id,
      slotId: selectedSlot._id,
      start_time: reservation.start_time,
      end_time: reservation.end_time,
      cost_of_reservation: reservation.cost_of_reservation,
      free_waiting_time: reservation.wait_time,
    };
  }
}
