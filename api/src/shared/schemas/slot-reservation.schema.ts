import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { ParkingCenter } from './parking-centers.schema';

export type SlotReservationDocument = HydratedDocument<SlotReservation>;
export type ParkingReservationDataDocument =
  HydratedDocument<ParkingReservationData>;

@Schema()
export class SlotReservation {
  @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: 'Slot' })
  slot_id: MongooseSchema.Types.ObjectId; // can contain details of parking center

  @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: 'Vehicle' })
  vehicle_id: MongooseSchema.Types.ObjectId; // can contain details of customer

  @Prop({ required: true, Type: String, index: true })
  number_plate: string;

  @Prop({ type: Boolean, default: false })
  isValid: boolean;

  @Prop({ type: Number, required: false, default: 0 })
  wait_time: number; // to be determined automatically and sent to the client

  @Prop({ type: Date, default: Date.now() })
  start_time: Date;

  @Prop({ type: Date, default: Date.now() })
  end_time: Date; // to be calculated automatically

  @Prop({ type: Date, default: Date.now() })
  time_of_reservation: Date;

  @Prop({ type: Number, default: 0 })
  duration_of_reservation: number; // in minutes, will probably be formatted to the client

  @Prop({ type: Number, default: 0 })
  cost_of_reservation: number;
}

export const SlotReservationSchema =
  SchemaFactory.createForClass(SlotReservation);

@Schema()
export class ParkingReservationData {
  @Prop({ type: Date, required: true })
  timestamp: Date;

  @Prop({ type: Number, required: true, default: 0 })
  total_bookings: number;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'ParkingCenter',
    required: true
  })
  center_id: ParkingCenter;
}

export const ParkingReservationDataSchema = SchemaFactory.createForClass(
  ParkingReservationData
);
