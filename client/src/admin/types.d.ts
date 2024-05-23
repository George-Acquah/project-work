//ACCESS
interface _ITokens {
  access_token: string;
  u_id: string;
  refresh_token: string;
  expiresIn: number;
}

//BBBBBBB
interface _IBtn {
  href: string;
  text: string;
  label: string;
}


interface _IChildren {
  children: React.ReactNode;
}
//DATA
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

//EEEEE

interface _IRadio {
  id: string;
  checked: boolean;
  value: string;
  label: string;
}

interface _IEditApplicantForm {
  id: string;
  fields: _IField[];
  updateEntity: _TUpdateEntityFunction;
  entityData: any;
  selecteds: any;
  successMessage?: string;
}
interface _IField {
  label: string;
  key: string;
  type: _TFields;
  disabled: boolean;
  options?: string[];
  icon?: IconType;
  radio?: _IRadio[];
}
interface _ILoginError {
  username?: string[];
  password?: string[];
}

// FFFFF
interface _IFetcher {
  url: string;
  token?: string;
  method?: RequestMethod;
  cache?: RequestCache;
}

interface _IFeedback {
  _id: string;
  // Add other properties relevant to feedback
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

interface _IFormattedCenter {
  [key: string]: string | number | null;
  _id: string;
  center_type: CenterTypes;
  center_name: string;
  description: string;
  location: string;
  createdAt: string;
  updatedAt: string;
  isVerified: string;
  slots: number;
  image: string | null;
  isAvailable: string;
  capacity: number;
}

interface _IFormattedSlot {
  [key: string]: string | number | null;
  _id: string;
  slot_type: SlotTypes;
  slot_name: string;
  description: string;
  parking_center: string;
  location: string;
  createdAt: string;
  updatedAt: string;
  isVerified: string;
  isAvailable: string;
  image: string | null;
  center_id: string;
  capacity: number;
  price: number;
}
interface _IFormattedTransaction {
  [key: string]: string | number | null;
  _id: string;
  // Add other formatted properties relevant to transactions
}

interface _IFormattedPayment {
  [key: string]: string | number | null;
  _id: string;
  // Add other formatted properties relevant to payments
}

interface _IFormattedReport {
  [key: string]: string | number | null;
  _id: string;
  // Add other formatted properties relevant to reports
}

interface _IFormattedNotification {
  [key: string]: string | number | null;
  _id: string;
  // Add other formatted properties relevant to notifications
}

interface _IFormattedSetting {
  [key: string]: string | number | null;
  _id: string;
  // Add other formatted properties relevant to settings
}

interface _IFormattedFeedback {
  [key: string]: string | number | null;
  _id: string;
  // Add other formatted properties relevant to feedback
}

interface _IFormattedMaintenanceRequest {
  [key: string]: string | number | null;
  _id: string;
  // Add other formatted properties relevant to maintenance requests
}

interface _IFormattedSecurityLog {
  [key: string]: string | number | null;
  _id: string;
  // Add other formatted properties relevant to security logs
}


//IIIIIIIIIII
interface _Id {
  id: string
}

interface _IdParams {
  params: _Id;
}

// MMMMMMM
interface _IMaintenanceRequest {
  _id: string;
  // Add other properties relevant to maintenance requests
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

interface _INotification {
  _id: string;
  // Add other properties relevant to notifications
}

// PPP
interface _IParkingCenter {
  _id: string;
  center_name: string;
  description: string;
  type: CenterTypes; // to be changed into enum depending on slot spaces and total slots
  center_data: _ICenterData;
  createdAt: Date;
  updatedAt: Date;
  contact: string;
  location: string;
  isAvailable: boolean;
  isVerified: boolean;
  center_images: Array<_IParkingCenterImage>;
  slots: Array<_ISlot>;
  owner: string;
}

interface _IPayment {
  _id: string;
  // Add other properties relevant to payments
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

//RRRR

interface _IReport {
  _id: string;
  // Add other properties relevant to reports
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
  createdAt: Date;
  updatedAt: Date;
  contact: string;
  location: string;
  isVerified: boolean;
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

interface _ISecurityLog {
  _id: string;
  // Add other properties relevant to security logs
}

interface _ISetting {
  _id: string;
  // Add other properties relevant to settings
}

interface _ISpecificTableProps {
  query: string;
  currentPage: number;
  pageSize: number;
  type?: string;
}

//TTTTTTT
interface _ITableProps<T = _TableRowType[]> {
  query: string;
  currentPage: number;
  columnData: string[];
  entityType: string;
  data?: T;
  type?: string;
}

interface _ITransaction {
  _id: string;
  // Add other properties relevant to transactions
}

// UUU

interface _IUpdate {
  id: string;
  label: string;
  href: string;
}
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

interface _IEditAdminForm {
  admin: _IEditUser;
  title?: string;
  errors?: any;
}

interface _IEditUser {
  [key: string]: string | null;
  _id: string;
  fullname: string;
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
  tooltip?: boolean;
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

type _TableRowType = _IFormattedCenter | _IFormattedUser | _IFormattedSlot;
type RequestMethod = "GET" | "POST" | "PATCH" | "DELETE" | "PUT";
type _TUserType = "owner" | "customer" | "admin" | "user" | "moderator";
type _TFields = "text" | "radio" | "select" | "email";

type _TUpdateEntityFunction<T> = (
  id: string,
  data: string,
  prevState: any,
  formData: FormData
) => Promise<
  | {
      // errors: {
      //   [key in T["key"]]: string[] | undefined;
      // };
      errors: any;
      message: string;
    }
  | {
      message: any;
      errors?: undefined;
    }
>;

