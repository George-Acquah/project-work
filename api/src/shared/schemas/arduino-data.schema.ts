// sensor-data.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ArduinoDataDocument = ArduinoData & Document;

@Schema({
  collection: 'Arduino-Data',
})
export class ArduinoData {
  @Prop({ type: Number, required: true })
  value: number;

  @Prop({ type: Date, default: Date.now() })
  timestamp: Date;
}

export const ArduinoDataSchema = SchemaFactory.createForClass(ArduinoData);
