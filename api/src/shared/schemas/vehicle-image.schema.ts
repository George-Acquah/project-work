import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type VehicleImageDocument = HydratedDocument<VehicleImage>;

@Schema()
export class VehicleImage {
  @Prop({ type: String, required: true, default: null, unique: true })
  file_id: string;

  @Prop({ type: String, required: true, default: null, unique: true })
  filename: string;

  @Prop({ type: String, required: true, default: null })
  mimetype: string;
}

export const VehicleImageSchema = SchemaFactory.createForClass(VehicleImage);
