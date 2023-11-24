import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DbUserType } from '../enums/users.enum';
import { CustomerRankings } from './rankings.schema';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

export type CustomerDocument = HydratedDocument<Customer>;

@Schema({ _id: false, toJSON: { virtuals: true } })
export class Customer {
  userType: DbUserType;

  password: string;

  email: string;

  profile: MongooseSchema.Types.ObjectId;

  @Prop()
  rankings: CustomerRankings;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);

CustomerSchema.virtual('vehicles', {
  ref: 'Vehicle',
  localField: '_id',
  foreignField: 'driver',
  justOne: false,
});
