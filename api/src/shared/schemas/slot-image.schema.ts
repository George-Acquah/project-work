import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { Slot } from './slot.schema';

export type SlotImageDocument = HydratedDocument<SlotImage>;

@Schema()
export class SlotImage {
  @Prop({ type: String, required: true, default: null, unique: true })
  file_id: string;

  @Prop({ type: String, required: true, default: null, unique: true })
  filename: string;

  @Prop({ type: String, required: true, default: null })
  mimetype: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Slot', required: true })
  slot_id: Slot;
}

export const SlotImageSchema = SchemaFactory.createForClass(SlotImage);
