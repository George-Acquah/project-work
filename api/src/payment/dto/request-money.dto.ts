import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  IsUrl
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
