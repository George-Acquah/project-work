import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { Vehicle } from './vehicle.schema';

export type VehicleImageDocument = HydratedDocument<VehicleImage>;

@Schema()
export class VehicleImage {
  @Prop({ type: String, required: true, default: null, unique: true })
  file_id: string;

  @Prop({ type: String, required: true, default: null, unique: true })
  filename: string;

  @Prop({ type: String, required: true, default: null })
  mimetype: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Vehicle',
    required: true
  })
  vehicle: Vehicle;
}

export const VehicleImageSchema = SchemaFactory.createForClass(VehicleImage);
