import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { Customer } from './customer.schema';
import { VehicleImage } from './vehicle-image.schema';

export type VehicleDocument = HydratedDocument<Vehicle>;

@Schema()
export class Vehicle {
  @Prop({ type: String, required: true, unique: true })
  vehicle_no: string;

  @Prop({ type: Boolean, default: false })
  isVerified: boolean;

  @Prop({ type: Boolean, default: false })
  hasSlot: boolean;

  @Prop([
    {
      type: MongooseSchema.Types.ObjectId,
      ref: 'VehicleImage',
      required: true,
    },
  ])
  images: Array<VehicleImage>;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  })
  driver: Customer;
}

export const VehicleSchema = SchemaFactory.createForClass(Vehicle);
