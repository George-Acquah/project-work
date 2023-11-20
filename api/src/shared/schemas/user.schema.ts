import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Document } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { UserType } from '../enums/users.enum';
import { Profile } from './profile.schema';
import { CustomerRankings, OwnerRankings } from './rankings.schema';
import { Vehicle } from './vehicle.schema';
import { ParkingCenter } from './parking-centers.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class Customer {
  userType: UserType;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  profile: Profile;

  @Prop()
  vehicles: Vehicle[];

  @Prop()
  rankings: CustomerRankings;
}

@Schema()
export class ParkOwner {
  userType: UserType;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  profile: Profile;

  @Prop()
  centers: ParkingCenter[]; // To be changed to parking center interface

  @Prop()
  rankings: OwnerRankings;
}

@Schema({ discriminatorKey: 'userType' })
export class User extends Document {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: String, required: true, enum: [Customer.name, ParkOwner.name] })
  userType: UserType;
}

export const UserSchema = SchemaFactory.createForClass(User);
export const CustomerSchema = SchemaFactory.createForClass(Customer);
export const ParkOwnerSchema = SchemaFactory.createForClass(ParkOwner);

UserSchema.pre('save', async function (next: (err?: Error) => void) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const hashed = await bcrypt.hash(this['password'], 10);
    this['password'] = hashed;
    return next();
  } catch (err) {
    return next(err);
  }
});
