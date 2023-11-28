import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { Slot } from './slot.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type SlotDataDocument = HydratedDocument<SlotData>;

@Schema()
export class SlotData {
  @Prop({ type: Number, required: true, default: 0 })
  total_daily_bookings: number;

  @Prop({ type: Number, required: true, default: 0 })
  total_weekly_bookings: number;

  @Prop({ type: Number, required: true, default: 0 })
  total_monthly_bookings: number;

  @Prop({ type: Number, required: true, default: 0 })
  total_yearly_bookings: number;

  @Prop({ type: Number, required: true, default: 0 })
  total_bookings: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Slot', required: true })
  slot_id: Slot;
}

export const SlotDataSchema = SchemaFactory.createForClass(SlotData);
