import {
  BadRequestException,
  Injectable,
  Logger,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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
  _INewSlot,
  _ISlot,
  _ISlotData,
} from 'src/shared/interfaces/slot.interface';
import { SlotData } from 'src/shared/schemas/slot-data.schema';
import { SlotImage } from 'src/shared/schemas/slot-image.schema';
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
  ) {}

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

  async findSlots(center_id: string) {
    try {
      return await this.slotModel.find({ center_id });
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

  async getSlotBookings(centerId: string, slotId: string): Promise<any[]> {
    try {
      // Implement logic to fetch bookings for the specified slot
      // Example: return await this.bookingModel.find({ center_id: centerId, slot_id: slotId }).exec();
      this.logger.log(centerId, slotId);
      return [];
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
}
