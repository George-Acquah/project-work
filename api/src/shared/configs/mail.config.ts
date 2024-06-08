import { registerAs } from '@nestjs/config';

const MailConfig = {
  token: process.env.MAIL_TOKEN,
  sender_email: process.env.SENDER_EMAIL,
  recipient_email: process.env.RECIPIENT_EMAIL
};

export const MailTrapConfig = registerAs('MailTrapConfig', () => MailConfig);
