import { Document } from 'mongoose';
import { _IRegisterResponse } from '../interfaces/refactored/user.interface';
import { _TUser } from '../interfaces/users.interface';

export function sanitizeUserFn(user: Document): _IRegisterResponse {
  if (!user) {
    return null;
  }

  // Remove or modify sensitive or unnecessary fields
  delete user.__v; // Remove Mongoose version key if present
  user._id.toString();

  return user as unknown as _IRegisterResponse;
}

export function sanitizeLoginUserFn(user: _TUser): _IRegisterResponse {
  if (!user) {
    return null;
  }

  // Return only the necessary fields
  return {
    _id: user._id.toString(),
    email: user.email,
    userType: user.userType
  };
}
