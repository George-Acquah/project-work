import { Document } from 'mongoose';

export interface _IVehicle extends Document {
  vehicle_no: string;
  isVerified: boolean;
  hasSlot: boolean;
  images: string[];
  driver: string;
}

export interface _IDbVehicle {
  _id: string;
  vehicle_no: string;
  isVerified: boolean;
  hasSlot: boolean;
  images: string[];
}

export interface _IPlainVehicle {
  _id: string;
  vehicle_no: string;
  isVerified: boolean;
  hasSlot: boolean;
  images: string[];
  // driver: string;
}

interface _IAddVehicle {
  vehicle_no: string;
}

interface _INewVehicle extends _IAddVehicle {
  isVerified: boolean;
  hasSlot: boolean;
  images: Array<string>;
  driver: string;
}

export { _IAddVehicle, _INewVehicle };
