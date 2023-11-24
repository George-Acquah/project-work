import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserImageDocument = HydratedDocument<VehicleImage>;

@Schema()
export class VehicleImage {
  @Prop({ type: String, required: true, default: null })
  file_id: string;

  @Prop({ type: String, required: true, default: null })
  filename: string;

  @Prop({ type: String, required: true, default: null })
  mimetype: string;
}

export const VehicleImageSchema = SchemaFactory.createForClass(VehicleImage);
