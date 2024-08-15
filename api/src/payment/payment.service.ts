import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, firstValueFrom } from 'rxjs';
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
      'Content-Type': 'application/json'
    },
    auth: {
      password: '',
      username: ''
    },
    data: {}
    data: {}
  };

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService
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
      username: clientId
    };
    this._merchantAccountNumber = merchantAccountNumber;
    this._callbackUrl = callbackUrl;
    this._returnUrl = returnUrl;
    this._cancellationUrl = cancellationUrl;
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
        cancellationUrl: this._cancellationUrl,
        returnUrl: this._returnUrl,
        merchantAccountNumber: this._merchantAccountNumber,
        customerMobileNumber: params?.customerMobileNumber
        customerMobileNumber: params?.customerMobileNumber
      };


      this.Options.url = `${this._requestPaymentUrl}`;
      this.Options.method = 'POST';
      this.Options.auth = this._authCredendtial;
      this.Options.data = Payload;

      const response: AxiosResponse<any> = await firstValueFrom(
        this.httpService.request(this.Options)
      const response: AxiosResponse<any> = await firstValueFrom(
        this.httpService.request(this.Options)
      );
      return new InternalApiResponse<PaymentResponseDto>(
        true,
        response?.data?.data,
        response?.data?.message
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
    payload: CheckoutRequestDto
  ): Promise<InternalApiResponse<CheckoutResponseDto>> {
    try {
      //Todo: validate slot information

      //Todo: compute slot amount to pay
      const slotData: ComputerSlotAmountRequestDto = {
        centerId: payload.centerId,
        slotId: payload.slotId
      };
      const slotAmountResponse = await this.ComputeSlotAmountToPay(slotData);

      if (!slotAmountResponse.ok) {
        return new InternalApiResponse<CheckoutResponseDto>(
          false,
          null,
          'Failed to compute slot amount'
        );
      }

      const slotAmount = slotAmountResponse.data?.amount;
      const clientReference = uuidv4(); // Generate a UUID

      //Todo: initiate payment
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

      //Todo: Create a transaction payload
      const transactionPayload: CreatTransactionDto = {
        amount: slotAmount,
        clientReference: clientReference,
        description: paymentDescription,
        customerMobileNumber: payload.customerMobileNumber,
        centerId: payload.centerId,
        slotId: payload.slotId,
        customerId: payload.customerId,
        status: 'PENDING',
        metaData: initiatePaymentResponse.data
      };

      //Todo: Save the transaction to db;

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
    payload: ComputerSlotAmountRequestDto
  ): Promise<InternalApiResponse<ComputerSlotAmountResponseDto>> {
    try {
      //Todo: fetch slot information from db

      //Todo: compute slot amount to pay

      const slotAmount = 1;
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
      console.log('callback response', JSON.stringify(params));
      //Todo: Fetch transaction by the client reference and end the process if it does not exist

      //Todo: Check if the transaction has been processed before. End the process if the status is not pending

      //Todo:
      if (params.ResponseCode !== '0000') {
        //Todo: Update transaction status to Failed

        return new InternalApiResponse<any>(true);
      }

      //Todo: Update transaction status to success

      //Todo: Assign the space to the user because payment is successful.

      return new InternalApiResponse<any>(true);
    } catch (error) {
      return new InternalApiResponse<any>(true);
    }
  }
}
