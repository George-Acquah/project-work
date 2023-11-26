import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { _IReservationPayload } from '../interfaces/jwt_payload.interface';
import { _TRequestWithAuth } from '../interfaces/custom-request.interface';
import { extractToken } from '../utils/global.utils';

@Injectable()
export class ReservationsAuthGuard implements CanActivate {
  private readonly logger = new Logger(ReservationsAuthGuard.name);
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: _TRequestWithAuth = context.switchToHttp().getRequest();
    const reservationAccessToken = extractToken(
      'Reservation',
      request.headers.authorization,
    );

    this.logger.log(reservationAccessToken);
    try {
      const payload = this.jwtService.verify<_IReservationPayload>(
        reservationAccessToken,
      );
      request.slot_id = payload.slot_id;
      request.vehicle_id = payload.vehicle_id;
      request.reservation_id = payload.sub.reservation_id;

      return true;
    } catch {
      throw new ForbiddenException('Invalid Access Token');
    }
  }
}
