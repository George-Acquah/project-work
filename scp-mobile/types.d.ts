interface _IApiConfig<T = any> {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  data?: T | null;
  // headers?: _IAxiosHeaders;
}

interface _IPostApiResponse {
  statusCode: number;
  message: string;
}

interface _IApiResponse<T> extends _IPostApiResponse {
  data: T;
}

interface _IAxiosHeaders {
  [key: string]: string;
}

interface _IAccount {
  first_name: string;
  last_name: string;
  phone_number: string;
  state?: string;
  area?: string;
  pincode?: string;
}

interface _IAddress {
  _id: string;
  city: string;
  latitude: number;
  longitude: number;
  state: string;
  country: string;
}

interface _IBooking {
  parkingCenterName: string;
  slotName: string;
  location: string;
  dateTime: string;
  status: string;
}

interface _ICenterAddress extends _IAddress {
  center_id: string;
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

interface _ICenterParams {
  centers: string;
  currentPage: number;
  pageSize: number;
}

interface _IVehicleParams {
  vehicles: string;
  currentPage: number;
  pageSize: number;
}

interface _IChildren {
  children: React.ReactNode;
}

interface _IFavoriteParkingCenter {
  parkingCenterName: string;
  location: string;
}

interface _IFetchRes<T> {
  data: T;
}

interface _IId {
  id: string;
}

interface _ILoginResponse {
  tokens: _ITokens;
  user: _ILogin;
}

interface _IRegisterResponse {
  email: string;
  userType: string;
}

interface _ILogin extends _IRegisterResponse {
  _id: string;
}

interface _IParkingCenter {
  _id: string;
  center_name: string;
  description: string;
  type: CenterTypes; // to be changed into enum depending on slot spaces and total slots
  center_data: _ICenterData | null;
  center_address: _ICenterAddress | null;
  createdAt: Date;
  updatedAt: Date;
  contact: string;
  // location: _IDestination;
  isAvailable: boolean;
  isVerified: boolean;
  center_images: Array<_IParkingCenterImage>;
  slots: Array<_ISlot>;
  owner: string;
}

interface _IParkingCenterImage extends _Image {
  center_id: string;
}

interface _IQuery {
  query: string;
  page: string;
  num_pages: string;
}

interface _IRefresh {
  tokens: _ITokens;
}

interface _ISlot {
  _id: string;
  slot_name: string;
  description: string;
  type: SlotTypes; // to be changed to enum depending on slot space;
  slot_images: Array<_ISlotImage>;
  isAvailable: boolean;
  slot_data: _ISlotData | null;
  slot_address: _ISlotAddress | null;
  createdAt: Date;
  updatedAt: Date;
  contact: string;
  // location: _IDestination;
  isVerified: boolean;
  center_id: string;
}

interface _ISlotAddress extends _IAddress {
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

interface _ISlotImage extends _Image {
  slot_id: string;
}

interface _ISlotParams {
  slots: string;
  currentPage: number;
  pageSize: number;
}

interface _ISlotReservation {
  reservationId: string;
  slotId: string;
  start_time: string;
  end_time: string;
  cost_of_reservation: number;
  free_waiting_time: number;
}

interface _ITestCenters {
  _id: string;
  owner: string;
  center_name: string;
  description: string;
  type: CenterTypes;
  createdAt: Date;
  updatedAt: Date;
  isAvailable: boolean;
  isVerified: boolean;
  address: string;
  latitude: number;
  longitude: number;
  slots: number;
  image: string;
}

interface _ITipsData {
  title: string;
  description: string;
  image: string;
}

interface _ITokens {
  access_token: string;
  u_id: string;
  refresh_token: string;
  expiresIn: number;
}

interface _IVehicle {
  _id: string;
  vehicle_no: string;
  isVerified: boolean;
  hasSlot: boolean;
  images: Array<_TVehicleImage>;
  driver: string;
}

interface _IVerifyUser {
  _id: string;
  email: string;
  user_image: string | null;
  first_name: string | null;
  last_name: string | null;
  phone_number: string | null;
  area: string | null;
  state: string | null;
  pincode: string | null;
}

interface _IUser {
  _id: string;
  email: string;
  userType: _TUserType;
  image: any;
  createdAt: Date;
  updatedAt: Date;
  isVerified: boolean;
  profile: any;
  vehicles: any[];
  centers: any[];
}

type _TUserType = 'Customer' | 'ParkOwner';

interface _Image {
  _id: string;
  file_id: string;
  filename: string;
  mimetype: string;
}

interface _IDestination {
  location: {
    lat: number;
    lng: number;
  };
  description: string;
}

type _TVehicleImage = _Image;

interface SearchParamsKeys {
  [key: string]: string;
}
