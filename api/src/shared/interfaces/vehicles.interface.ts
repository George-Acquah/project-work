import { Document } from 'mongoose';
import { _IDbVehicleImage, _IVehicleImage } from './images.interface';
import { VehicleTypes } from '../enums/vehicles.enum';
export interface _IDbVehicle extends Document {
  vehicle_no: string;
  isVerified: boolean;
  hasSlot: boolean;
  images: Array<_IDbVehicleImage>;
  driver: string;
}

export interface _IDbVehicleInsurance extends Document {
  policyNumber: string;
  insurer: string;
  startDate: Date;
  endDate: Date;
  premiumAccount: number;
  vehicle: string;
}

export interface _IVehicleInsurance extends Document {
  _id: string;
  policyNumber: string;
  insurer: string;
  startDate: Date;
  endDate: Date;
  premiumAccount: number;
  vehicle: string;
}
export interface _IDbVehicleRegistration extends Document {
  registrationNumber: string;
  registrationDate: Date;
  expiryDate: Date;
  premiumAccount: number;
  vehicle: string;
}

export interface _IVehicleRegistration extends Document {
  _id: string;
  registrationNumber: string;
  registrationDate: Date;
  expiryDate: Date;
  premiumAccount: number;
  vehicle: string;
}

export interface _IDbVehicleNew extends Document {
  vehicle_no: string;
  isVerified: boolean;
  hasSlot: boolean;
  vehicleType: VehicleTypes;
  make: string;
  vehicleModel: string;
  yearOfManufacture: number;
  color: string;
  vehicle_images: Array<_IDbVehicleImage>;
  vehicle_insurance: Array<_IDbVehicleInsurance>;
  vehicle_registration: _IDbVehicleRegistration;
  driver: string;
}

export interface _IVehicleNew extends Document {
  _id: string;
  vehicle_no: string;
  isVerified: boolean;
  hasSlot: boolean;
  vehicleType: VehicleTypes;
  make: string;
  vehicleModel: string;
  yearOfManufacture: number;
  color: string;
  vehicle_images: Array<_IVehicleImage>;
  vehicle_insurance: Array<_IVehicleInsurance>;
  vehicle_registration: _IVehicleRegistration;
  driver: string;
}
export interface _IVehicle {
  _id: string;
  vehicle_no: string;
  isVerified: boolean;
  hasSlot: boolean;
  images: Array<_IVehicleImage>;
  driver: string;
}

interface _IAddVehicle {
  vehicle_no: string;
}

interface _INewVehicle extends _IAddVehicle {
  isVerified: boolean;
  hasSlot: boolean;
  images: Array<_IDbVehicleImage>;
  driver: string;
}

export interface _IFormattedVehicle {
  [key: string]: string | boolean | null;
  _id: string;
  vehicle_no: string;
  isVerified: string;
  registration_number: string;
  description: string;
  registration_date: string;
  expiry_date: string;
  last_updated: string;
  has_insurance: string;
  image: string | null;
  has_reservation: string;
}

export { _IAddVehicle, _INewVehicle };
