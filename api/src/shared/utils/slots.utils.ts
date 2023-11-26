import { SlotTypes } from '../enums/slots.enum';
import { _IDbSlotImage, _ISlotImage } from '../interfaces/images.interface';
import {
  _IDbSlot,
  _IDbSlotData,
  _ISlot,
  _ISlotData,
} from '../interfaces/slot.interface';

function determineSlotType(slot_data: _ISlotData): SlotTypes {
  const {
    total_daily_bookings,
    total_weekly_bookings,
    total_monthly_bookings,
    total_yearly_bookings,
  } = slot_data;

  // Calculate the average daily bookings
  const averageDailyBookings = total_yearly_bookings / 365;

  // Calculate the average weekly bookings
  const averageWeeklyBookings = total_yearly_bookings / 52;

  // Determine the slot type based on different conditions
  if (
    total_yearly_bookings > 1000 ||
    averageDailyBookings > 10 ||
    total_daily_bookings > 50
  ) {
    return SlotTypes.TYPE_A;
  } else if (
    total_monthly_bookings > 100 ||
    (averageWeeklyBookings > 15 && total_weekly_bookings > 500)
  ) {
    return SlotTypes.TYPE_B;
  } else {
    return SlotTypes.TYPE_C;
  }
}

function sanitizeSlotImages(images: _IDbSlotImage[]): _ISlotImage[] {
  return images.map((image) => {
    const { _id, file_id, filename, mimetype, slot_id } = image;

    return {
      _id: _id.toString() as string,
      file_id,
      filename,
      mimetype,
      slot_id,
    };
  });
}

function sanitizeSlotData(data: _IDbSlotData): _ISlotData {
  const {
    _id,
    total_bookings,
    total_daily_bookings,
    total_monthly_bookings,
    total_weekly_bookings,
    total_yearly_bookings,
    slot_id,
  } = data;

  return {
    _id: _id.toString() as string,
    slot_id,
    total_bookings,
    total_daily_bookings,
    total_monthly_bookings,
    total_weekly_bookings,
    total_yearly_bookings,
  };
}

function sanitizeSlot(slot: _IDbSlot): _ISlot {
  const { _id, slot_name, description, type, isAvailable, center_id } = slot;
  const slot_images = slot?.slot_images;
  const slot_data = slot?.slot_data;

  return {
    _id: _id.toString() as string,
    center_id,
    slot_name,
    description,
    type,
    isAvailable,
    slot_images: sanitizeSlotImages(slot_images) || [],
    slot_data: sanitizeSlotData(slot_data) || null,
  };
}

export { determineSlotType, sanitizeSlot };
