import { Document, Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ParkingCenter } from './parking-centers.schema';

export type CenterAddressDocument = Document & CenterAddress;

@Schema()
export class CenterAddress {
  @Prop({ type: String, required: true })
  city: string;

  @Prop({ type: Number, required: true })
  latitude: number;

  @Prop({ type: Number, required: true })
  longitude: number;

  @Prop({ type: String })
  state: string;

  @Prop({ type: String })
  country: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'ParkingCenter',
    required: true
  })
  center_id: ParkingCenter;

  @Prop({
    type: {
      type: { type: String },
      coordinates: { type: [Number], required: true }
    },
    required: true
  })
  location: {
    type: {
      type: string;
      enum: ['Point'];
      required: true;
    };
    coordinates: [number, number];
  };
}

export const CenterAddressSchema = SchemaFactory.createForClass(CenterAddress);

// Create a geospatial index on the location field
CenterAddressSchema.index({ location: '2dsphere' });

// Pre-save hook to set the location field

// Pre-update hook to set the location field
CenterAddressSchema.pre<CenterAddressDocument>(
  'findOneAndUpdate',
  function (next) {
    const update = this.getChanges() as any;
    if (update.latitude !== undefined && update.longitude !== undefined) {
      update.location = {
        type: 'Point',
        coordinates: [update.longitude, update.latitude] // [longitude, latitude]
      };
    }
    next();
  }
);
