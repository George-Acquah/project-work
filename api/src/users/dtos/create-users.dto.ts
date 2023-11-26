import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
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

  // @ValidateNested()
  // @Type(() => Profile)
  // profile: Profile;

  // @ValidateNested()
  // @Type(() => ParkingCenter)
  // centers: ParkingCenter[];

  // @ValidateNested()
  // @Type(() => OwnerRankings)
  // rankings: OwnerRankings;

  constructor(dto: CreateCustomerDto) {
    Object.assign(this, dto);
  }
}

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  constructor(dto: CreateUserDto) {
    Object.assign(this, dto);
  }
}
