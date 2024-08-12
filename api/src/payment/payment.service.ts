import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { PAYMENT_KEY } from 'src/shared/configs/constants.config';
import { _IPaymentConfig } from 'src/shared/configs/types.config';

@Injectable()
export class PaymentService {
  private readonly hubtelBaseUrl: string;
  private readonly clientId: string;
  private readonly clientSecret: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService
  ) {
    const { hubtelBaseUrl, clientId, clientSecret } =
      this.configService.get<_IPaymentConfig>(PAYMENT_KEY);

    this.hubtelBaseUrl = hubtelBaseUrl;
    this.clientId = clientId;
    this.clientSecret = clientSecret;
  }

  async requestMoney(
    mobileNumber: string,
    amount: number,
    title: string,
    description: string,
    clientReference: string,
    callbackUrl: string,
    returnUrl?: string,
    cancellationUrl?: string,
    logo?: string
  ): Promise<any> {
    const payload = {
      amount,
      title,
      description,
      clientReference,
      callbackUrl,
      returnUrl,
      cancellationUrl,
      logo
    };

    const url = `${this.hubtelBaseUrl}/request-money/${mobileNumber}`;

    try {
      const response = this.httpService.post(url, payload, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${Buffer.from(
            `${this.clientId}:${this.clientSecret}`
          ).toString('base64')}`
        }
      });

      return await lastValueFrom(response);
    } catch (error) {
      throw new Error(
        `Payment request failed: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  }
}
