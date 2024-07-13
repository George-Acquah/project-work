import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailtrapClient } from 'mailtrap';
import { MAILTRAP_KEY } from 'src/shared/configs/constants.config';
import {
  _IMailConfig,
  _IMailRecipient,
  _IMailSender
} from 'src/shared/configs/types.config';

@Injectable()
export class MailService {
  private client: MailtrapClient;
  private sender: _IMailSender;
  private MAIL_TOKEN: string;
  private TEST_INBOX_ID: number;
  private ACCOUNT_ID: number;
  private SENDER_EMAIL: string;
  private SENDER_NAME: string;
  private RECIPIENT_EMAIL: string;
  constructor(private readonly configService: ConfigService) {
    const {
      token,
      sender_email,
      sender_name,
      recipient_email,
      test_id,
      account_id
    } = this.configService.get<_IMailConfig>(MAILTRAP_KEY);
    this.RECIPIENT_EMAIL = recipient_email;
    this.SENDER_EMAIL = sender_email;
    this.SENDER_NAME = sender_name;
    this.MAIL_TOKEN = token;
    this.ACCOUNT_ID = account_id;
    this.TEST_INBOX_ID = test_id;
    this.client = new MailtrapClient({
      token: this.MAIL_TOKEN,
      testInboxId: this.TEST_INBOX_ID,
      accountId: this.ACCOUNT_ID
    });

    this.sender = {
      email: this.SENDER_EMAIL,
      name: this.SENDER_NAME
    };
  }

  async sendTest() {
    const recipient: _IMailRecipient = {
      email: this.RECIPIENT_EMAIL
    };

    this.client
      .send({
        from: this.sender,
        to: [recipient],
        template_uuid: '1c385f98-9854-410e-a06e-c0d114e51d1e',
        template_variables: {
          user_name: 'Random Tests',
          verify_link: 'Test_Verify_link',
          get_started_link: 'Test_Get_started_link',
          onboarding_video_link: 'Test_Onboarding_video_link',
          next_step_link: 'Test_Next_step_link'
        }
      })
      .then(console.log, console.error);
  }

  async verifyAccount(email: string) {
    // Generate a verification token (UUID in this case)
    const verificationToken = '';

    // Construct the verification link (adjust the URL to your application)
    const verifyLink = `https://yourapp.com/verify?token=${verificationToken}&email=${email}`;

    // Define the recipient
    const recipient: _IMailRecipient = {
      email
    };

    // Send the verification email
    this.client
      .send({
        from: this.sender,
        to: [recipient],
        template_uuid: 'your-template-uuid', // Replace with your actual template UUID
        template_variables: {
          user_name: 'Mr George', // You might want to pass the actual user's name here
          verify_link: verifyLink,
          get_started_link: 'https://yourapp.com/get-started',
          onboarding_video_link: 'https://yourapp.com/onboarding-video',
          next_step_link: 'https://yourapp.com/next-steps'
        }
      })
      .then((response) => {
        console.log(
          `Verification email sent to ${email} with token ${verificationToken}`
        );
        return response.success;
        // Here, you might want to save the verification token and email to your database
        // so you can verify it later when the user clicks the link.
      })
      .catch((error) => {
        throw error;
      });
  }
}
