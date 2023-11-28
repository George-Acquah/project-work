import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserConstraints } from '../enums/users.enum';
import { AddressConstraints } from '../enums/general.enum';

export type ProfileDocument = HydratedDocument<Profile>;

@Schema()
export class Profile {
  @Prop({ required: false, type: String, default: null, lowercase: true })
  first_name: {
    maxlength: [
      UserConstraints.FIRSTNAME_MAXVALUE,
      UserConstraints.FIRSTNAME_MAXLENGTH,
    ];
  };

  @Prop({ required: false, type: String, default: null, lowercase: true })
  last_name: {
    maxlength: [
      UserConstraints.LASTNAME_MAXVALUE,
      UserConstraints.LASTNAME_MAXLENGTH,
    ];
  };

  @Prop({ required: false, type: String, default: null })
  contact_no: {
    maxlength: [
      AddressConstraints.CONTACTNO_MAXVALUE,
      AddressConstraints.CONTACTNO_MAXLENGTH,
    ];
  };

  @Prop({ required: false, type: String, default: null, lowercase: true })
  area: {
    maxlength: [
      AddressConstraints.AREA_MAXVALUE,
      AddressConstraints.AREA_MAXLENGTH,
    ];
  };

  @Prop({ required: false, type: String, default: null, lowercase: true })
  city: string;

  @Prop({ required: false, type: String, default: null, lowercase: true })
  state: {
    maxlength: [
      AddressConstraints.STATE_MAXVALUE,
      AddressConstraints.STATE_MAXLENGTH,
    ];
  };

  @Prop({ required: false, type: String, default: null })
  pinCode: {
    maxlength: [
      AddressConstraints.PINCODE_MAXVALUE,
      AddressConstraints.PINCODE_MAXLENGTH,
    ];
  };
}

@Schema()
export class CustomerLocation {
  // Location schema
  @Prop({ type: String, required: true })
  location_at_pickup: string;

  @Prop({ type: String, required: true })
  current_loc: string;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
