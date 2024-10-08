import { AtSymbolIcon, KeyIcon } from "@heroicons/react/24/solid";
import { SvgHome, SvgRefresh, SvgGitHub } from "../ui/shared/icons";
import { CalendarIcon, ClockIcon, UserIcon } from "@heroicons/react/24/outline";
// import { dashboardRoutes } from "./routes";

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
interface SearchParamsKeys {
  [key: string]: string;
}

const searchParamsKeys: SearchParamsKeys = {
  APPLICANTS: "applicant",
  users: "users",
  centers: "centers",
  slots: "slots",
  SLOTS_KEY: 's_key',
};

const clientCookiesKeys = {
  BANNER_HIDDEN: "template-banner-hidden",
  THEME: "global-theme",
  LIST_VAL: "__ls_val",
  RESERVATION_STATUS: "_res_s",
  REQUEST_RESERVATION: "__req_res_ds",
  REQUEST_RESERVATION_DATA: "__req_res_d",
  AVAILABLE_SLOTS_PAGES: "__av_sp",
};

const clientCookiesValues = {
  BANNER_HIDDEN: "true",
  GLOBAL_LIGHT_THEME: "light" as _IThemeType,
  GLOBAL_DARK_THEME: "dark" as _IThemeType,
}

  const listData = [
    { name: "All Slots" },
    { name: "Available Slots" },
    { name: "Unavailable Slots" },
];
  
  const slotsResData = [
    { name: "Ratings above 80%" },
    { name: "Price above 50.00" },
    { name: "Price below 40.00" },
    { name: "Waiting time less than 1 minute" },
    { name: "Waiting time less more 5 minute" },
  ];
// const usersLinks: _INavLinks[] = [
//   {
//     href: dashboardRoutes.USERS.BASE,
//     name: "All Users",
//     type: "normal",
//     icon: UsersIcon,
//   },
//   {
//     href: dashboardRoutes.USERS.CUSTOMERS.BASE,
//     name: "Customers",
//     type: "normal",
//     icon: UsersIcon,
//   },
//   {
//     href: dashboardRoutes.USERS.OWNERS.BASE,
//     name: "Owners",
//     type: "normal",
//     icon: UsersIcon,
//   },
//   {
//     href: dashboardRoutes.USERS.ADMINS.BASE,
//     name: "Admins",
//     type: "normal",
//     icon: UsersIcon,
//   },
//   {
//     href: dashboardRoutes.USERS.UNVERIFIED.BASE,
//     name: "Unverified Users",
//     type: "red",
//     icon: UsersIcon,
//   },
// ];

// const paymentLinks: _INavLinks[] = [
//   {
//     href: "/admin/transactions/income",
//     name: "Income",
//     type: "green",
//     icon: ArrowUpIcon,
//   },
//   {
//     href: "/admin/transactions/withdrawal",
//     name: "Withdrawal",
//     type: "red",
//     icon: ArrowDownIcon,
//   },
// ];

// const reservationLinks: _INavLinks[] = [
//   {
//     href: "/dashboard/reservations",
//     name: "Overview",
//     type: "normal",
//     icon: TvIcon,
//   },
//   {
//     href: "/dashboard/reservations/details",
//     name: "Reservations",
//     type: "normal",
//     icon: DocumentIcon,
//   },
// ];

// const parkingLinks: _INavLinks[] = [
//   {
//     href: "/dashboard/parking-lots",
//     name: "Parking Centers",
//     type: "normal",
//     icon: TvIcon,
//   },
//   // {
//   //   href: "/dashboard/reservations/details",
//   //   name: "Center Details",
//   //   type: "normal",
//   //   icon: DocumentIcon,
//   // },
//   {
//     href: "/dashboard/slots",
//     name: "Slots",
//     type: "normal",
//     icon: DocumentIcon,
//   },
// ];

// const vehiclesLinks: _INavLinks[] = [
//   {
//     href: "/dashboard/reservations",
//     name: "Overview",
//     type: "normal",
//     icon: TvIcon,
//   },
//   {
//     href: "/dashboard/reservations/details",
//     name: "Reservations",
//     type: "normal",
//     icon: DocumentIcon,
//   },
// ];

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
const navigations = {
  navigationItems: [
    {
      path: "/",
      name: "Home",
      icon: SvgHome,
    },
    {
      path: "/",
      name: "Latest",
      icon: SvgHome,
    },
    {
      path: "/about",
      name: "About Us",
      // data: aboutData,
      icon: SvgRefresh,
    },
    {
      path: "/contact",
      name: "Investor Center",
      icon: SvgGitHub,
    },
    // {
    //   path: "/academics",
    //   name: "Academics",
    //   // data: academicsData,
    //   icon: SvgCheck,
    // },
    // {
    //   path: "/admissions",
    //   name: "Admissions",
    //   // data: admissionsData,
    //   icon: SvgExternalLink,
    // },
    // {
    //   path: "/programs",
    //   name: "Programs",
    //   // data: programsData,
    //   icon: SvgArrowElbow,
    // },
  ] as _ISidebarMenu[],
};



// const navDropdownLinks: _INavLinks[] = [
//   {
//     href: "/dashboard/admin",
//     name: "Profile",
//     type: "normal",
//     icon: UserPlusIcon,
//   },
//   {
//     href: "/admin/reservation",
//     name: "Settings",
//     type: "normal",
//     icon: BoltSlashIcon,
//   },
// ];

