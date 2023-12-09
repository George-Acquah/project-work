interface _IChildren {
  children: React.ReactNode;
}

// CCCCCCCC
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
interface _IThemeContext {
  themes: string[];
  toggleTheme?: () => void;
  forcedTheme?: string;
  setTheme: (theme: string) => void;
  theme?: string;
  /** If `enableSystem` is true and the active theme is "system", this returns whether the system preference resolved to "dark" or "light". Otherwise, identical to `theme` */
  resolvedTheme?: string;
  /** If enableSystem is true, returns the System theme preference ("dark" or "light"), regardless what the active theme is */
  systemTheme?: "dark" | "light";
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

interface _IOpenCloseContext {
  isOpen: boolean;
  activeAccordion: null;
  setIsOpen: (show: boolean) => void;
  setClose: () => void;
  setOpen: () => void;
  handleOpenClose: () => void;
  handleClick: (idx: any) => void;
  handleToggle: (idx: any) => any;
}

interface _INavbarContext {
  isVisible: boolean;
  sticky: boolean;
  openIndex: number;
  navbarOpen: boolean;
  toggleNavbar: (arg: boolean) => void;
  handleStickyNavbar: () => void;
  handleSubmenu: (idx: number) => void;
  closeSubMenu: () => void;
  closeNavbarMenu: () => void;
}
// END CCCCCCCCCCC

//FFFFFFFFFFFFFFFFFFFF
interface _IFetcher {
  url: string;
  token?: string;
  method?: RequestMethod;
  cache?: RequestCache;
}

// END FFFFFFFFFFFF

//IIIIIIIIIII
interface _Inputs {
  id: string;
  placeholder: string;
  label: string;
  icon: IconType;
  type: string;
}
interface _ICommonInputComp extends _Inputs {
  value: string;
  tooltip?: boolean;
  disabled?: boolean;
  errors?: any;
}

interface _Image {
  _id: string;
  file_id: string;
  filename: string;
  mimetype: string;
}

interface _ILoginInputComp extends _Inputs {
  required: boolean;
  mt: boolean;
  minLenght?: number;
  errors?: any;
}
// END IIIIIIIIII

// LLLLLLLL
interface _ILogin {
  dispatch: (payload: FormData) => void;
  title: string;
  description: string;
  hrText: string;
  data: _ILoginInputComp[];
  children: React.ReactNode;
  usageText: string;
  href: string;
  btnName: string;
  route: string;
  state: any;
}
// END LLLLLLLLLL

//NNNNNNNNNNNN
interface _ISidebarMenu {
  path: string;
  name: string;
  icon: any;
  data?: _ISubSidebarMenu[];
}

interface _ISubSidebarMenu {
  path: string;
  name: string;
  id?: string;
  icon: IconType;
}
// END NNNNNNNNNNNNN

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

// END PPPPPPPPP

// RRRRRRRRRR
interface _IPostApiResponse {
  statusCode: number;
  message: string;
}

interface _IApiResponse<T> extends _IPostApiResponse {
  data: T;
}

// END RRRRRRRRRRRRRR

// SSSSSSSSSSSSSSSSSS
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

// END SSSSSSSSSSSSSSSSS

// TTTTTTTTTTTTT
interface _ITokens {
  access_token: string;
  u_id: string;
  refresh_token: string;
  expiresIn: number;
}

// END TTTTTTTTTTTTTTTTT

// UUUUUUUUU
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

// END UUUUUUUUUUU

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

// END VVVVVVVVVVVVVV

interface _ISlotImage extends _Image {
  slot_id: string;
}

interface _IParkingCenterImage extends _Image {
  center_id: string;
}
type RequestMethod = "GET" | "POST" | "PATCH" | "DELETE" | "PUT";
type _TVehicleImage = _Image;
type _IThemeType = "light" | "dark";
type ValueObject = Record<string, string>;
