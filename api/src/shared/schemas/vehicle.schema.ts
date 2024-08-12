import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { Customer } from './customer.schema';
import { VehicleTypes } from '../enums/vehicles.enum';

export type VehicleDocument = HydratedDocument<Vehicle>;

@Schema({ toJSON: { virtuals: true }, timestamps: true })
export class Vehicle {
  @Prop({ type: String, required: true, unique: true })
  vehicle_no: string;

  @Prop({ type: Boolean, default: false })
  isVerified: boolean;

  @Prop({ type: Boolean, default: false })
  hasSlot: boolean;

  @Prop({ type: String, enum: VehicleTypes, required: true })
  vehicleType: VehicleTypes;

  @Prop({ type: String, required: true })
  make: string;

  @Prop({ type: String, required: true })
  vehicleModel: string;

  @Prop({ type: Number, required: true })
  yearOfManufacture: number;

  @Prop({ type: String, required: true })
  color: string;

  @Prop({ type: Date })
  createdAt: Date;

  @Prop({ type: Date })
  updatedAt: Date;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Customer',
    required: true
  })
  driver: Customer;
}

export const VehicleSchema = SchemaFactory.createForClass(Vehicle);

VehicleSchema.virtual('vehicle_images', {
  ref: 'VehicleImage',
  localField: '_id',
  foreignField: 'vehicle',
  justOne: false
});

VehicleSchema.virtual('vehicle_insurance', {
  ref: 'VehicleInsurance',
  localField: '_id',
  foreignField: 'vehicle',
  justOne: false
});

VehicleSchema.virtual('vehicle_registration', {
  ref: 'VehicleRegistration',
  localField: '_id',
  foreignField: 'vehicle',
  justOne: true
});
