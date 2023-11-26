import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { ParkOwner } from './owner.schema';

export type ParkingCenterDocument = HydratedDocument<ParkingCenter>;

@Schema()
export class ParkingCenter {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: String, required: true })
  type: string;

  @Prop({ type: Number, required: true, default: 0 })
  total_slots: number;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'ParkOwner',
    required: true,
  })
  owner: ParkOwner;
}

export const ParkingCenterSchema = SchemaFactory.createForClass(ParkingCenter);

ParkingCenterSchema.virtual('center_images', {
  ref: 'CenterImage',
  localField: '_id',
  foreignField: 'center_id',
  justOne: true,
});

ParkingCenterSchema.virtual('slots', {
  ref: 'Slot',
  localField: '_id',
  foreignField: 'center_id',
  justOne: true,
});
