import { IsNotEmpty, IsString } from 'class-validator';

export class AddCenterDto {
  @IsString()
  @IsNotEmpty()
  center_name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  constructor(dto: AddCenterDto) {
    Object.assign(this, dto);
  }
}

export class AddSlotDto {
  @IsString()
  @IsNotEmpty()
  slot_name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  constructor(dto: AddSlotDto) {
    Object.assign(this, dto);
  }
}
