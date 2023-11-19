import { Request } from 'express';
import { _IReservationsPayloadRequest } from './jwt_payload.interface';

export interface _ICustomRequest extends Request {
  fileValidationError?: string;
}

export type _TRequestWithAuth = Request & _IReservationsPayloadRequest;
