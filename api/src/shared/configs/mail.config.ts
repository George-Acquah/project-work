import { registerAs } from '@nestjs/config';
import { MAILTRAP_KEY } from './constants.config';

const MailConfig = {
  token: process.env.MAIL_TOKEN,
  sender_email: process.env.SENDER_EMAIL,
  sender_name: process.env.SENDER_NAME,
  recipient_email: process.env.RECIPIENT_EMAIL,
  test_id: process.env.TEST_ID,
  account_id: process.env.ACCOUNT_ID
};

export const MailTrapConfig = registerAs(MAILTRAP_KEY, () => MailConfig);
