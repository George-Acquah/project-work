import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { PAYMENT_STATUS } from '../enums/general.enum';

export type TransactionDocument = HydratedDocument<Transaction>;
@Schema({ timestamps: true })
export class Transaction {
  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: String, required: true })
  clientReference: string;

  @Prop({ type: Number, required: true })
  amount: number;

  @Prop({ type: String, required: true, enum: PAYMENT_STATUS })
  status: PAYMENT_STATUS;

  @Prop({ type: Date })
  createdAt: Date;

  @Prop({ type: Date })
  updatedAt: Date;

  @Prop({
    type: String,
    ref: 'SlotReservation',
    required: true
  })
  reservationId: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
