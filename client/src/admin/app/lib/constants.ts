import {
  ArrowDownIcon,
  ArrowUpIcon,
  TvIcon,
  UserPlusIcon,
  UsersIcon,
  BoltSlashIcon,
  DocumentIcon,
  UserCircleIcon,
  AtSymbolIcon,
  CalendarDaysIcon,
  KeyIcon,
} from "@heroicons/react/24/outline";
import { dashboardRoutes } from "./routes";
export const ErrorMessages = {
  NETWORK_FAILURE: "There's a problem with your internet connection.",
  AUTH_REQUIRED: "Authentication is required to access this page.",
  SERVER_ERROR: "An unexpected server error occurred.",
  NOT_FOUND: "The requested resource was not found.",
  UNAUTHORIZED: "You are not authorized to perform this action.",
  VALIDATION_ERROR: "Validation failed for the request.",
};

export const ErrorNames = {
  NETWORK_ERROR: "NetworkError",
  AUTH_ERROR: "AuthRequiredError",
  SERVER_ERROR: "ServerError",
  NOT_FOUND_ERROR: "NotFoundError",
  UNAUTHORIZED_ERROR: "UnauthorizedError",
  VALIDATION_ERROR: "ValidationError",
};

const UserType = {
  CUSTOMER: "Customer",
  PARK_OWNER: "ParkOwner",
  ADMIN: 'Admin',
  ALL: "All",
};


const clientCookiesKeys = {
  BANNER_HIDDEN: "template-banner-hidden",
  THEME: "global-theme",
};

const clientCookiesValues = {
  BANNER_HIDDEN: "true",
  GLOBAL_LIGHT_THEME: "light",
  GLOBAL_DARK_THEME: "dark",
};

const usersLinks: _INavLinks[] = [
  {
    href: dashboardRoutes.USERS.BASE,
    name: "All Users",
    type: "normal",
    icon: UsersIcon,
  },
  {
    href: dashboardRoutes.USERS.CUSTOMERS.BASE,
    name: "Customers",
    type: "normal",
    icon: UsersIcon,
  },
  {
    href: dashboardRoutes.USERS.OWNERS.BASE,
    name: "Owners",
    type: "normal",
    icon: UsersIcon,
  },
  {
    href: dashboardRoutes.USERS.ADMINS.BASE,
    name: "Admins",
    type: "normal",
    icon: UsersIcon,
  },
  {
    href: dashboardRoutes.USERS.UNVERIFIED.BASE,
    name: "Unverified Users",
    type: "red",
    icon: UsersIcon,
  },
];

const paymentLinks: _INavLinks[] = [
  {
    href: "/admin/transactions/income",
    name: "Income",
    type: "green",
    icon: ArrowUpIcon,
  },
  {
    href: "/admin/transactions/withdrawal",
    name: "Withdrawal",
    type: "red",
    icon: ArrowDownIcon,
  },
];

const reservationLinks: _INavLinks[] = [
  {
    href: "/dashboard/reservations",
    name: "Overview",
    type: "normal",
    icon: TvIcon,
  },
  {
    href: "/dashboard/reservations/details",
    name: "Reservations",
    type: "normal",
    icon: DocumentIcon,
  },
];

const parkingLinks: _INavLinks[] = [
  {
    href: "/dashboard/parking-lots",
    name: "Parking Centers",
    type: "normal",
    icon: TvIcon,
  },
  // {
  //   href: "/dashboard/reservations/details",
  //   name: "Center Details",
  //   type: "normal",
  //   icon: DocumentIcon,
  // },
  {
    href: "/dashboard/slots",
    name: "Slots",
    type: "normal",
    icon: DocumentIcon,
  },
];

const vehiclesLinks: _INavLinks[] = [
  {
    href: "/dashboard/reservations",
    name: "Overview",
    type: "normal",
    icon: TvIcon,
  },
  {
    href: "/dashboard/reservations/details",
    name: "Reservations",
    type: "normal",
    icon: DocumentIcon,
  },
];

const reservationsTableColumn: string[] = [
  "IMAGE",
  "USERNAME",
  "EMAIL ADDRESS",
  "ROLE",
  "DATE REGISTERED",
  "LAST UPDATED",
  "IS VERIFIED",
  // "GENDER",
  // "PHONE NUMBER",
];

