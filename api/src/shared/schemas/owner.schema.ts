import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { OwnerRankings } from './rankings.schema';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { DbUserType } from '../enums/users.enum';

export type ParkOwnerDocument = HydratedDocument<ParkOwner>;

@Schema({ _id: false })
export class ParkOwner {
  userType: DbUserType;

  password: string;

  email: string;

  profile: MongooseSchema.Types.ObjectId;

  @Prop()
  rankings: OwnerRankings;
}

export const ParkOwnerSchema = SchemaFactory.createForClass(ParkOwner);
