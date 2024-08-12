import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom,firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { PAYMENT_KEY } from 'src/shared/configs/constants.config';
import { _IPaymentConfig } from 'src/shared/configs/types.config';
import { AuthCredentialDto, InternalApiResponse, IRequestPaymentDto, PaymentCallbackResponseDto, PaymentResponseDto, RequestOptionDto } from './dto/request-money.dto';
import { AxiosResponse } from 'axios';

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
      'Content-Type': 'application/json',
    },
    auth: {
      password: '',
      username: ''
    },
    data: {},
  };

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService
  ) {
    const { hubtelBaseUrl, clientId, clientSecret,merchantAccountNumber,callbackUrl, returnUrl, cancellationUrl } =
      this.configService.get<_IPaymentConfig>(PAYMENT_KEY);

    this._requestPaymentUrl = `${hubtelBaseUrl}/items/initiate`;
    this._authCredendtial = {
      password: clientSecret,
      username: clientId,
    }
    this._merchantAccountNumber = merchantAccountNumber;
    this._callbackUrl = callbackUrl
    this._returnUrl = returnUrl
    this._cancellationUrl = cancellationUrl
  }

  public async InitiateHubtelPayment(params: IRequestPaymentDto): Promise<InternalApiResponse<PaymentResponseDto>> {
    try {
      const Payload = {
        clientReference: params?.clientReference,
        totalAmount: params?.amount,
        description: params?.description,
        callbackUrl: `${this._callbackUrl}/${params?.clientReference}`,
        cancellationUrl:this._cancellationUrl,
        returnUrl: this._returnUrl,
        merchantAccountNumber: this._merchantAccountNumber,
        customerMobileNumber: params?.customerMobileNumber,
      };

     
      this.Options.url = `${this._requestPaymentUrl}`;
      this.Options.method = 'POST';
      this.Options.auth = this._authCredendtial;
      this.Options.data = Payload;


       const response: AxiosResponse<any> = await firstValueFrom(
        this.httpService.request( this.Options)
      );
      return new InternalApiResponse<PaymentResponseDto>(true, response?.data?.data, response?.data?.message);
    } catch (error) {
      return new InternalApiResponse<PaymentResponseDto>(false, undefined, JSON.stringify(error));
    }
  }


  public async PaymentCallback(params: PaymentCallbackResponseDto, clientReference:string): Promise<InternalApiResponse<any>> {

    try{
      //todo: process payment callback

      console.log("callback response",JSON.stringify(params))

      return new InternalApiResponse<any>(true, null, "Payment processed successfully");
    }
    catch (error) {
      return new InternalApiResponse<any>(false, null, "Failed to process callback");
    }

  }
}
