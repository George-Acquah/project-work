import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateUserDetailsDto {
  @IsOptional()
  @IsString()
  @Length(1, 50, {
    message: 'First name must be between 1 and 50 characters'
  })
  readonly firstName?: string;

  @IsOptional()
  @IsString()
  @Length(1, 50, {
    message: 'Last name must be between 1 and 50 characters'
  })
  readonly lastName?: string;

  @IsOptional()
  @IsString()
  @Length(9, 11, {
    message: 'Contact number must be 10 digits'
  })
  readonly contactNo?: string;

  @IsOptional()
  @IsString()
  @Length(1, 50, {
    message: 'Area must be between 1 and 50 characters'
  })
  readonly area?: string;

  @IsOptional()
  @IsString()
  @Length(1, 50, {
    message: 'State must be between 1 and 50 characters'
  })
  readonly state?: string;

  @IsOptional()
  @IsString()
  @Length(1, 7, {
    message: 'PIN code must be between 6 digits'
  })
  readonly pinCode?: string;
}
