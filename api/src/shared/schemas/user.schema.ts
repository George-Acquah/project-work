import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Document } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { UserType } from '../enums/users.enum';
import { ParkOwner } from './owner.schema';
import { Customer } from './customer.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({
  discriminatorKey: 'userType',
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})
export class User extends Document {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  phone_number: string;

  @Prop({ type: String, required: true, enum: [Customer.name, ParkOwner.name] })
  userType: UserType;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.virtual('image', {
  ref: 'UserImage',
  localField: '_id',
  foreignField: 'userId',
  justOne: true
});

UserSchema.virtual('profile', {
  ref: 'Profile',
  localField: '_id',
  foreignField: 'userId',
  justOne: true
});

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
