import {
  _IFormattedCenter,
  _IFormattedSlot
} from '../interfaces/refactored/slots.interface';
import { _INewProfile } from '../interfaces/refactored/user.interface';
import { _IDbParkingCenter, _IDbSlot } from '../interfaces/slot.interface';
import { _IParkOwner } from '../interfaces/users.interface';
import { convertDateToString } from '../utils/global.utils';

export function sanitizeCentersFn(
  center: _IDbParkingCenter & {
    slots_count: number;
    center_owner?: _IParkOwner;
    owner_profile: _INewProfile;
  }
  // center: any
): _IFormattedCenter {
  // Extract first image's filename if available
  const image = center?.center_images ? center.center_images[0].file_id : null;
  const owner_contact = center?.center_owner
    ? center?.center_owner?.phone_number
    : 'no contact';
  const owner_name = center?.owner_profile
    ? `${center?.owner_profile?.first_name} ${center?.owner_profile?.last_name}`
    : 'no name';

  const availableSlotsCount = center.slots.filter(
    (slot) => slot.isAvailable
  ).length;
  // Format the vehicle object according to _IFormattedVehicle interface
  const formattedCenter: _IFormattedCenter = {
    _id: center._id.toString() as string,
    image: image,
    center_name: center.center_name,
    description: center.description,
    owner_name,
    contact: owner_contact,
    location:
      `${(center?.center_address.city, center?.center_address.state)}` ??
      'no location',
    slots: center.slots_count,
    available: availableSlotsCount,
    center_type: center.type,
    createdAt: convertDateToString(
      center?.createdAt?.toDateString() ?? new Date().toDateString()
    ),
    updatedAt: convertDateToString(
      center?.updatedAt?.toDateString() ?? new Date().toDateString()
    ),
    isVerified: center.isVerified ? 'verified' : 'not verified',
    isAvailable: availableSlotsCount > 0 ? 'available' : 'not available',
    capacity: 0
  };

  return formattedCenter;
}

export function sanitizeSlotsFn(
  slot: _IDbSlot & {
    // slots_count: number;
    slot_owner?: _IParkOwner;
    center?: _IDbParkingCenter;
    owner_profile: _INewProfile;
  }
  // slot: any
): _IFormattedSlot {
  // Extract first image's filename if available
  const image = slot?.slot_images ? slot.slot_images[0].file_id : null;
  const owner_contact = slot?.slot_owner
    ? slot?.slot_owner?.phone_number
    : 'no contact';
  const owner_name = slot?.owner_profile
    ? `${slot?.owner_profile?.first_name} ${slot?.owner_profile?.last_name}`
    : 'no name';
  const center_name = slot?.center ? slot?.center?.center_name : 'no name';

  // Format the vehicle object according to _IFormattedVehicle interface
  const formattedslot: _IFormattedSlot = {
    _id: slot._id.toString() as string,
    image: image,
    slot_name: slot.slot_name,
    description: slot.description,
    // owner_name,
    // contact: owner_contact,
    location:
      `${slot?.slot_address?.city}, ${slot?.slot_address?.state}` ??
      'no location',
    // slots: slot.slots_count,
    // available: availableSlotsCount,
    slot_type: slot.type,
    parking_center: center_name,
    createdAt: convertDateToString(
      slot?.createdAt?.toDateString() ?? new Date().toDateString()
    ),
    updatedAt: convertDateToString(
      slot?.updatedAt?.toDateString() ?? new Date().toDateString()
    ),
    isVerified: slot.isVerified ? 'verified' : 'not verified',
    isAvailable: slot.isAvailable ? 'available' : 'not available',
    capacity: 0,
    price: 12
  };

  return formattedslot;
}
