import { Request } from 'express';
import { _IReservationsPayloadRequest } from './jwt_payload.interface';
import { Socket } from 'socket.io';

export interface _ICustomRequest extends Request {
  fileValidationError?: string;
}

export type _TRequestWithReservationAuth = Request &
  _IReservationsPayloadRequest;
export type _TSocketWithAuth = Socket & _IReservationsPayloadRequest;

export type _TWSException = 'Unauthorized' | 'BadRequest' | 'Unknown';
