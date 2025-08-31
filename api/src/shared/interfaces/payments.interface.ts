import { Document } from 'mongoose';
import { PAYMENT_STATUS } from '../enums/general.enum';

export interface _IDbPayment extends Document {
  amount: number;
  clientReference: string;
  description: string;
  customerMobileNumber: string;
  reservationId: string;
  status: PAYMENT_STATUS;
  createdAt: Date;
  updatedAt: Date;
}
