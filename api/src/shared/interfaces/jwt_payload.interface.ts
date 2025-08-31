import { UserType } from '../enums/users.enum';
import { JwtPayload } from 'jsonwebtoken';

interface _IPayload {
  user_id: string;
  userType: UserType;
  sub: {
    email: string;
  };
}

type _TJwtPayload = JwtPayload & _IPayload;

interface _IReservationPayload {
  customerMobileNumber: string;
  sub: {
    reservation_id: string;
  };
}

export interface _ISafeReservation {
  customerMobileNumber: string;
  reservation_id: string;
}
interface _IReservationsPayloadRequest {
  reservation: _ISafeReservation;
}

interface _ITokens {
  access_token: string;
  u_id: string;
  refresh_token: string;
  expiresIn: number;
}

export {
  _IPayload,
  _IReservationPayload,
  _ITokens,
  _IReservationsPayloadRequest,
  _TJwtPayload
};
