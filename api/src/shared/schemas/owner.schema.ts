import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { UserType } from '../enums/users.enum';

export type ParkOwnerDocument = HydratedDocument<ParkOwner>;

@Schema({ _id: false, timestamps: true })
export class ParkOwner {
  userType: UserType;

  password: string;

  email: string;

  phone_number: string;

  createdAt: Date;

  updatedAt: Date;
}

export const ParkOwnerSchema = SchemaFactory.createForClass(ParkOwner);

ParkOwnerSchema.virtual('centers', {
  ref: 'ParkingCenter',
  localField: '_id',
  foreignField: 'owner',
  justOne: false
});

ParkOwnerSchema.virtual('rankings', {
  ref: 'OwnerRankings',
  localField: '_id',
  foreignField: 'owner',
  justOne: true
});

ParkOwnerSchema.virtual('profile', {
  ref: 'Profile',
  localField: '_id',
  foreignField: 'owner',
  justOne: true
});
