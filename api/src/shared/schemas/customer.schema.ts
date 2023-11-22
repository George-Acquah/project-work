import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserType } from '../enums/users.enum';
import { CustomerRankings } from './rankings.schema';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

export type CustomerDocument = HydratedDocument<Customer>;

@Schema({ _id: false })
export class Customer {
  userType: UserType;

  password: string;

  email: string;

  profile: MongooseSchema.Types.ObjectId;

  @Prop()
  rankings: CustomerRankings;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
