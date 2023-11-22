import { Prop, Schema } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

export type SlotDocument = HydratedDocument<Slot>;

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
}

@Schema()
export class Slot {
  @Prop({ type: String, required: true })
  type: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: String, required: false, default: null })
  image: string;

  @Prop({ type: Boolean, default: false })
  isAvailable: boolean;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'SlotData' })
  data: MongooseSchema.Types.ObjectId;
}
