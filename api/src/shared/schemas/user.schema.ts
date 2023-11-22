import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Document, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { UserType } from '../enums/users.enum';
import { ParkOwner } from './owner.schema';
import { Customer } from './customer.schema';
import { Profile } from './profile.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({ discriminatorKey: 'userType' })
export class User extends Document {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: String, required: true, enum: [Customer.name, ParkOwner.name] })
  userType: UserType;

  @Prop({
    type: Types.ObjectId,
    ref: 'Profile',
  })
  profile: Profile;
}

export const UserSchema = SchemaFactory.createForClass(User);

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
