import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { ParkingCenter } from './parking-centers.schema';

export type CenterImageDocument = HydratedDocument<CenterImage>;

@Schema()
export class CenterImage {
  @Prop({ type: String, required: true, default: null, unique: true })
  file_id: string;

  @Prop({ type: String, required: true, default: null, unique: true })
  filename: string;

  @Prop({ type: String, required: true, default: null })
  mimetype: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'ParkingCenter',
    required: true
  })
  center_id: ParkingCenter;
}

export const CenterImageSchema = SchemaFactory.createForClass(CenterImage);
