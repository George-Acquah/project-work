//ACCESS
interface _ITokens {
  access_token: string;
  u_id: string;
  refresh_token: string;
  expiresIn: number;
}


interface _IChildren {
  children: React.ReactNode;
}

//EEEEE 
interface _ILoginError {
  username?: string[];
  password?: string[];
}

interface _IFetcher {
  url: string;
  token?: string;
  method?: RequestMethod;
  cache?: RequestCache;
}

//IIIIIIIIIII
interface _Id {
  id: string
}

interface _IdParams {
  params: _Id;
}


/// NNNN
interface _INavProps {
  pathname: string;
  data: _INavLinks[];
  title: string;
  rem?: boolean;
}
interface _INavLinks {
  href: string;
  type: NavColors;
  name: string;
  icon: 
  IconType;
}

// PPP
interface _IParkingCenter {
  _id: string;
  center_name: string;
  description: string;
  type: CenterTypes; // to be changed into enum depending on slot spaces and total slots
  center_data: _ICenterData;
  center_images: Array<_IParkingCenterImage>;
  slots: Array<_ISlot>;
  owner: string;
}
interface _IProfile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  contact_no: string | null;
  area: string | null;
  city: string | null;
  state: string | null;
  pinCode: string | null;
}

// SSSSSSSSSSS

interface _ISlot {
  _id: string;
  slot_name: string;
  description: string;
  type: SlotTypes; // to be changed to enum depending on slot space;
  slot_images: Array<_ISlotImage>;
  isAvailable: boolean;
  slot_data: _ISlotData;
  center_id: string;
}

interface _ISlotData {
  _id: string;
  total_daily_bookings: number;
  total_weekly_bookings: number;
  total_bookings: number;
  total_monthly_bookings: number;
  total_yearly_bookings: number;
  slot_id: string;
}

interface _ICenterData {
  _id: string;
  total_daily_bookings: number;
  total_weekly_bookings: number;
  total_bookings: number;
  total_monthly_bookings: number;
  total_yearly_bookings: number;
  total_slots: number;
  center_id: string;
}
interface _ISpecificTableProps {
  applicant: string;
  currentPage: number;
  pageSize: number;
  type: string;
}

//TTTTTTT
interface _ITableProps<T = _IFormattedUser[]> {
  query: string;
  currentPage: number;
  columnData: string[];
  type: string;
  data?: T;
}

// UUU
interface _IUser {
  _id: string;
  email: string;
  userType: _TUserType;
  image: any;
  createdAt: Date;
  updatedAt: Date;
  isVerified: boolean;
  profile: _IProfile;
  vehicles: _IVehicle[];
  centers: _IParkingCenter[];
}

interface _IFormattedUser {
  [key: string]: string | number | null;
  _id: string;
  email: string;
  userType: _TUserType | "Park Owner";
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

interface _IEditUser {
  [key: string]: string | null;
  id: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  image: string | null;
  first_name: string | null;
  last_name: string | null;
  contact_no: string | null;
  image: string | null;
  area: string | null;
  city: string | null;
  state: string | null;
  pinCode: string | null;
}

//VVVVVV

interface _IVehicle {
  _id: string;
  vehicle_no: string;
  isVerified: boolean;
  hasSlot: boolean;
  images: Array<_TVehicleImage>;
  driver: string;
}
interface _IValidationState<T=any> {
  errors?: T;
  message?: string | null;
};

interface _IPostApiResponse {
  statusCode: number;
  message: string;
}

interface _IApiResponse<T> extends _IPostApiResponse {
    data: T
}

interface _Inputs {
  id: string;
  placeholder: string;
  label: string;
  icon: IconType;
  type: string;
}
interface _ICommonInputComp extends _Inputs{
  value: string;
  disabled?: boolean;
  errors?: any;
}

interface _ILoginInputComp extends _Inputs {
  required: boolean;
  mt: boolean;
  minLenght?: number;
  errors?: any;
}

interface _Image {
  _id: string;
  file_id: string;
  filename: string;
  mimetype: string;
}

interface _ISlotImage extends _Image {
  slot_id: string;
}

interface _IParkingCenterImage extends _Image {
  center_id: string;
}
type _TVehicleImage = _Image;
type RequestMethod = "GET" | "POST" | "PATCH" | "DELETE" | "PUT";
type _TUserType = "owner" | "customer" | "admin" | "user" | "moderator";
