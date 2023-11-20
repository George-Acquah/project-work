import { Prop, Schema } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type VehicleDocument = HydratedDocument<Vehicle>;

@Schema()
export class Vehicle {
  @Prop({ type: String, required: true })
  vehicle_no: string;

  @Prop({ type: Boolean, default: false })
  isVerified: boolean;

  @Prop({ type: Boolean, default: false })
  hasSlot: boolean;

  @Prop({ type: String, required: false, default: null })
  images: string[];
}
