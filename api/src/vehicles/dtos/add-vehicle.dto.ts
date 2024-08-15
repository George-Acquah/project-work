import { IsNotEmpty, IsString, IsEnum, IsNumber } from 'class-validator';
import { VehicleTypes } from 'src/shared/enums/vehicles.enum';

export class AddVehicleDto {
  @IsString()
  @IsNotEmpty()
  vehicle_no: string;

  // constructor(dto: AddVehicleDto) {
  //   Object.assign(this, dto);
  // }
}
export class CreateVehicleDto {
  @IsNotEmpty()
  @IsString()
  vehicle_no: string;

  @IsNotEmpty()
  @IsEnum(VehicleTypes)
  vehicleType: VehicleTypes;

  @IsNotEmpty()
  @IsString()
  make: string;

  @IsNotEmpty()
  @IsString()
  vehicleModel: string;

  @IsNotEmpty()
  @IsNumber()
  yearOfManufacture: number;

  @IsNotEmpty()
  @IsString()
  color: string;

  @IsNotEmpty()
  @IsString()
  driver: string; // Customer ID
}
