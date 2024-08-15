import { Controller, Post, Query, Body, UseInterceptors, Param } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CheckoutRequestDto, PaymentCallbackResponseDto, RequestMoneyDto } from './dto/request-money.dto';
import { PhoneNumberInterceptor } from 'src/shared/interceptors/phone-number.interceptor';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentService: PaymentService) {}


  @Post('initiate-payment')
  @UseInterceptors(PhoneNumberInterceptor)
  async initiatePayment(
    @Body() checkoutRequest: CheckoutRequestDto,
  ) {

    return this.paymentService.Checkout(
     {
      customerMobileNumber: checkoutRequest.customerMobileNumber,
      centerId: checkoutRequest.centerId,
      customerId: checkoutRequest.customerId,
      slotId: checkoutRequest.slotId,
     }
    );
  }

  @Post('callback/:clientReference')
  @UseInterceptors(PhoneNumberInterceptor)
  async paymentCallback(
    @Body() paymentCallbackDto: PaymentCallbackResponseDto,
    @Param('clientReference') clientReference: string
  ) {

    return this.paymentService.HandlePaymentCallback(
      paymentCallbackDto,
      clientReference
    );
  }
}
