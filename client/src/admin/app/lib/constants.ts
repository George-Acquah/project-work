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
  MapPinIcon,
  GlobeAltIcon,
  PhoneIcon,

  IdentificationIcon,
  TruckIcon,
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
    href: dashboardRoutes.USERS.ALL.BASE,
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
    href: dashboardRoutes.PAYMENTS.INCOME.BASE,
    name: "Income",
    type: "green",
    icon: ArrowUpIcon,
  },
  {
    href: dashboardRoutes.PAYMENTS.WITHDRAWAL.BASE,
    name: "Withdrawal",
    type: "red",
    icon: ArrowDownIcon,
  },
];

const reservationLinks: _INavLinks[] = [
  {
    href: dashboardRoutes.RESERVATIONS.BASE,
    name: "Overview",
    type: "normal",
    icon: TvIcon,
  },
  {
    href: dashboardRoutes.RESERVATIONS.VIEW,
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
  {
    href: "/dashboard/slots",
    name: "Slots",
    type: "normal",
    icon: DocumentIcon,
  },
];

const vehiclesLinks: _INavLinks[] = [
  {
    href: dashboardRoutes.VEHICLES.BASE,
    name: "Overview",
    type: "normal",
    icon: TruckIcon,
  },
  {
    href: dashboardRoutes.VEHICLES.VIEW,
    name: "Vehicles",
    type: "normal",
    icon: TruckIcon,
  },
];

const tableColumns = {
  usersTableColumn: [
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
  ],
  centersTableColumn: [
    "IMAGE",
    "CENTER NAME",
    "DESCRIPTION",
    "PHONE NUMBER",
    "LOCATION",
    "SLOTS",
    "CENTER TYPE",
    "DATE REGISTERED",
    "LAST UPDATED",
    "IS VERIFIED",
    "STATUS",
    "CAPACITY", // Added capacity column (if applicable)
  ],

  slotsTableColumn: [
    "IMAGE",
    "SLOT NAME",
    "DESCRIPTION",
    "LOCATION",
    "SLOT TYPE",
    "PARKING CENTER",
    "DATE REGISTERED",
    "LAST UPDATED",
    "IS VERIFIED",
    "STATUS",
    "CAPACITY", // Added capacity column (if applicable)
    "PRICE/RATE", // Added price/rate column (if applicable)
  ],

  vehiclesTableColumn: [
    "IMAGE",
    "VEHICLE NUMBER",
    "REGISTRATION NUMBER",
    "DESCRIPTION",
    "DATE REGISTERED",
    "EXPIRY DATE",
    "LAST UPDATED",
    'HAS INSURANCE',
    "HAS RESERVATION",
    "IS VERIFIED",
  ],

  // Transactions Table
  transactionsTableColumn: [
    "TRANSACTION ID",
    "USER",
    "PARKING CENTER",
    "SLOT",
    "AMOUNT",
    "DATE AND TIME",
  ],

  // Payments Table
  paymentsTableColumn: [
    "PAYMENT ID",
    "USER",
    "AMOUNT",
    "DATE AND TIME",
    "STATUS",
    "PAYMENT METHOD",
  ],

  // Reports/Analytics Table
  reportsTableColumn: [
    "REPORT ID",
    "DATE",
    "TOTAL USERS",
    "TOTAL CENTERS",
    "TOTAL SLOTS",
    "OCCUPANCY RATE",
    "REVENUE",
  ],

  // Notifications Table
  notificationsTableColumn: [
    "NOTIFICATION ID",
    "USER",
    "CONTENT",
    "DATE AND TIME",
    "STATUS",
  ],

  // Settings Table
  settingsTableColumn: ["SETTING ID", "NAME", "VALUE", "DESCRIPTION"],

  // Feedback Table
  feedbackTableColumn: [
    "FEEDBACK ID",
    "USER",
    "DATE AND TIME",
    "RATING",
    "COMMENTS",
  ],

  // Maintenance Requests Table
  maintenanceRequestsTableColumn: [
    "REQUEST ID",
    "PARKING CENTER",
    "SLOT",
    "USER",
    "DESCRIPTION",
    "DATE AND TIME",
    "STATUS",
  ],

  // Security Logs Table
  securityLogsTableColumn: [
    "LOG ID",
    "USER",
    "ACTION",
    "DATE AND TIME",
    "IP ADDRESS",
    "STATUS",
  ],
};

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
    id: "fullname",
    placeholder: "Enter Fullname",
    value: "test-val",
    label: "Username",
    icon: 'UserCircleIcon',
    type: "text",
    disabled: true,
    tooltip: true,
  },
  {
    id: "email",
    placeholder: "Enter Email",
    value: "test-email",
    label: "Email",
    icon: 'AtSymbolIcon',
    type: "email",
    disabled: false,
  },
];

