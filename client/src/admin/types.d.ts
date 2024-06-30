//ACCESS
interface _ITokens {
  access_token: string;
  u_id: string;
  refresh_token: string;
  expiresIn: number;
}

interface _IAddForm {
  options: string[];
  addFunction: _TUpdateEntityFunction;
  type: string;
  route: string;
  // entityData: any;
  // selecteds: any;
}

//BBBBBBB

interface Breadcrumb {
  label: string;
  href: string;
  active?: boolean;
}

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
  bg?: string;
}

interface _IEditApplicantForm {
  id: string;
  // fields: _IField[];
  // updateEntity: _TUpdateEntityFunction;
  // entityData: any;
  // selecteds: any;
  // successMessage?: string;

  options?: string[];
  updateFunction: _TUpdateEntityFunction;
  type: string;
  route: string;
  isVerified: boolean;
  entityData: any;
  selecteds: any;
}

// Props interface for the EditForms component
interface EditFormsProps {
  id: string;
  updateFunction: any;
  type: string;
  route: string;
  formType: "group" | "single";
  fieldConfigs: _IDetail[]; // Array of field configurations
  data?: Record<string, any>
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

interface _IForms {
  id?: string;
  action: any;
  actionType: 'add' | 'update',
  type: string;
  route: string;
  formType: "group" | "single";
  fieldConfigs: _IDetail[]; // Array of field configurations
  data?: Record<string, any>;
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

interface _IRegisterResponse {
  email: string;
  userType: _TUserType;
}

interface _ILogin extends _IRegisterResponse {
  image: string;
  _id: string;
}

interface _ILoginResponse {
  tokens: _ITokens;
  user: _ILogin;
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
  _id: string;
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

// Extend the User type with the properties you expect
interface _ISessionUser {
  _id: string;
  email: string;
  userType: _TUserType;
  image: string;
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

/**
 * Interface representing the properties for the CommonDivComp component.
 *
 * @template T - The generic type representing the shape of the data object.
 */
interface CommonDivCompProps<T> {
  /**
   * The data object containing the values to be rendered.
   * This object should have keys that match the `id` values in the `details` array.
   *
   * @type {T}
   * @memberof CommonDivCompProps
   */
  data: T;

  /**
   * The title of the section to be displayed.
   * This title will help categorize the inputs under a specific context.
   *
   * @type {string}
   * @memberof CommonDivCompProps
   */
  title: string;

  /**
   * An array of detail configurations for rendering input fields.
   * Each detail defines how an individual input should be displayed and populated.
   *
   * @type {Array<Detail<T>>}
   * @memberof CommonDivCompProps
   */
  details: Array<Detail<T>>;

  /**
   * Optional errors object to indicate validation issues for the inputs.
   * The keys should match the `id` values from the `details` array.
   *
   * @type {Record<string, string>}
   * @memberof CommonDivCompProps
   */
  errors: Record<string, string[] | undefined> | null;
}

/**
 * Interface representing the configuration for an individual input field.
 *
 * @template T - The generic type representing the shape of the data object.
 */
interface _IDetail {
  /**
   * The key of the data object to be used for this input field.
   * It should correspond to a property in the data object provided.
   *
   * @type {string}
   * @memberof Detail
   */
  id: string;

  /**
   * The placeholder text to be shown inside the input field.
   *
   * @type {string}
   * @memberof Detail
   */
  placeholder?: string;

  /**
   * The value to be shown inside the input field.
   *
   * @type {string}
   * @memberof Detail
   */
  value?: string;

  /**
   * The label to be displayed alongside the input field.
   * This provides a description or name for the field.
   *
   * @type {string}
   * @memberof Detail
   */
  label: string;

  width?: string;

  bg?: string;

  /**
   * The label to be displayed alongside the input field.
   * This provides a description or name for the field.
   *
   * @type {string}
   * @memberof Detail
   */
  input_type?: "select" | "radio" | "textarea";
  // input_type?: "select" | "radio";

  /**
   * Optional icon to be displayed within the input field.
   * Can be used to visually represent the field's purpose.
   *
   * @type {any}
   * @memberof Detail
   */
  icon?: string;

  /**
   * Optional options to be rendered for select input field.
   *
   * @type {any}
   * @memberof Detail
   */
  options?: string[];

  /**
   * Optional radios to be rendered for radio input field.
   *
   * @type {any}
   * @memberof Detail
   */
  radio?: _IRadio[];

  /**
   * The type of the input field (e.g., "text", "password").
   * Defines the kind of data the input field expects.
   *
   * @type {string}
   * @memberof Detail
   */
  type: string;

  /**
   * Whether the input field should be disabled.
   * This can be used to prevent editing of certain fields.
   *
   * @type {boolean}
   * @memberof Detail
   */
  disabled?: boolean;