const usersTableColumn: string[] = [
  "IMAGE",
  "EMAIL ADDRESS",
  "FULLNAME",
  "PHONE NUMBER",
  "LOCATION",
  "VEHICLES",
  "CENTERS",
  "USER TYPE",
  "DATE REGISTERED",
  "LAST UPDATED",
  "IS VERIFIED",
  // "GENDER",
];

const navDropdownLinks: _INavLinks[] = [
  {
    href: "/dashboard/admin",
    name: "Profile",
    type: "normal",
    icon: UserPlusIcon,
  },
  {
    href: "/admin/reservation",
    name: "Settings",
    type: "normal",
    icon: BoltSlashIcon,
  },
];

const editAdminDetails: _ICommonInputComp[] = [
  {
    id: "email",
    placeholder: "Enter Email",
    value: "test-val",
    label: "Username",
    icon: UserCircleIcon,
    type: "text",
    disabled: false,
  },
  {
    id: "email",
    placeholder: "Enter Email",
    value: "test-email",
    label: "Email",
    icon: AtSymbolIcon,
    type: "email",
    disabled: false,
  },
];

const loginDetails: _ILoginInputComp[] = [
  {
    id: "email",
    placeholder: "Enter Email",
    label: "Email",
    icon: AtSymbolIcon,
    type: "email",
    required: true,
    mt: false,
  },
  {
    id: "password",
    placeholder: "Enter password",
    label: "Password",
    icon: KeyIcon,
    type: "password",
    required: true,
    mt: true,
    minLenght: 4,
  },
];

const editAdminProfileDetails: _ICommonInputComp[] = [
  {
    id: "first_name",
    placeholder: "Enter Firstname",
    value: "first name",
    label: "First Name",
    icon: UserCircleIcon,
    type: "text",
    disabled: false,
  },
  {
    id: "last_name",
    placeholder: "Enter Lastname",
    value: "last name",
    label: "Last Name",
    icon: UserCircleIcon,
    type: "text",
    disabled: false,
  },
];

const editAdminOtherDetails: _ICommonInputComp[] = [
  {
    id: "createdAt",
    placeholder: "Creation Date",
    value: "created at date",
    label: "Date of Registration",
    icon: CalendarDaysIcon,
    type: "text",
    disabled: true,
  },
  {
    id: "updatedAt",
    placeholder: "Updated Date",
    value: "updated at date",
    label: "Date of Last Update",
    icon: CalendarDaysIcon,
    type: "text",
    disabled: true,
  },
];

const editAdminContactDetails: _ICommonInputComp[] = [
  {
    id: "contact_no",
    placeholder: "Enter Contact",
    value: "contact",
    label: "Contact No",
    icon: UserCircleIcon,
    type: "text",
    disabled: false,
  },
  {
    id: "area",
    placeholder: "Enter Area",
    value: "test area",
    label: "Area",
    icon: UserCircleIcon,
    type: "text",
    disabled: false,
  },
  {
    id: "city",
    placeholder: "Enter City",
    value: "Accra",
    label: "City",
    icon: UserCircleIcon,
    type: "text",
    disabled: false,
  },
  {
    id: "state",
    placeholder: "Enter State",
    value: "state",
    label: "State",
    icon: UserCircleIcon,
    type: "text",
    disabled: false,
  },
  {
    id: "pinCode",
    placeholder: "Enter Pincode",
    value: "pinCode",
    label: "Pincode",
    icon: UserCircleIcon,
    type: "text",
    disabled: false,
  },
];

const credentials = {
  email: {
    label: "Email",
    type: "email",
    placeholder: "",
  },
  password: {
    label: "Password",
    type: "password",
  },
};

export {
  clientCookiesKeys,
  clientCookiesValues,
  reservationLinks,
  usersLinks,
  paymentLinks,
  reservationsTableColumn,
  navDropdownLinks,
  editAdminDetails,
  editAdminProfileDetails,
  editAdminContactDetails,
  editAdminOtherDetails,
  loginDetails,
  credentials,
  UserType,
  parkingLinks,
  vehiclesLinks,
  usersTableColumn,
};
