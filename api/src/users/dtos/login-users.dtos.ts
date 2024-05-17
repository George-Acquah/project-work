import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
  // @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  constructor(dto: LoginUserDto) {
    Object.assign(this, dto);
  }
}
