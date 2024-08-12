import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { ParkingCenter } from './parking-centers.schema';

export type SlotDocument = HydratedDocument<Slot>;
@Schema({ timestamps: true })
export class Slot {
  @Prop({ type: String, required: true })
  type: string;

  @Prop({ type: String, required: true })
  slot_name: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: Boolean, default: false })
  isAvailable: boolean;

  @Prop({ type: Boolean, default: false })
  isVerified: boolean;

  @Prop({ type: Date })
  createdAt: Date;

  @Prop({ type: Date })
  updatedAt: Date;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'ParkingCenter',
    required: true
  })
  center_id: ParkingCenter;
}

export const SlotSchema = SchemaFactory.createForClass(Slot);

SlotSchema.virtual('slot_data', {
  ref: 'SlotData',
  localField: '_id',
  foreignField: 'slot_id',
  justOne: true
});

SlotSchema.virtual('slot_images', {
  ref: 'SlotImage',
  localField: '_id',
  foreignField: 'slot_id',
  justOne: false
});
