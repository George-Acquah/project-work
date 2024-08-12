import { CenterTypes, SlotTypes } from '../enums/slots.enum';
import {
  _IDbCenterImage,
  _IDbSlotImage,
  _IParkingCenterImage,
  _ISlotImage
} from './images.interface';
import { _IVehicle } from './vehicles.interface';
import { Document } from 'mongoose';

interface _IDbParkingCenter extends Document {
  center_name: string;
  description: string;
  type: CenterTypes; // to be changed into enum depending on slot spaces and total slots
  center_data: _IDbCenterData;
  isVerified: boolean;
  center_address: _IDbCenterAddress;
  center_images: Array<_IDbCenterImage>;
  slots: Array<_IDbSlot>;
  owner: string;
  createdAt: Date;
  updatedAt: Date;
}
interface _IParkingCenter {
  _id: string;
  center_name: string;
  description: string;
  type: CenterTypes; // to be changed into enum depending on slot spaces and total slots
  center_data: _ICenterData;
  center_address: _ICenterAddress;
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
  slot_address: _IDbSlotAddress;
  center_id: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}
interface _ISlot {
  _id: string;
  slot_name: string;
  description: string;
  type: SlotTypes; // to be changed to enum depending on slot space;
  slot_images: Array<_ISlotImage>;
  isAvailable: boolean;
  slot_data: _ISlotData;
  slot_address: _ISlotAddress;
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

export interface _IAddress {
  city: string;
  latitude: number;
  longitude: number;
  state: string;
  country: string;
}

interface _IDbCenterAddress extends _IAddress, Document {
  center_id: string;
}

interface _IDbSlotAddress extends _IAddress, Document {
  slot_id: string;
}
interface _ICenterAddress extends _IAddress {
  _id: string;
  center_id: string;
}

interface _ISlotAddress extends _IAddress {
  _id: string;
  slot_id: string;
}
interface _IDbSlotReservation extends Document {
  slot_id: string; // can contain details of parking center
  vehicle_id: string; // can contain details of customer
  isValid: boolean;
  number_plate: string;
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

interface _IReservationRequest {
  start_time: Date;
  reservation_duration: number;
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

interface _IAddCenterAddress extends _IAddress {
  center_id: string;
}

interface _IAddSlotAddress extends _IAddress {
  slot_id: string;
}

interface _IReserveSlot {
  slot_id: string;
  center_id: string;
  vehicle_id: string;
  start_time: Date;
  start_date: Date;
  reservation_duration: number;
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
  _IReservationRequest,
  _IReserveSlot,
  _IDbSlotAddress,
  _IDbCenterAddress,
  _ICenterAddress,
  _ISlotAddress,
  _IAddCenterAddress,
  _IAddSlotAddress
};
