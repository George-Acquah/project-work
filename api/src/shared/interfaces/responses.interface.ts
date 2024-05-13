import { _ITokens } from './jwt_payload.interface';
import { _ISanitizedCustomer } from './users.interface';

export interface _ILoginResponse<T = _ISanitizedCustomer> {
  user: T;
  tokens: _ITokens;
}

export interface _ILookup {
  from: string;
  foreignField: string;
  as: string;
}
