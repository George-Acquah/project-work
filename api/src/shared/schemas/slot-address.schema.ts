import { Document, Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Slot } from './slot.schema';
import { _IAddressDb } from '../interfaces/refactored/addresses.interface';

export type SlotAddressDocument = Document & SlotAddress;

@Schema()
export class SlotAddress {
  @Prop({ type: String, required: true })
  city: string;

  @Prop({ type: Object })
  location: _IAddressDb;

  @Prop({ type: String })
  state: string;

  @Prop({ type: String })
  country: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Slot', required: true })
  slot_id: Slot;
}

export const SlotAddressSchema = SchemaFactory.createForClass(SlotAddress);
