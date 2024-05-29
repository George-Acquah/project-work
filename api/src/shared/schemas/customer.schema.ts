import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserType } from '../enums/users.enum';
import { HydratedDocument } from 'mongoose';

export type CustomerDocument = HydratedDocument<Customer>;

@Schema({ _id: false, toJSON: { virtuals: true } })
export class Customer {
  userType: UserType;

  password: string;

  email: string;

  phone_number: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);

CustomerSchema.virtual('vehicles', {
  ref: 'Vehicle',
  localField: '_id',
  foreignField: 'driver',
  justOne: false
});

CustomerSchema.virtual('rankings', {
  ref: 'CustomerRankings',
  localField: '_id',
  foreignField: 'driver',
  justOne: true
});

CustomerSchema.virtual('profile', {
  ref: 'Profile',
  localField: '_id',
  foreignField: 'driver',
  justOne: true
});
