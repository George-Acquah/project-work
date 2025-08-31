import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  Param,
  UseGuards
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import {
  CheckoutResponseDto,
  InternalApiResponse,
  PaymentCallbackResponseDto
} from './dto/request-money.dto';
import { PhoneNumberInterceptor } from 'src/shared/interceptors/phone-number.interceptor';
import { ReservationsAuthGuard } from 'src/shared/guards/reservations.guard';
import { Reservation } from 'src/shared/decorators/reservations.decorator';
import { _ISafeReservation } from 'src/shared/interfaces/jwt_payload.interface';
import { SlotService } from 'src/parking/slots.service';

@Controller('payments')
export class PaymentsController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly slotService: SlotService
  ) {}

  @UseGuards(ReservationsAuthGuard)
  @Post('initiate-payment')
  @UseInterceptors(PhoneNumberInterceptor)
  async initiatePayment(@Reservation() reservationAuth: _ISafeReservation) {
    try {
      const { reservation_id, customerMobileNumber } = reservationAuth;
      const { centerId, slotId, customerId, cost, vehicle_no } =
        await this.slotService.getReservationForPayment(reservation_id);
      if (!centerId || !slotId || !customerId || !cost) {
        return {
          error: 'Something unexpected occured'
        };
      }

      const checkoutResponse = await this.paymentService.Checkout({
        customerMobileNumber,
        centerId,
        customerId,
        reservationId: reservation_id,
        slotId,
        cost
      });

      if (!checkoutResponse.ok) {
        return new InternalApiResponse<CheckoutResponseDto>(
          false,
          null,
          'Failed to compute slot amount'
        );
      }

      return {
        ...checkoutResponse,
        cost,
        vehicle_no
      };
    } catch (error) {
      throw error;
    }
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
