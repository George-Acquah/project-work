import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { Vehicle } from './vehicle.schema';

export type VehicleInsuranceDocument = HydratedDocument<VehicleInsurance>;

@Schema()
export class VehicleInsurance {
  @Prop({ type: String, required: true })
  policyNumber: string;

  @Prop({ type: String, required: true })
  insurer: string;

  @Prop({ type: Date, required: true })
  startDate: Date;

  @Prop({ type: Date, required: true })
  endDate: Date;

  @Prop({ type: Number, required: true })
  premiumAmount: number;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Vehicle',
    required: true
  })
  vehicle: Vehicle;
}

export const VehicleInsuranceSchema =
  SchemaFactory.createForClass(VehicleInsurance);
