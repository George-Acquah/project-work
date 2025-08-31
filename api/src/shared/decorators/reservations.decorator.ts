import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { _ISafeReservation } from '../interfaces/jwt_payload.interface';

export const Reservation = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): _ISafeReservation => {
    const request: Request = ctx.switchToHttp().getRequest();
    return request.reservation as _ISafeReservation;
  }
);
