import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

export type VehicleDocument = HydratedDocument<Vehicle>;

@Schema()
export class Vehicle {
  @Prop({ type: String, required: true })
  vehicle_no: string;

  @Prop({ type: Boolean, default: false })
  isVerified: boolean;

  @Prop({ type: Boolean, default: false })
  hasSlot: boolean;

  @Prop([{ type: Array, required: false, default: null }])
  images: Array<string>;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  driver: MongooseSchema.Types.ObjectId;
}

export const VehicleSchema = SchemaFactory.createForClass(Vehicle);
