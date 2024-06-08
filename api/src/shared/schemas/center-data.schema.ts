import { Document, Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ParkingCenter } from './parking-centers.schema';

export type CenterDataDocument = Document & CenterData;

@Schema()
export class CenterData {
  @Prop({ type: Number, required: true, default: 0 })
  total_slots: number;

  @Prop({ type: Number, required: true, default: 0 })
  total_daily_bookings: number;

  @Prop({ type: Object }) // Change to Object type for weekly bookings
  total_weekly_bookings: Record<string, number>;

  @Prop({ type: Object }) // Change to Object type for monthly bookings
  total_monthly_bookings: Record<string, number>;

  @Prop({ type: Number, required: true, default: 0 })
  total_yearly_bookings: number;

  @Prop({ type: Number, required: true, default: 0 })
  total_bookings: number;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'ParkingCenter',
    required: true
  })
  center_id: ParkingCenter;

  // Add a custom method for calculating the week number
  calculateWeekNumber(this: CenterData): number {
    // Example: Get the current week number based on the ISO week date
    const currentDate = new Date();
    const weekNumber = Math.ceil(
      ((currentDate.getTime() -
        new Date(currentDate.getFullYear(), 0, 1).getTime()) /
        86400000 +
        1) /
        7
    );
    return weekNumber;
  }

  // Add a custom method for calculating the month number
  calculateMonthNumber(this: CenterData): number {
    // Example: Get the current month number (January is 0)
    const currentDate = new Date();
    const monthNumber = currentDate.getMonth() + 1;
    return monthNumber;
  }

  // Add a custom method for calculating the total of values in the object
  calculateTotal(this: CenterData, obj: Record<string, number>): number {
    // Example: Calculate the total of values in the object
    const total = Object.values(obj).reduce((acc, val) => acc + val, 0);
    return total;
  }
}

export const CenterDataSchema = SchemaFactory.createForClass(CenterData);

CenterDataSchema.pre<CenterData>('save', function (next) {
  try {
    const { total_daily_bookings } = this;

    // Initialize objects if they don't exist
    this.total_weekly_bookings = this.total_weekly_bookings || {};
    this.total_monthly_bookings = this.total_monthly_bookings || {};

    // Calculate counts for each week and month
    const currentWeek = 'week_' + this.calculateWeekNumber();
    const currentMonth = 'month_' + this.calculateMonthNumber();

    // Calculate counts for each week and month
    this.total_weekly_bookings[currentWeek] = total_daily_bookings * 7;
    this.total_monthly_bookings[currentMonth] = total_daily_bookings * 30;

    // Calculating total_bookings based on daily, weekly, monthly, and yearly bookings
    this.total_bookings =
      total_daily_bookings +
      this.calculateTotal(this.total_weekly_bookings) +
      this.calculateTotal(this.total_monthly_bookings) +
      this.total_yearly_bookings; // Assuming total_yearly_bookings is updated separately

    next();
  } catch (error) {
    return next(error);
  }
});
