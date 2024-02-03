import { Document, Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ParkingCenter } from './parking-centers.schema';

export type CenterAddressDocument = Document & CenterAddress;

@Schema()
export class CenterAddress {
  @Prop({ type: String, required: true })
  address: number;

  @Prop({ type: String, required: true })
  city: number;

  @Prop({ type: String })
  state: Record<string, number>;

  @Prop({ type: String })
  country: Record<string, number>;

  @Prop({ type: Number, required: true })
  latitude: number;

  @Prop({ type: Number, required: true })
  longitude: number;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'ParkingCenter',
    required: true,
  })
  center_id: ParkingCenter;
}

export const CenterAddressSchema = SchemaFactory.createForClass(CenterAddress);
