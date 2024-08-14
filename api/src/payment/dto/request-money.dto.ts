import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  IsUrl,
  IsInt,
  IsObject,
  IsDecimal
} from 'class-validator';
import { IsE164PhoneNumber } from 'src/shared/validators/phone-number.validator';

export class RequestMoneyDto {
  @IsNotEmpty()
  @IsE164PhoneNumber()
  mobileNumber: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  clientReference: string;

  @IsOptional()
  @IsUrl()
  logo?: string;

  constructor(dto: RequestMoneyDto) {
    Object.assign(this, dto);
  }
}
export class IRequestPaymentDto {
  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  clientReference?: string;

   @IsNotEmpty()
  customerMobileNumber?: string;
}

export class InternalApiResponse<T> {
  public readonly ok: boolean;
  public readonly data?: T;
  public readonly message?: any;
  public readonly other?: any;

  constructor(ok: boolean, data?: T, message?: any, other?: any) {
    this.ok = ok;
    this.data = data;
    this.message = message;
    this.other = other;
  }
}

export class PaymentResponseDataDto {
  @IsNotEmpty()
  @IsString()
  paylinkId: string;

  @IsNotEmpty()
  @IsString()
  clientReference: string;

  @IsNotEmpty()
  @IsUrl()
  paylinkUrl: string;

  @IsNotEmpty()
  @IsInt()
  expiresAt: number;
}

export class PaymentResponseDto {
  @IsNotEmpty()
  @IsString()
  message: string;

  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  data: PaymentResponseDataDto;
}

export class AuthCredentialDto {
  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  username: string;
}

export class RequestOptionDto {
  @IsNotEmpty()
  @IsUrl()
  url: string;

  @IsNotEmpty()
  @IsString()
  method: string;

  @IsNotEmpty()
  @IsObject()
  headers: object;

  @IsNotEmpty()
  @IsObject()
  auth: AuthCredentialDto;

  @IsNotEmpty()
  data: any;
}

export class PaymentCallbackDetailsDto {
  MobileMoneyNumber: string;
  PaymentType: string;
  Channel: string | null;
}

export class PaymentCallbackDataDto {
  CheckoutId: string;
  SalesInvoiceId: string;
  ClientReference: string;
  Status: string;
  Amount: number;
  CustomerPhoneNumber: string;
  PaymentDetails: PaymentCallbackDetailsDto;
  Description: string;
}

export class PaymentCallbackResponseDto {
  ResponseCode: string;
  Status: string;
  Data: PaymentCallbackDataDto;
}


export class CheckoutRequestDto {
  @IsNotEmpty()
  @IsString()
  slotId: string;

  @IsNotEmpty()
  @IsString()
  centerId: string;

  @IsNotEmpty()
  @IsE164PhoneNumber()
  customerMobileNumber: string;

  @IsNotEmpty()
  @IsString()
  customerId: string;
}

export class ComputerSlotAmountRequestDto {
  @IsNotEmpty()
  @IsString()
  slotId: string;

  @IsNotEmpty()
  @IsString()
  centerId: string;
}

export class ComputerSlotAmountResponseDto {
  @IsNotEmpty()
  @IsString()
  slotId: string;

  @IsNotEmpty()
  @IsString()
  centerId: string;

  @IsDecimal()
  amount: number;

}

export class CreatTransactionDto {
  @IsNotEmpty()
  @IsString()
  clientReference: string;

  @IsNotEmpty()
  @IsString()
  customerMobileNumber: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  slotId: string;

  @IsNotEmpty()
  @IsString()
  centerId: string;

  @IsNotEmpty()
  @IsString()
  customerId: string;

  @IsNotEmpty()
  @IsString()
  status: string;

  metaData?:any;
}