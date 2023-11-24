import { Document } from 'mongoose';
import { _IDbVehicleImage, _IVehicleImage } from './images.interface';
export interface _IDbVehicle extends Document {
  vehicle_no: string;
  isVerified: boolean;
  hasSlot: boolean;
  images: Array<_IDbVehicleImage>;
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

export { _IAddVehicle, _INewVehicle };
