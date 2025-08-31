import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { PAYMENT_KEY } from 'src/shared/configs/constants.config';
import { _IPaymentConfig } from 'src/shared/configs/types.config';
import {
  AuthCredentialDto,
  CheckoutRequestDto,
  CheckoutResponseDto,
  ComputerSlotAmountRequestDto,
  ComputerSlotAmountResponseDto,
  CreatTransactionDto,
  InternalApiResponse,
  IRequestPaymentDto,
  PaymentCallbackResponseDto,
  PaymentResponseDto,
  RequestOptionDto
} from './dto/request-money.dto';
import { AxiosResponse } from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction } from 'src/shared/schemas/transaction.schema';
import { Model } from 'mongoose';
import { _IDbPayment } from 'src/shared/interfaces/payments.interface';
import { PAYMENT_STATUS } from 'src/shared/enums/general.enum';
import { SlotService } from 'src/parking/slots.service';

@Injectable()
export class PaymentService {
  private readonly _authCredendtial: AuthCredentialDto;
  private readonly _requestPaymentUrl: string;
  private readonly _merchantAccountNumber: string;
  private readonly _callbackUrl: string;
  private readonly _returnUrl: string;
  private readonly _cancellationUrl: string;
  private Options: RequestOptionDto = {
    url: '',
    method: '',
    headers: {
      'Content-Type': 'application/json'
    },
    auth: {
      password: '',
      username: ''
    },
    data: {}
  };

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    @InjectModel(Transaction.name) private transactionModel: Model<_IDbPayment>,
    private readonly slotService: SlotService
  ) {
    const {
      hubtelBaseUrl,
      clientId,
      clientSecret,
      merchantAccountNumber,
      callbackUrl,
      returnUrl,
      cancellationUrl
    } = this.configService.get<_IPaymentConfig>(PAYMENT_KEY);

    this._requestPaymentUrl = `${hubtelBaseUrl}/items/initiate`;
    this._authCredendtial = {
      password: clientSecret,
      username: clientId
    };
    this._merchantAccountNumber = merchantAccountNumber;
    this._callbackUrl = callbackUrl;
    this._returnUrl = returnUrl;
    this._cancellationUrl = cancellationUrl;
  }

  protected async InitiateHubtelPayment(
    params: IRequestPaymentDto
  ): Promise<InternalApiResponse<PaymentResponseDto>> {
    try {
      const Payload = {
        clientReference: params?.clientReference,
        totalAmount: params?.amount,
        description: params?.description,
        callbackUrl: `${this._callbackUrl}/${params?.clientReference}`,
        cancellationUrl: this._cancellationUrl,
        returnUrl: this._returnUrl,
        merchantAccountNumber: this._merchantAccountNumber,
        customerMobileNumber: params?.customerMobileNumber
      };

      this.Options.url = `${this._requestPaymentUrl}`;
      this.Options.method = 'POST';
      this.Options.auth = this._authCredendtial;
      this.Options.data = Payload;

      const response: AxiosResponse<any> = await firstValueFrom(
        this.httpService.request(this.Options)
      );
      return new InternalApiResponse<PaymentResponseDto>(
        true,
        response?.data?.data,
        response?.data?.message
      );
    } catch (error) {
      console.log(error, 'Failed to initiate payment');
      return new InternalApiResponse<PaymentResponseDto>(
        false,
        undefined,
        'Failed to initiate payment'
      );
    }
  }

  public async Checkout(
    payload: CheckoutRequestDto & { cost: number }
  ): Promise<InternalApiResponse<CheckoutResponseDto>> {
    try {
      //Todo: validate slot information

      const slotData: ComputerSlotAmountRequestDto = {
        centerId: payload.centerId,
        slotId: payload.slotId
      };
      const slotAmountResponse = await this.ComputeSlotAmountToPay({
        ...slotData,
        amount: payload.cost
      });

      if (!slotAmountResponse.ok) {
        return new InternalApiResponse<CheckoutResponseDto>(
          false,
          null,
          'Failed to compute slot amount'
        );
      }

      const slotAmount = slotAmountResponse.data?.amount;
      const clientReference = uuidv4(); // Generate a UUID

      const paymentDescription = `Payment for slot ${payload.slotId} at center ${payload.centerId}`;
      const initiatePaymentPayload: IRequestPaymentDto = {
        amount: slotAmount,
        clientReference: clientReference,
        description: paymentDescription,
        customerMobileNumber: payload.customerMobileNumber
      };

      const initiatePaymentResponse = await this.InitiateHubtelPayment(
        initiatePaymentPayload
      );
      if (!initiatePaymentResponse.ok) {
        return new InternalApiResponse<CheckoutResponseDto>(
          false,
          null,
          'Failed to initiate payment'
        );
      }

      const transactionPayload: CreatTransactionDto = {
        amount: slotAmount,
        clientReference: clientReference,
        description: paymentDescription,
        customerMobileNumber: payload.customerMobileNumber,
        reservationId: payload.reservationId,
        status: PAYMENT_STATUS.PENDING
        // metaData: initiatePaymentResponse.data
      };
      console.log(transactionPayload);

      await this.transactionModel.create(transactionPayload);

      console.log('initiatePaymentResponse', initiatePaymentResponse.data);
      //Return the paylink to the user to initiate payment;
      const checkoutRes: CheckoutResponseDto = {
        checkoutDirectUrl: initiatePaymentResponse.data?.checkoutDirectUrl,
        checkoutUrl: initiatePaymentResponse.data?.checkoutUrl
      };
      return new InternalApiResponse<CheckoutResponseDto>(
        true,
        checkoutRes,
        'Payment initiated successfully'
      );
    } catch (error) {
      return new InternalApiResponse<any>(
        false,
        null,
        'Failed to process payment'
      );
    }
  }

  private async ComputeSlotAmountToPay(
    payload: ComputerSlotAmountRequestDto & { amount: number }
  ): Promise<InternalApiResponse<ComputerSlotAmountResponseDto>> {
    try {
      //Todo: fetch slot information from db

      //Todo: compute slot amount to pay

      const slotAmount = payload.amount;
      const slotAmountResponse: ComputerSlotAmountResponseDto = {
        slotId: payload.slotId,
        centerId: payload.centerId,
        amount: slotAmount
      };

      return new InternalApiResponse<ComputerSlotAmountResponseDto>(
        true,
        slotAmountResponse,
        'Slot amount computed successfully'
      );
    } catch (error) {
      return new InternalApiResponse<any>(
        false,
        null,
        'Failed to compute slot amount'
      );
    }
  }

  public async HandlePaymentCallback(
    params: PaymentCallbackResponseDto,
    clientReference: string
  ): Promise<InternalApiResponse<any>> {
    try {
      console.log('callback response', JSON.stringify(params), clientReference);
      //Todo: Fetch transaction by the client reference and end the process if it does not exist
      const transaction = await this.transactionModel.findOne({
        clientReference
      });

      //Todo: Check if the transaction has been processed before. End the process if the status is not pending
      if (transaction.status !== PAYMENT_STATUS.PENDING) {
        return new InternalApiResponse<any>(true);
      }

      if (params.ResponseCode !== '0000') {
        transaction.status = PAYMENT_STATUS.FAILED;
        await transaction.save();

        await this.slotService.deleteSlotReservation(transaction.reservationId);

        return new InternalApiResponse<any>(
          true,
          null,
          'Payment Failed. Your reservation has been cancelled'
        );
      }

      //Todo: Update transaction status to success
      transaction.status = PAYMENT_STATUS.SUCCESS;
      await this.slotService.setReservationToTrue(transaction.reservationId);

      return new InternalApiResponse<any>(
        true,
        { amount: params.Data.Amount },
        'You slot reservation is complete'
      );
    } catch (error) {
      return new InternalApiResponse<any>(true);
    }
  }
}
