import { CenterTypes, SlotTypes } from 'src/shared/enums/slots.enum';

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

export interface _IFormattedCenter {
  [key: string]: string | number | null;
  _id: string;
  center_type: CenterTypes;
  center_name: string;
  description: string;
  location: string;
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
export interface _IDbSlotReservationNew extends Document {
  vehicle_no: string;
}
