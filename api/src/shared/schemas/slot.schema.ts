import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SlotDocument = HydratedDocument<Slot>;
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
}

const SlotSchema = SchemaFactory.createForClass(Slot);

SlotSchema.virtual('slot_data', {
  ref: 'SlotData',
  localField: '_id',
  foreignField: 'slot_id',
  justOne: true,
});
