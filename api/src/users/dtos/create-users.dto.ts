import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IsPhoneNumber } from 'src/shared/validators/phone-number.validator';
// import { Type } from 'class-transformer';
// import { Profile } from 'src/shared/schemas/profile.schema';
// import {
//   CustomerRankings,
//   OwnerRankings,
// } from 'src/shared/schemas/rankings.schema';
// import { Vehicle } from 'src/shared/schemas/vehicle.schema';
// import { ParkingCenter } from 'src/shared/schemas/parking-centers.schema';

export class CreateCustomerDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  // @ValidateNested()
  // @Type(() => Profile)
  // profile: Profile;

  // @ValidateNested()
  // @Type(() => Vehicle)
  // vehicles: Vehicle[];

  // @ValidateNested()
  // @Type(() => CustomerRankings)
  // rankings: CustomerRankings;

  constructor(dto: CreateCustomerDto) {
    Object.assign(this, dto);
  }
}

export class CreateParkOwnerDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  constructor(dto: CreateCustomerDto) {
    Object.assign(this, dto);
  }
}

export class CreateUserDto {
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Password must be a string' })
  password: string;

  @IsNotEmpty({ message: 'Please input your phone number before proceeding' })
  @IsString({ message: 'Phone number must be a string' })
  @IsPhoneNumber({
    message: 'Phone number must start with 0 and be exactly 10 digits long'
  })
  phone_number: string;

  constructor(dto: CreateUserDto) {
    Object.assign(this, dto);
  }
}