  /**
   * Whether the input field should be given a resonable margin top.
   * @type {boolean}
   * @memberof Detail
   */
  mt?: boolean;

  /**
   * Optional tooltip to provide additional information about the input field.
   * Useful for giving users hints or guidance.
   *
   * @type {boolean}
   * @memberof Detail
   */
  tooltip?: boolean;

  /**
   * New optional property to define the group
   *
   * @type {any}
   * @memberof Detail
   */
  group?: string; //

  /**
   * Optional errors to show to the user
   *
   * @type {any}
   * @memberof Detail
   */
  errors?: Record<string, string[] | undefined> | null;
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
  icon: string;
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

interface _ISessionContext {
  /** A boolean to show whether session modal is opened or closed */
  isSessionModalOpen: boolean;
  /**  A callback url incase of an error */
  callbackUrl?: string;
  /** A void function that opens the session modal */
  openSessionModal: (cb?: string) => void;
  /** A void function that closes the session modal */
  closeSessionModal: () => void;
}

interface _IShowErrorModal {
  message: string;
  button_label: string;
  description?: string;
}
interface _IErrorModalContext {
  message: string | undefined;
  visible: boolean;
  button_label: undefined | string;
  description: undefined | string;
  /** A void function that opens the session modal */
  openErrorModal: (data: _IShowErrorModal) => void;
  /** A void function that closes the session modal */
  closeErrorModal: () => void;
}

interface _IParkingCenterImage extends _Image {
  center_id: string;
}

interface _IRefresh {
  tokens: _ITokens;
}

interface _ISearchParams {
  SESSION: string;
  ERROR: string;
  ERR_MSG: string;
  ERR_DESC: string;
  BTN_LABEL: string;
  APPLICANTS: string;
  USERS: string;
  CENTERS: string;
  SLOTS: string;
  ENTITY_TYPE: string;
}

interface _IThemeContext {
  themes: string[];
  toggleTheme?: () => void;
  forcedTheme?: string;
  setTheme: (theme: string) => void;
  theme?: string;
  /** If `enableSystem` is true and the active theme is "system", this returns whether the system preference resolved to "dark" or "light". Otherwise, identical to `theme` */
  resolvedTheme?: string;
  /** If enableSystem is true, returns the System theme preference ("dark" or "light"), regardless what the active theme is */
  systemTheme?: _IThemeType;
}
interface _ThemeProviderProps {
  /** List of all available theme names */
  themes?: string[];
  /** Forced theme name for the current page */
  forcedTheme?: string;
  /** Whether to switch between dark and light themes based on prefers-color-scheme */
  enableSystem?: boolean;
  /** Disable all CSS transitions when switching themes */
  disableTransitionOnChange?: boolean;
  /** Whether to indicate to browsers which color scheme is used (dark or light) for built-in UI like inputs and buttons */
  enableColorScheme?: boolean;
  /** Key used to store theme setting in localStorage */
  storageKey?: string;
  /** Default theme name (for v0.0.12 and lower the default was light). If `enableSystem` is false, the default theme is light */
  defaultTheme?: string;
  /** HTML attribute modified based on the active theme. Accepts `class` and `data-*` (meaning any data attribute, `data-mode`, `data-color`, etc.) */
  attribute?: string | "class";
  /** Mapping of theme name to HTML attribute value. Object where key is the theme name and value is the attribute value */
  value?: ValueObject | undefined;
  /** Nonce string to pass to the inline script for CSP headers */
  nonce?: string;
  children?: React.ReactNode;
}

interface _ITableContext {
  /** An array of all selected rows  */
  selectedRows: string[];
  /** A void function that selects a single checkbox in a row */
  handleRowSelection: (id: string, checked: boolean) => void;
  /** A void function that selects a single checkbox in a row */
  isRowSelected: (id: string) => boolean;
  /** A void function that selects all chechboxes in a row */
  handleSelectAllRows: (allIds: string[], checked: boolean) => void;
}

type _TVehicleImage = _Image;

type _TableRowType = _IFormattedCenter | _IFormattedUser | _IFormattedSlot;
type RequestMethod = "GET" | "POST" | "PATCH" | "DELETE" | "PUT";
type _TUserType = "owner" | "customer" | "admin" | "user" | "moderator";
type _TFields = "text" | "radio" | "select" | "email";
type _IThemeType = "light" | "dark";
type ValueObject = Record<string, string>;

type IconType = React.ForwardRefExoticComponent<
  Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
    title?: string;
    titleId?: string;
  } & React.RefAttributes<SVGSVGElement>
>;

type ActionResult =
  | {
      type: "success";
      message: string;
    }
  | {
      type: "error";
      errors: Record<string, string[] | undefined>;
    }
  | { type: undefined; message: null };

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

