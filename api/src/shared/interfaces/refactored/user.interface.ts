import { UserType } from 'src/shared/enums/users.enum';
import { _IDbUserImage } from '../images.interface';
import { _IDbVehicle } from '../vehicles.interface';
import { _IParkingCenter } from '../slot.interface';

export interface _INewCommonUser {
  _id: string;
  email: string;
  userType: UserType;
  createdAt: string;
  updatedAt: string;
  isVerified: boolean;
  phone_number: string;
}

export interface _IRegisterResponse {
  _id: string;
  email: string;
  userType: UserType;
}

interface _IPartCustomer {
  vehicles: _IDbVehicle[];
  rankings: _ICustomerRankings;
  profile: _INewProfile;
  user_image: _IDbUserImage;
}

interface _IPartOwner {
  centers: _IParkingCenter[]; // to be changed to parking center interface
  rankings: _IOwnerRankings;
  profile: _INewProfile;
  user_image: _IDbUserImage;
}

// Create a generic interface for all users by combining the specific interfaces
type _TNewUser = (_IPartCustomer | _IPartOwner) & _INewCommonUser;
type _INewCustomer = _IPartCustomer & _INewCommonUser;
type _INewParkOwner = _IPartOwner & _INewCommonUser;

interface _INewProfile {
  _id: string;
  first_name: string | null;
  last_name: string | null;
  contact_no: string | null;
  area: string | null;
  city: string | null;
  state: string | null;
  pinCode: string | null;
}

export interface _IExtraProfile {
  user_image: string;
  phone_number: string;
  email: string;
  _id: string;
  first_name: string | null;
  last_name: string | null;
}

interface _ICustomerLocation {
  location_at_pickup: string;
  current_loc: string;
}

interface _ICustomerRankings {
  _id: string;
}

interface _IOwnerRankings {
  _id: string;
}

interface _IUpdatedUserRes {
  _id: string;
  email: string;
  userType: string;
  first_name: string | null;
  last_name: string | null;
  user_image: string | null;
}

interface _IExtraUsers {
  vehicles_count: number;
  centers_count: number;
}

interface _IUsersTable {
  _id: string;
  email: string;
  userType: UserType | 'Park Owner';
  fullname: string;
  contact: string;
  location: string;
  vehicles: number;
  centers: number;
  createdAt: string;
  updatedAt: string;
  isVerified: string;
  image: string | null;
}

export {
  _ICustomerLocation,
  _IUpdatedUserRes,
  _INewCustomer,
  _INewParkOwner,
  _INewProfile,
  _TNewUser,
  _IUsersTable,
  _IExtraUsers
};
