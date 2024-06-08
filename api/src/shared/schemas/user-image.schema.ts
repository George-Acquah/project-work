import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { User } from './user.schema';

export type UserImageDocument = HydratedDocument<UserImage>;

@Schema()
export class UserImage {
  @Prop({ type: String, required: true, default: null, unique: true })
  file_id: string;

  @Prop({ type: String, required: true, default: null, unique: true })
  filename: string;

  @Prop({ type: String, required: true, default: null })
  mimetype: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'User',
    required: true
  })
  userId: User;
}

export const UserImageSchema = SchemaFactory.createForClass(UserImage);
