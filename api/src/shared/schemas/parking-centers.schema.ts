import { Prop, Schema } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Slot } from './slot.schema';

export type ParkingCenterDocument = HydratedDocument<ParkingCenter>;

@Schema()
export class SlotInfo {
  @Prop({ type: Number, required: true, default: 0 })
  total_slots: number;

  @Prop({ type: Number, required: true, default: 0 })
  available_slots: number;

  @Prop()
  slots: Slot[];
}

@Schema()
export class ParkingCenter {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: String, required: false, default: null })
  image: string;

  @Prop({ type: String, required: true })
  type: string;

  @Prop({ type: SlotInfo })
  slots_info: SlotInfo;
}
