import { Document } from 'mongoose';
import {
  _IExtraProfile,
  _IExtraUsers,
  _INewProfile,
  _IRegisterResponse,
  _IUsersTable
} from '../interfaces/refactored/user.interface';
import { _TUser } from '../interfaces/users.interface';
import { formatUserType, convertDateToString } from '../utils/global.utils';

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

export function sanitizeAdminUserFn(user: _TUser & _IExtraUsers): _IUsersTable {
  if (!user) {
    return null;
  }

  // Return only the necessary fields
  return {
    _id: user._id.toString(),
    image: user?.user_image?.file_id ?? null,
    email: user.email,
    fullname: `${user?.profile?.first_name ?? 'Update'} ${
      user?.profile?.last_name ?? 'Profile'
    }`,
    contact: user?.phone_number ?? 'Update Profile',
    location: user?.profile?.state ?? 'Update Profile',
    vehicles: user?.vehicles_count ?? 0,
    centers: user?.centers_count ?? 0,
    userType: formatUserType(user.userType),
    createdAt: convertDateToString(
      user?.createdAt?.toDateString() ?? new Date().toDateString()
    ),
    updatedAt: convertDateToString(
      user?.updatedAt?.toDateString() ?? new Date().toDateString()
    ),
    isVerified: user.isVerified ? 'verified' : 'not verified'
  };
}

export function sanitizeUserProfileFn(
  user: _TUser & _IExtraUsers
): _INewProfile & _IExtraProfile {
  if (!user) {
    return null;
  }

  // Return only the necessary fields
  return {
    _id: user._id.toString(),
    user_image: user?.user_image?.file_id ?? null,
    email: user.email,
    first_name: user?.profile?.first_name,
    last_name: user?.profile?.last_name,
    phone_number: user?.phone_number,
    state: user?.profile?.state,
    area: user?.profile?.area,
    pinCode: user?.profile?.pinCode,
    city: user?.profile?.city,
    contact_no: user?.profile?.contact_no
  };
}
