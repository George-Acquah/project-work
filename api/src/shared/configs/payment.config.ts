import { registerAs } from '@nestjs/config';
import { PAYMENT_KEY } from './constants.config';
import { _IPaymentConfig } from './types.config';

//Populate payment config values here
const paymentConfig: _IPaymentConfig = {
  path: process.env.TOKEN_PATH,
  url: process.env.GCP_URL
};

//Register populated payment configs in nestjs config
export const PaymentConfig = registerAs(PAYMENT_KEY, () => paymentConfig);
