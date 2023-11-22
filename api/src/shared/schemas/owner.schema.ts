import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserType } from '../enums/users.enum';
import { OwnerRankings } from './rankings.schema';
import { Profile } from './profile.schema';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

export type ParkOwnerDocument = HydratedDocument<ParkOwner>;

@Schema({ _id: false })
export class ParkOwner {
  userType: UserType;

  password: string;

  email: string;

  profile: MongooseSchema.Types.ObjectId;

  @Prop()
  rankings: OwnerRankings;
}

export const ParkOwnerSchema = SchemaFactory.createForClass(ParkOwner);