// const editAdminDetails: _ICommonInputComp[] = [
//   {
//     id: "fullname",
//     placeholder: "Enter Fullname",
//     value: "test-val",
//     label: "Username",
//     icon: UserCircleIcon,
//     type: "text",
//     disabled: true,
//     tooltip: true,
//   },
//   {
//     id: "email",
//     placeholder: "Enter Email",
//     value: "test-email",
//     label: "Email",
//     icon: AtSymbolIcon,
//     type: "email",
//     disabled: false,
//   },
// ];

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

const addCenterDetails: _ICommonInputComp[] = [
  {
    id: "center_name",
    placeholder: "Enter Center Name",
    label: "Center Name",
    value: "Test Name",
    icon: AtSymbolIcon,
    type: "text",
    required: true,
    disabled: false,
  },
  {
    id: "description",
    placeholder: "Enter Description For Center",
    label: "Description",
    icon: KeyIcon,
    type: "text",
    value: "Test Desc",
    required: true,
    disabled: false,
    tooltip: false,
  },
];

const requestReservationDetails: _ILoginInputComp[] = [
  {
    id: "start_time",
    placeholder: "Choose start Time",
    label: "Choose start Time",
    icon: CalendarIcon,
    type: "datetime-local",
    required: true,
    mt: true,
  },
  {
    id: "duration",
    placeholder: "35",
    label: "Reservation of Duration",
    icon: ClockIcon,
    type: "number",
    minLenght: 5,
    required: true,
    mt: true,
  },
];

const addCenterAddressDetails: _ICommonInputComp[] = [
  {
    id: "address",
    placeholder: "Enter Center Address",
    label: "Center Address",
    value: "Test Address",
    icon: AtSymbolIcon,
    type: "text",
    required: true,
    disabled: false,
  },
  {
    id: "latitude",
    placeholder: "Enter Center Latitude",
    label: "Latitude",
    icon: KeyIcon,
    type: "text",
    value: "Test Latitude",
    required: true,
    disabled: false,
    tooltip: false,
  },
  {
    id: "longitude",
    placeholder: "Enter Center Longitude",
    label: "Longitude",
    icon: KeyIcon,
    type: "text",
    value: "Test Longitude",
    required: true,
    disabled: false,
    tooltip: false,
  },
];

const registerDetails: _ILoginInputComp[] = [
  {
    id: "fullname",
    placeholder: "Enter Full Name",
    label: "Full Name",
    icon: UserIcon,
    type: "text",
    required: true,
    mt: false,
  },
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

// const editAdminProfileDetails: _ICommonInputComp[] = [
//   {
//     id: "first_name",
//     placeholder: "Enter Firstname",
//     value: "first name",
//     label: "First Name",
//     icon: UserCircleIcon,
//     type: "text",
//     disabled: false,
//   },
//   {
//     id: "last_name",
//     placeholder: "Enter Lastname",
//     value: "last name",
//     label: "Last Name",
//     icon: UserCircleIcon,
//     type: "text",
//     disabled: false,
//   },
// ];

// const editAdminOtherDetails: _ICommonInputComp[] = [
//   {
//     id: "createdAt",
//     placeholder: "Creation Date",
//     value: "created at date",
//     label: "Date of Registration",
//     icon: CalendarDaysIcon,
//     type: "text",
//     disabled: true,
//   },
//   {
//     id: "updatedAt",
//     placeholder: "Updated Date",
//     value: "updated at date",
//     label: "Date of Last Update",
//     icon: CalendarDaysIcon,
//     type: "text",
//     disabled: true,
//   },
// ];

// const editAdminContactDetails: _ICommonInputComp[] = [
//   {
//     id: "contact_no",
//     placeholder: "Enter Contact",
//     value: "contact",
//     label: "Contact No",
//     icon: PhoneIcon,
//     type: "text",
//     disabled: false,
//   },
//   {
//     id: "area",
//     placeholder: "Enter Area",
//     value: "test area",
//     label: "Area",
//     icon: MapPinIcon,
//     type: "text",
//     disabled: false,
//   },
//   {
//     id: "city",
//     placeholder: "Enter City",
//     value: "Accra",
//     label: "City",
//     icon: MapPinIcon, // You might want to use a different icon here
//     type: "text",
//     disabled: false,
//   },
//   {
//     id: "state",
//     placeholder: "Enter State",
//     value: "state",
//     label: "State",
//     icon: GlobeAltIcon, // You might want to use a different icon here
//     type: "text",
//     disabled: false,
//   },
//   {
//     id: "pinCode",
//     placeholder: "Enter Pincode",
//     value: "pinCode",
//     label: "Pincode",
//     icon: IdentificationIcon, // You might want to use a different icon here
//     type: "text",
//     disabled: false,
//   },
// ];


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
  searchParamsKeys,
  listData,
  loginDetails,
  credentials,
  UserType,
  tableColumns,
  chartData,
  navigations,
  registerDetails,
  addCenterDetails,
  addCenterAddressDetails,
  requestReservationDetails,
  slotsResData,
  // navDropdownLinks,
  // editAdminDetails,
  // editAdminProfileDetails,
  // editAdminContactDetails,
  // editAdminOtherDetails,
  // reservationLinks,
  // usersLinks,
  // paymentLinks,
  // parkingLinks,
  // vehiclesLinks,
};
