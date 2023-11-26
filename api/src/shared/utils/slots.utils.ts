import { CenterTypes, SlotTypes } from '../enums/slots.enum';
import {
  _IDbCenterImage,
  _IDbSlotImage,
  _IParkingCenterImage,
  _ISlotImage,
} from '../interfaces/images.interface';
import {
  _ICenterData,
  _IDbCenterData,
  _IDbParkingCenter,
  _IDbSlot,
  _IDbSlotData,
  _IParkingCenter,
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

function determineCenterType(center_data: _ICenterData): CenterTypes {
  const {
    total_daily_bookings,
    total_weekly_bookings,
    total_monthly_bookings,
    total_yearly_bookings,
    total_slots,
  } = center_data;

  // Calculate the average daily bookings
  const averageDailyBookings = total_yearly_bookings / 365;

  // Calculate the average weekly bookings
  const averageWeeklyBookings = total_yearly_bookings / 52;

  // Determine the slot type based on different conditions
  if (
    (total_yearly_bookings > 1000 && total_slots > 20) ||
    (averageDailyBookings > 10 && total_slots > 20) ||
    (total_daily_bookings > 50 && total_slots > 20)
  ) {
    return CenterTypes.TYPE_A;
  } else if (
    (total_monthly_bookings > 100 && total_slots > 10) ||
    (averageWeeklyBookings > 15 &&
      total_weekly_bookings > 500 &&
      total_slots > 10)
  ) {
    return CenterTypes.TYPE_B;
  } else {
    return CenterTypes.TYPE_C;
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

function sanitizeCenterImages(
  images: _IDbCenterImage[],
): _IParkingCenterImage[] {
  return images.map((image) => {
    const { _id, file_id, filename, mimetype, center_id } = image;

    return {
      _id: _id.toString() as string,
      file_id,
      filename,
      mimetype,
      center_id,
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

function sanitizeCenterData(data: _IDbCenterData): _ICenterData {
  const {
    _id,
    total_bookings,
    total_daily_bookings,
    total_monthly_bookings,
    total_weekly_bookings,
    total_yearly_bookings,
    total_slots,
    center_id,
  } = data;

  return {
    _id: _id.toString() as string,
    center_id,
    total_slots,
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

function sanitizeSlots(slots: _IDbSlot[]): _ISlot[] {
  return slots.map((slot) => {
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
  });
}

function sanitizeCenter(center: _IDbParkingCenter): _IParkingCenter {
  const { _id, center_name, description, type, owner } = center;
  const center_images = center?.center_images;
  const center_data = center?.center_data;
  const slots = center?.slots;

  return {
    _id: _id.toString() as string,
    owner,
    center_name,
    description,
    type,
    slots: sanitizeSlots(slots) || [],
    center_images: sanitizeCenterImages(center_images) || [],
    center_data: sanitizeCenterData(center_data) || null,
  };
}

export {
  determineSlotType,
  determineCenterType,
  sanitizeSlot,
  sanitizeSlots,
  sanitizeCenter,
  sanitizeSlotImages,
  sanitizeCenterImages,
  sanitizeCenterData,
  sanitizeSlotData,
};
