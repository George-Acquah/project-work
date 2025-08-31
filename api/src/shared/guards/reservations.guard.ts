import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  Logger
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { _IReservationPayload } from '../interfaces/jwt_payload.interface';
import { extractToken } from '../utils/global.utils';
import { Request } from 'express';

@Injectable()
export class ReservationsAuthGuard implements CanActivate {
  private readonly logger = new Logger(ReservationsAuthGuard.name);
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const reservationAccessToken = extractToken(
      'Reservation',
      request.headers.authorization
    );
    try {
      const payload = this.jwtService.verify<_IReservationPayload>(
        reservationAccessToken,
        {
          secret: process.env.RESERVATION_KEY
        }
      );
      // Initialize request.reservation if it doesn't exist
      if (!request.reservation) {
        request.reservation = {} as any;
      }
      request.reservation.customerMobileNumber = payload.customerMobileNumber;
      request.reservation.reservation_id = payload.sub.reservation_id;
      return true;
    } catch (error: any) {
      throw new ForbiddenException('Invalid Access Token');
    }
  }
}
