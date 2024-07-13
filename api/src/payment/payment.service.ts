import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PAYMENT_KEY } from 'src/shared/configs/constants.config';
import { _IPaymentConfig } from 'src/shared/configs/types.config';

@Injectable()
export class PaymentService {
  //instantiate variables here
  constructor(private readonly configService: ConfigService) {
    const {} = this.configService.get<_IPaymentConfig>(PAYMENT_KEY);
  }
}
