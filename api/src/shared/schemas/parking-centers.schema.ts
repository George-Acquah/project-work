import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { ParkOwner } from './owner.schema';
import { CenterTypes } from '../enums/slots.enum';

export type ParkingCenterDocument = HydratedDocument<ParkingCenter>;

@Schema({ timestamps: true })
export class ParkingCenter {
  @Prop({ type: String, required: true, unique: true })
  center_name: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: Boolean, required: true, default: false })
  isVerified: boolean;

  @Prop({ type: String, enum: Object.values(CenterTypes), required: true })
  type: CenterTypes;

  @Prop({ type: Date })
  createdAt: Date;

  @Prop({ type: Date })
  updatedAt: Date;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'ParkOwner',
    required: true
  })
  owner: ParkOwner;
}

export const ParkingCenterSchema = SchemaFactory.createForClass(ParkingCenter);

ParkingCenterSchema.virtual('center_images', {
  ref: 'CenterImage',
  localField: '_id',
  foreignField: 'center_id',
  justOne: false
});

ParkingCenterSchema.virtual('slots', {
  ref: 'Slot',
  localField: '_id',
  foreignField: 'center_id',
  justOne: false
});

ParkingCenterSchema.virtual('center_data', {
  ref: 'CenterData',
  localField: '_id',
  foreignField: 'center_id',
  justOne: true
});

ParkingCenterSchema.virtual('center_address', {
  ref: 'CenterAddress',
  localField: '_id',
  foreignField: 'center_id',
  justOne: true
});
