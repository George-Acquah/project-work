import { IsDate, IsNumber, Min } from 'class-validator';

export class ReservationRequestDto {
  @IsDate()
  start_time: Date;

  @IsDate()
  start_date: Date;

  @IsNumber()
  @Min(5)
  reservation_duration: number;

  constructor(dto: ReservationRequestDto) {
    Object.assign(this, dto);
  }
}

export class SlotReservationDto {
  @IsDate()
  start_time: Date;

  @IsDate()
  start_date: Date;

  @IsNumber()
  @Min(5)
  reservation_duration: number;

  constructor(dto: SlotReservationDto) {
    Object.assign(this, dto);
  }
}
