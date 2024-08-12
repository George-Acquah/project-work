import { IsUrl, IsOptional, IsNotEmpty } from 'class-validator';

export class PaymentQueryDto {
  @IsNotEmpty()
  @IsUrl()
  callbackUrl: string;

  @IsOptional()
  @IsUrl()
  returnUrl?: string;

  @IsOptional()
  @IsUrl()
  cancellationUrl?: string;
}