const loginDetails: _ILoginInputComp[] = [
  {
    id: "email",
    placeholder: "Enter Email",
    label: "Email",
    icon: 'AtSymbolIcon',
    type: "email",
    required: true,
    mt: false,
  },
  {
    id: "password",
    placeholder: "Enter password",
    label: "Password",
    icon: 'KeyIcon',
    type: "password",
    required: true,
    mt: true,
    minLenght: 4,
  },
];

const editAdminProfileDetails: _IDetail[] = [
  {
    id: "first_name",
    placeholder: "Enter Firstname",
    value: "first name",
    label: "First Name",
    icon: 'UserCircleIcon',
    type: "text",
    disabled: false,
    errors: null
  },
  {
    id: "last_name",
    placeholder: "Enter Lastname",
    value: "last name",
    label: "Last Name",
    icon: 'UserCircleIcon',
    type: "text",
    disabled: false,
    errors: null
  },
];

const editAdminOtherDetails: _IDetail[] = [
  {
    id: "createdAt",
    placeholder: "Creation Date",
    value: "created at date",
    label: "Date of Registration",
    icon: 'CalendarDaysIcon',
    type: "text",
    disabled: true,
    errors: null
  },
  {
    id: "updatedAt",
    placeholder: "Updated Date",
    value: "updated at date",
    label: "Date of Last Update",
    icon: 'CalendarDaysIcon',
    type: "text",
    disabled: true,
    errors: null
  },
];

const editAdminContactDetails: _IDetail[] = [
  {
    id: "contact_no",
    placeholder: "Enter Contact",
    value: "contact",
    label: "Contact No",
    icon: 'PhoneIcon',
    type: "text",
    disabled: false,
    errors: null
  },
  {
    id: "area",
    placeholder: "Enter Area",
    value: "test area",
    label: "Area",
    icon: 'MapPinIcon',
    type: "text",
    disabled: false,
    errors: null
  },
  {
    id: "city",
    placeholder: "Enter City",
    value: "Accra",
    label: "City",
    icon: 'MapPinIcon', // You might want to use a different icon here
    type: "text",
    disabled: false,
    errors: null
  },
  {
    id: "state",
    placeholder: "Enter State",
    value: "state",
    label: "State",
    icon: 'GlobeAltIcon', // You might want to use a different icon here
    type: "text",
    disabled: false,
    errors: null
  },
  {
    id: "pinCode",
    placeholder: "Enter Pincode",
    value: "pinCode",
    label: "Pincode",
    icon: 'IdentificationIcon', // You might want to use a different icon here
    type: "text",
    disabled: false,
    errors: null
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

const chartData = {
  CHART_COLUMN: [
    "Revenue",
    "Centers",
    "Slots",
    "Vehicles",
  ],
  CONTACT_DETAILS: [],
};

export {
  clientCookiesKeys,
  clientCookiesValues,
  reservationLinks,
  usersLinks,
  paymentLinks,
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
  tableColumns,
  chartData,
};
