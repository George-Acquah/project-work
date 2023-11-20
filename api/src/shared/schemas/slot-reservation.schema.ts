import { Prop, Schema } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Slot } from './slot.schema';
import { Vehicle } from './vehicle.schema';

export type SlotReservationDocument = HydratedDocument<SlotReservation>;

@Schema()
export class SlotReservation {
  @Prop({ required: true })
  slot_id: Slot; // can contain details of parking center

  @Prop({ required: true })
  vehicle_id: Vehicle; // can contain details of customer

  @Prop({ type: Boolean, default: false })
  isValid: boolean;

  @Prop({ type: Number, required: false, default: 0 })
  wait_time: number;

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
