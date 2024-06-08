import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { configConstants } from 'src/shared/configs/constants.config';
import { _IMailConfig } from 'src/shared/configs/types.config';

@Injectable()
export class MailService {
  private sender: string;
  private token: string;
  private recipient: string;
  constructor(private readonly configService: ConfigService) {
    const { token, sender_email, recipient_email } =
      this.configService.get<_IMailConfig>(configConstants.MAILTRAP);
    console.log(token, sender_email, recipient_email);
  }
}
