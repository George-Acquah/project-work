import { Document, Types } from 'mongoose';
import { _IParkingCenter } from './slot.interface';
import { UserType } from '../enums/users.enum';
import { _IDbUserImage, _IUserImage } from './images.interface';
import { _IDbVehicle, _IVehicle } from './vehicles.interface';

interface _IDbProfile extends Document {
  first_name: string | null;
  last_name: string | null;
  contact_no: string | null;
  area: string | null;
  city: string | null;
  state: string | null;
  pinCode: string | null;
  user: string;
}
interface _ICustomer extends Document<Types.ObjectId> {
  email: string;
  userType: UserType;
  phone_number: string;
  readonly password: string;
  isVerified: boolean;
  profile: _IDbProfile;
  image: _IDbUserImage;
  vehicles: _IDbVehicle[];
  rankings: _ICustomerRankings;
}
interface _IParkOwner extends Document<Types.ObjectId> {
  email: string;
  userType: UserType;
  image: _IDbUserImage;
  phone_number: string;
  isVerified: boolean;
  readonly password: string;
  profile: _IDbProfile;
  centers: _IParkingCenter[]; // to be changed to parking center interface
  rankings: _IOwnerRankings;
}

interface _ISanitizedProfile {
  _id: string;
  first_name: string | null;
  last_name: string | null;
  contact_no: string | null;
  area: string | null;
  city: string | null;
  state: string | null;
  pinCode: string | null;
  user: string;
}
interface _ISanitizedCustomer {
  _id: string;
  email: string;
  phone_number: string;
  userType: UserType;
  isVerified: boolean;
  image?: _IUserImage;
  profile: _ISanitizedProfile;
  vehicles: _IVehicle[];
  rankings: _ICustomerRankings;
}

interface _ISanitizedParkOwner {
  _id: string;
  email: string;
  userType: UserType;
  image?: _IUserImage;
  isVerified: boolean;
  profile: _ISanitizedProfile;
  centers: _IParkingCenter[]; // to be changed to parking center interface
  rankings: _IOwnerRankings;
}

interface _ICustomerLocation {
  location_at_pickup: string;
  current_loc: string;
}

export interface _ICustomerRankings {
  id: string;
}

export interface _IOwnerRankings {
  id: string;
}

interface CustomerHelpUser {
  rankings: _ICustomerRankings;
  vehicles: _IDbVehicle[];
}

interface OwnerHelpUser {
  centers?: _IParkingCenter[]; // to be changed to parking center interface
  rankings: _IOwnerRankings;
}
interface _ICommonUser extends Document<Types.ObjectId> {
  email: string;
  userType: UserType;
  readonly password: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  profile: _IDbProfile;
  user_image: _IDbUserImage;
  phone_number: string;
}

interface _ISanitizedCommonUser {
  _id: string;
  userType: UserType;
  isVerified: boolean;
  email: string;
  profile: _ISanitizedProfile;
  user_image?: _IUserImage;
}

interface _IUpdatedUserRes {
  _id: string;
  email: string;
  userType: string;
  first_name: string | null;
  last_name: string | null;
  user_image: string | null;
}

// Create a generic interface for all users by combining the specific interfaces
type _TUser = (OwnerHelpUser | CustomerHelpUser) & _ICommonUser;
type _TSanitizedUser = (OwnerHelpUser | CustomerHelpUser) &
  _ISanitizedCommonUser;

export {
  _ICustomer,
  _IParkOwner,
  _ISanitizedCustomer,
  _ISanitizedParkOwner,
  _ICustomerLocation,
  _TUser,
  _TSanitizedUser,
  _IDbProfile,
  _ISanitizedProfile,
  _IUpdatedUserRes
};
