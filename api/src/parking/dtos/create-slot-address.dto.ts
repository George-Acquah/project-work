import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateSlotAddressDto {
  @IsString()
  @IsNotEmpty()
  city: string;

  @IsNumber()
  @IsNotEmpty()
  latitude: number;

  @IsNumber()
  @IsNotEmpty()
  longitude: number;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsString()
  @IsNotEmpty()
  center_name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  constructor(dto: CreateSlotAddressDto) {
    Object.assign(this, dto);
  }
}
