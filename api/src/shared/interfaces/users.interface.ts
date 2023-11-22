import { Document, Types } from 'mongoose';
import { _IParkingCenter } from './slot.interface';
import { _IPlainVehicle } from './vehicles.interface';
import { UserType } from '../enums/users.enum';

interface _ICustomer extends Document<Types.ObjectId> {
  email: string;
  userType: UserType;
  readonly password: string;
  profile: _ICustomerProfile;
  vehicles: _IPlainVehicle[];
  rankings: _ICustomerRankings;
}

interface _ISanitizedCustomer {
  _id: string;
  email: string;
  userType: UserType;
  profile: _ICustomerProfile;
  vehicles: _IPlainVehicle[];
  rankings: _ICustomerRankings;
}

interface _IParkOwner extends Document<Types.ObjectId> {
  email: string;
  userType: UserType;
  readonly password: string;
  profile: _ICustomerProfile;
  centers: _IParkingCenter[]; // to be changed to parking center interface
  rankings: _IOwnerRankings;
}

interface _ISanitizedParkOwner {
  _id: string;
  email: string;
  userType: UserType;
  profile: _ICustomerProfile;
  centers: _IParkingCenter[]; // to be changed to parking center interface
  rankings: _IOwnerRankings;
}

export interface _ICustomerProfile extends Document {
  first_name: string | null;
  last_name: string | null;
  contact_no: string | null;
  image: string | null;
  area: string | null;
  city: string | null;
  state: string | null;
  pinCode: string | null;
}

interface _ICustomerLocation {
  location_at_pickup: string;
  current_loc: string;
}

interface _ICustomerRankings {
  id: string;
}

interface _IOwnerRankings {
  id: string;
}

interface CustomerHelpUser {
  rankings: _ICustomerRankings;
  vehicles: _IPlainVehicle[];
}

interface OwnerHelpUser {
  centers?: _IParkingCenter[]; // to be changed to parking center interface
  rankings: _IOwnerRankings;
}
interface _ICommonUser extends Document<Types.ObjectId> {
  email: string;
  userType: UserType;
  readonly password: string;
  profile: _ICustomerProfile;
}

interface _ISanitizedCommonUser {
  _id: string;
  userType: UserType;
  email: string;
  profile: _ICustomerProfile;
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
};
