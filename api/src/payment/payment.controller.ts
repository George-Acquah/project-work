import { Controller, Post, Query, Body, UseInterceptors, Param } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { IRequestPaymentDto, PaymentCallbackResponseDto, RequestMoneyDto } from './dto/request-money.dto';
import { PhoneNumberInterceptor } from 'src/shared/interceptors/phone-number.interceptor';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentService: PaymentService) {}


  @Post('initiate-payment')
  @UseInterceptors(PhoneNumberInterceptor)
  async initiatePayment(
    @Body() requestMoneyDto: IRequestPaymentDto,
  ) {

    return this.paymentService.InitiateHubtelPayment(
     {
      amount: requestMoneyDto.amount,
      description: requestMoneyDto.description,
      clientReference: requestMoneyDto.clientReference,
      customerMobileNumber: requestMoneyDto.customerMobileNumber
     }
    );
  }

  @Post('callback/:clientReference')
  @UseInterceptors(PhoneNumberInterceptor)
  async paymentCallback(
    @Body() paymentCallbackDto: PaymentCallbackResponseDto,
    @Param('clientReference') clientReference: string
  ) {

    return this.paymentService.PaymentCallback(
      paymentCallbackDto,
      clientReference
    );
  }
}
