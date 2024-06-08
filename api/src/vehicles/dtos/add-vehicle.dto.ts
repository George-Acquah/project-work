import { IsNotEmpty, IsString } from 'class-validator';

export class AddVehicleDto {
  @IsString()
  @IsNotEmpty()
  vehicle_no: string;

  // constructor(dto: AddVehicleDto) {
  //   Object.assign(this, dto);
  // }
}
