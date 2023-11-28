import { CenterTypes, SlotTypes } from '../enums/slots.enum';
import {
  _IDbCenterImage,
  _IDbSlotImage,
  _IParkingCenterImage,
  _ISlotImage,
} from './images.interface';
import { _IDbVehicle, _IVehicle } from './vehicles.interface';
import { Document } from 'mongoose';

interface _IDbParkingCenter extends Document {
  center_name: string;
  description: string;
  type: CenterTypes; // to be changed into enum depending on slot spaces and total slots
  center_data: _IDbCenterData;
  center_images: Array<_IDbCenterImage>;
  slots: Array<_IDbSlot>;
  owner: string;
}
interface _IParkingCenter {
  _id: string;
  center_name: string;
  description: string;
  type: CenterTypes; // to be changed into enum depending on slot spaces and total slots
  center_data: _ICenterData;
  center_images: Array<_IParkingCenterImage>;
  slots: Array<_ISlot>;
  owner: string;
}

interface _IDbSlot extends Document {
  slot_name: string;
  description: string;
  type: SlotTypes; // to be changed to enum depending on slot space;
  slot_images: Array<_IDbSlotImage>;
  isAvailable: boolean;
  slot_data: _IDbSlotData;
  center_id: string;
}
interface _ISlot {
  _id: string;
  slot_name: string;
  description: string;
  type: SlotTypes; // to be changed to enum depending on slot space;
  slot_images: Array<_ISlotImage>;
  isAvailable: boolean;
  slot_data: _ISlotData;
  center_id: string;
}

interface _IDbSlotData extends Document {
  total_daily_bookings: number;
  total_weekly_bookings: number;
  total_bookings: number;
  total_monthly_bookings: number;
  total_yearly_bookings: number;
  slot_id: string;
}
interface _ISlotData {
  _id: string;
  total_daily_bookings: number;
  total_weekly_bookings: number;
  total_bookings: number;
  total_monthly_bookings: number;
  total_yearly_bookings: number;
  slot_id: string;
}

interface _IDbCenterData extends Document {
  total_daily_bookings: number;
  total_weekly_bookings: number;
  total_bookings: number;
  total_monthly_bookings: number;
  total_yearly_bookings: number;
  total_slots: number;
  center_id: string;
}
interface _ICenterData {
  _id: string;
  total_daily_bookings: number;
  total_weekly_bookings: number;
  total_bookings: number;
  total_monthly_bookings: number;
  total_yearly_bookings: number;
  total_slots: number;
  center_id: string;
}

interface _IDbSlotReservation extends Document {
  slot: _IDbSlot; // can contain details of parking center
  vehicle: _IDbVehicle; // can contain details of customer
  time_of_reservation: Date;
  wait_time: number;
  start_time: Date;
  end_time: Date; // to be calculated automatically
  duration_of_reservation: number; // in minutes, will probably be formatted to the client
  cost_of_reservation: number;
}
interface _IDbReservationData extends Document {
  center_id: string;
  date: Date;
  total_daily_bookings: number;
}

interface _IReservationData {
  _id: string;
  center_id: string;
  date: Date;
  total_daily_bookings: number;
}
interface _ISlotReservation {
  _id: string;
  slot: _ISlot; // can contain details of parking center
  vehicle: _IVehicle; // can contain details of customer
  time_of_reservation: Date;
  wait_time: number;
  start_time: Date;
  end_time: Date; // to be calculated automatically
  duration_of_reservation: number; // in minutes, will probably be formatted to the client
  cost_of_reservation: number;
}

interface _IAddParkingCenter {
  center_name: string;
  description: string;
}
interface _IAddSlot {
  slot_name: string;
  description: string;
}
interface _INewSlot extends _IAddSlot {
  center_id: string;
  isAvailable: boolean;
  type: SlotTypes;
}
interface _INewParkingCenter extends _IAddParkingCenter {
  owner: string;
  type: CenterTypes;
}

interface _IAddData {
  total_daily_bookings: number;
  total_weekly_bookings: number;
  total_bookings: number;
  total_monthly_bookings: number;
  total_yearly_bookings: number;
}

interface _IAddCenterData extends _IAddData {
  total_slots: number;
  center_id: string;
}
interface _IAddSlotData extends _IAddData {
  slot_id: string;
}

export {
  _ISlotReservation,
  _IParkingCenter,
  _ISlot,
  _ISlotData,
  _IAddParkingCenter,
  _IDbParkingCenter,
  _IDbSlot,
  _IDbSlotReservation,
  _IAddSlot,
  _INewSlot,
  _INewParkingCenter,
  _IDbSlotData,
  _IDbCenterData,
  _ICenterData,
  _IAddCenterData,
  _IAddSlotData,
  _IReservationData,
  _IDbReservationData,
};
