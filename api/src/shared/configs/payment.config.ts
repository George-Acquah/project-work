import { registerAs } from '@nestjs/config';
import { PAYMENT_KEY } from './constants.config';
import { _IPaymentConfig } from './types.config';

//Populate payment config values here
const paymentConfig: _IPaymentConfig = {
  // path: process.env.TOKEN_PATH,
  hubtelBaseUrl: process.env.HUBTEL_BASE_URL,
  clientId: process.env.HUBTEL_CLIENT_ID,
  clientSecret: process.env.HUBTEL_CLIENT_SECRET,
  merchantAccountNumber: process.env.HUBTEL_MERCHANT_ACCOUNT_NUMBER,
  callbackUrl: process.env.HUBTEL_CALLBACK_URL,
  cancellationUrl: process.env.HUBTEL_CANCELLATION_URL,
  returnUrl: process.env.HUBTEL_RETURN_URL,
};

//Register populated payment configs in nestjs config
export const PaymentConfig = registerAs(PAYMENT_KEY, () => paymentConfig);
