import {
  BadRequestException,
  Injectable,
  Logger,
  NotAcceptableException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { SlotTypes } from 'src/shared/enums/slots.enum';
import {
  _ICloudRes,
  _IDbSlotImage,
} from 'src/shared/interfaces/images.interface';
import {
  _IAddSlot,
  _IDbSlot,
  _IDbSlotData,
  _INewSlot,
} from 'src/shared/interfaces/slot.interface';
import { determineSlotType } from 'src/shared/utils/slots.utils';

@Injectable()
export class SlotService {
  private logger = new Logger(SlotService.name);
  constructor(
    private slotModel: Model<_IDbSlot>,
    private slotImageModel: Model<_IDbSlotImage>,
    private slotDataModel: Model<_IDbSlotData>,
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
  ): Promise<_IDbSlotImage[]> {
    try {
      if (!slot_id || slot_id === null || slot_id === '') {
        throw new BadRequestException('Slot Id was not provided');
      }
      const dbImages = images.map((image) => {
        console.log(image);
        const { publicUrl, ...res } = image;
        const imageData = { ...res, slot_id };

        console.log(publicUrl);
        return imageData;
      });

      const savedImages = await this.slotImageModel.create(dbImages);

      return savedImages as unknown as _IDbSlotImage[];
    } catch (error) {
      throw new Error('An Error Occurred while saving Images');
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
        return newSlot._id;
      }

      // Determine the type based on fetched slot data
      const type = determineSlotType(slot_data);

      // Update the new slot with the determined type
      newSlot.type = type;

      // Save the slot again with the determined type
      await newSlot.save();

      return newSlot._id;
    } catch (error) {
      throw new Error(error.message || 'Failed to add slot. Please try again.');
    }
  }
}
