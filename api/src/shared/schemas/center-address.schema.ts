import { Document, Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ParkingCenter } from './parking-centers.schema';
import { _IAddressDb } from '../interfaces/refactored/addresses.interface';

export type CenterAddressDocument = Document & CenterAddress;

@Schema()
export class CenterAddress {
  @Prop({ type: String, required: true })
  city: string;

  // @Prop({ type: Number, required: true })
  // latitude: number;

  // @Prop({ type: Number, required: true })
  // longitude: number;

  @Prop({ type: Object })
  location: _IAddressDb;

  @Prop({ type: String })
  state: string;

  @Prop({ type: String })
  country: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'ParkingCenter',
    required: true
  })
  center_id: ParkingCenter;
}

export const CenterAddressSchema = SchemaFactory.createForClass(CenterAddress);
