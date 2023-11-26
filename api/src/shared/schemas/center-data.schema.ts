import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ParkingCenter } from './parking-centers.schema';

export type CentertDataDocument = HydratedDocument<CentertData>;

@Schema()
export class CentertData {
  @Prop({ type: Number, required: true, default: 0 })
  total_slots: number;

  @Prop({ type: Number, required: true, default: 0 })
  total_daily_bookings: number;

  @Prop({ type: Number })
  total_weekly_bookings: number;

  @Prop({ type: Number })
  total_monthly_bookings: number;

  @Prop({ type: Number })
  total_yearly_bookings: number;

  @Prop({ type: Number })
  total_bookings: number;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'ParkingCenter',
    required: true,
    unique: true,
  })
  center_id: ParkingCenter;
}

export const CentertDataSchema = SchemaFactory.createForClass(CentertData);

CentertDataSchema.pre<CentertData>(
  'save',
  function (next: (error?: Error) => void) {
    try {
      const { total_daily_bookings } = this;

      // Calculating other counts based on total_daily_bookings
      this.total_weekly_bookings = total_daily_bookings * 7;
      this.total_monthly_bookings = total_daily_bookings * 30; // We assume an average month
      this.total_yearly_bookings = total_daily_bookings * 365; // We assume a non-leap year

      // Calculating total_bookings based on daily, weekly, monthly, and yearly bookings
      this.total_bookings =
        total_daily_bookings +
        this.total_weekly_bookings +
        this.total_monthly_bookings +
        this.total_yearly_bookings;

      // Assuming total_slots is updated separately
      // Add additional logic here if needed

      next();
    } catch (error) {
      return next(error);
    }
  },
);
