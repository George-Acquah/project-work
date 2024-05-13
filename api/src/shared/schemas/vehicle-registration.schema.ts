import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { Vehicle } from './vehicle.schema';

export type VehicleRegistrationDocument = HydratedDocument<VehicleRegistration>;

@Schema()
export class VehicleRegistration {
  @Prop({ type: String, required: true })
  registrationNumber: string;

  @Prop({ type: Date, required: true })
  registrationDate: Date;

  @Prop({ type: Date, required: true })
  expiryDate: Date;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Vehicle',
    required: true
  })
  vehicle: Vehicle;
}

export const VehicleRegistrationSchema =
  SchemaFactory.createForClass(VehicleRegistration);
