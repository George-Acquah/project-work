import { CenterTypes, SlotTypes } from 'src/shared/enums/slots.enum';
import { _IAddressDb } from './addresses.interface';

export interface _IFormattedReservation {
  [key: string]: string | number | null;
  _id: string;
  slot_name: string;
  driver_name: string;
  image: string | null;
  wait_time: number;
  time_reserved: string;
  start_time: string;
  end_time: string;
  vehicle_no: string;
  duration: number;
  cost: number;
  status: string;
}

export interface _IPaymentReservation {
  _id: string;
  vehicle_no: string;
  cost: number;
  customerId: string;
  centerId: string;
  slotId: string;
}

export interface _IReservationResponse {
  slotId: string; // Unique identifier for the slot
  reservationId: string; // Unique identifier for the reservation
  cost: number; // Cost of the reservation
  numberPlate: string; // Vehicle's number plate
  startTime: Date; // Start time of the reservation
  duration: number; // Duration of the reservation in minutes
  image?: string; // Optional image associated with the reservation (if applicable)
}

export interface _IFormattedCenter {
  [key: string]: string | number | null | _IAddressDb;
  _id: string;
  center_type: CenterTypes;
  center_name: string;
  description: string;
  location: string;
  address: _IAddressDb;
  createdAt: string;
  updatedAt: string;
  isVerified: string;
  slots: number;
  image: string | null;
  isAvailable: string;
  capacity: number;
  owner_name: string;
  available: number;
}

export interface _IFormattedSlot {
  [key: string]: string | number | null;
  _id: string;
  slot_type: SlotTypes;
  slot_name: string;
  description: string;
  parking_center: string;
  location: string;
  createdAt: string;
  updatedAt: string;
  isVerified: string;
  isAvailable: string;
  image: string | null;
  capacity: number;
  price: number;
}

export interface _IFormattedAvSlot {
  [key: string]: string | number | null | _IAddressDb;
  _id: string;
  slot_type: SlotTypes;
  slot_name: string;
  description: string;
  center_name: string;
  location: string;
  createdAt: string;
  address: _IAddressDb | null;
  updatedAt: string;
  isVerified: string;
  image: string | null;
  owner_contact: string;
  owner_name: string;
  price: number;
}
export interface _IDbSlotReservationNew extends Document {
  vehicle_no: string;
}
