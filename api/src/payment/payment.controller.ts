import { Controller, Post, Query, Body, UseInterceptors } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { RequestMoneyDto } from './dto/request-money.dto';
import { PaymentQueryDto } from './dto/payment-query.dto';
import { PhoneNumberInterceptor } from 'src/shared/interceptors/phone-number.interceptor';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('request-money')
  @UseInterceptors(PhoneNumberInterceptor)
  async requestMoney(
    @Body() requestMoneyDto: RequestMoneyDto,
    @Query() query: PaymentQueryDto
  ) {
    console.log(requestMoneyDto, query);
    return this.paymentService.requestMoney(
      requestMoneyDto.mobileNumber,
      requestMoneyDto.amount,
      requestMoneyDto.title,
      requestMoneyDto.description,
      requestMoneyDto.clientReference,
      query.callbackUrl,
      query.returnUrl,
      query.cancellationUrl,
      requestMoneyDto.logo
    );
  }
}
