import { _IParkingCenter } from './slot.interface';
import { _IVehicle } from './vehicles.interface';

interface _ICustomer {
  id: string;
  email: string;
  readonly password: string;
  profile: _ICustomerProfile;
  vehicles: _IVehicle[];
  location: _ICustomerLocation;
  rankings: _ICustomerRankings;
}

interface _ISanitizedCustomer {
  id: string;
  email: string;
  profile: _ICustomerProfile;
  vehicles: _IVehicle[];
  location: _ICustomerLocation;
  rankings: _ICustomerRankings;
}

interface _IParkOwner {
  id: string;
  email: string;
  readonly password: string;
  profile: _ICustomerProfile;
  centers: _IParkingCenter[]; // to be changed to parking center interface
  rankings: _IOwnerRankings;
}

interface _ISanitizedParkOwner {
  id: string;
  email: string;
  profile: _ICustomerProfile;
  centers: _IParkingCenter[]; // to be changed to parking center interface
  rankings: _IOwnerRankings;
}

interface _ICustomerProfile {
  id: string;
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

export { _ICustomer, _IParkOwner, _ISanitizedCustomer, _ISanitizedParkOwner };
