import { deleteCookie, setCookie } from "cookies-next";
import { clientCookiesKeys, clientCookiesValues } from "./constants";


const formatCurrency = (amount: number) => {
  return (amount / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

const formatKey = (key: string): string => {
  // Example: Convert "FullName" to "Full Name"
  return key
    .replace(/([A-Z])/g, " $1") // Insert space before capital letters
    .replace(/^./, (str) => str.toUpperCase()); // Capitalize the first letter
};

const formatTitles = (key: string): string => {
  return key
    .replace(/_/g, " ") // Replace underscores with spaces
    .replace(/^./, (str) => str.toUpperCase()); // Capitalize the first letter
};

const convertDateToString = (dateString: string, locale: string = "en-US") => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    
    return dateString;
  }

  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

// function formatUserType(type: _TUserType) {
//   if (type === UserType.PARK_OWNER) {
//     return "Park Owner";
//   }
//   return type;
// }

const generatePagination = (currentPage: number, totalPages: number) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};

function setLightThemeCookie() {
  setCookie(clientCookiesKeys.THEME, clientCookiesValues.GLOBAL_LIGHT_THEME);
}

function setDarkThemeCookie() {
  setCookie(clientCookiesKeys.THEME, clientCookiesValues.GLOBAL_DARK_THEME);
}

function setCustomThemeCookie(val: string, opt?: any) {
  setCookie(clientCookiesKeys.THEME, val, opt);
}

function deleteThemeCookie() {
  deleteCookie(clientCookiesKeys.THEME);
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

// const getDistinctFilterUrl = (helper: string) => {
//   switch (helper) {
//     case UserType.ADMIN:
//       return endpoints.USERS.GET_FILTERED_USERS;
//     case UserType.PARK_OWNER:
//       return endpoints.USERS.GET_FILTERED_USERS;
//     case UserType.CUSTOMER:
//       return endpoints.USERS.GET_FILTERED_USERS;

//     default:
//       return endpoints.USERS.GET_FILTERED_USERS;
//   }
// };
// const getDistinctLatestUrl = (helper: string) => {
//   switch (helper) {
//     case UserType.ADMIN:
//       return endpoints.USERS.GET_LATEST_USERS;
//     case UserType.PARK_OWNER:
//       return endpoints.USERS.GET_LATEST_USERS;
//     case UserType.CUSTOMER:
//       return endpoints.USERS.GET_LATEST_USERS;

//     default:
//       return endpoints.USERS.GET_LATEST_USERS;
//   }
// };

// function formatusersTable(users: _IUser[]): _IFormattedUser[] {
//   return users.map((user) => ({
//     _id: user._id,
//     image: user.image || null,
//     email: user.email,
//     fullname: `${user?.profile?.first_name ?? "Update"} ${
//       user?.profile?.last_name ?? "Profile"
//     }`,
//     contact: user.profile.contact_no ?? "Update Profile",
//     location: user.profile.area ?? "Update Profile",
//     vehicles: user?.vehicles?.length ?? 0,
//     centers: user?.centers?.length ?? 0,
//     userType: formatUserType(user.userType),
//     createdAt: convertDateToString(
//       (user?.createdAt as unknown as string) ?? new Date()
//     ),
//     updatedAt: convertDateToString(
//       (user?.updatedAt as unknown as string) ?? new Date()
//     ),
//     isVerified: user.isVerified ? "verified" : "not verified",
//   }));
// }

// function formatCentersTable(centers: _IParkingCenter[]): _IFormattedCenter[] {
//   return centers.map((center) => ({
//     _id: center._id,
//     image: null,
//     // image: center?.center_images ? center?.center_images[0]?._id : null,
//     center_name: center.center_name,
//     description: center.description,
//     contact: center?.contact ?? "not Implemented",
//     location: center?.location ?? "not Implemented",
//     slots: center?.slots?.length ?? 0,
//     center_type: center.type,
//     createdAt: convertDateToString(
//       (center?.createdAt as unknown as string) ?? new Date()
//     ),
//     updatedAt: convertDateToString(
//       (center?.updatedAt as unknown as string) ?? new Date()
//     ),
//     isVerified: center.isVerified ? "verified" : "not verified",
//     isAvailable: center.isAvailable ? "available" : "not available",
//     capacity: Math.ceil(Math.random() * (20 - 2 + 1) + 2),
//   }));
// }

// function formatSlotsTable(slots: _ISlot[]): _IFormattedSlot[] {
//   return slots.map((slot) => ({
//     _id: slot._id,
//     center_id: slot.center_id,
//     image: null,
//     // image: center?.center_images ? center?.center_images[0]?._id : null,
//     slot_name: slot.slot_name,
//     description: slot.description,
//     location: slot?.location ?? "not Implemented",
//     slot_type: slot.type,
//     parking_center: slot.center_id,
//     createdAt: convertDateToString(
//       (slot?.createdAt as unknown as string) ?? new Date()
//     ),
//     updatedAt: convertDateToString(
//       (slot?.updatedAt as unknown as string) ?? new Date()
//     ),
//     isVerified: slot.isVerified ? "verified" : "not verified",
//     isAvailable: slot.isAvailable ? "available" : "not available",
//     capacity: Math.ceil(Math.random() * (20 - 2 + 1) + 2),
//     price: Math.ceil(Math.random() * (30 - 2 + 1) + 2),
//   }));
// }

// function formatTransactionsTable(
//   transactions: _ITransaction[]
// ): _IFormattedTransaction[] {
//   return transactions.map((transaction) => ({
//     _id: transaction._id,
//     // Map other transaction properties to formatted table properties
//   }));
// }

// function formatPaymentsTable(payments: _IPayment[]): _IFormattedPayment[] {
//   return payments.map((payment) => ({
//     _id: payment._id,
//     // Map other payment properties to formatted table properties
//   }));
// }

// function formatReportsTable(reports: _IReport[]): _IFormattedReport[] {
//   return reports.map((report) => ({
//     _id: report._id,
//     // Map other report properties to formatted table properties
//   }));
// }

// function formatNotificationsTable(
//   notifications: _INotification[]
// ): _IFormattedNotification[] {
//   return notifications.map((notification) => ({
//     _id: notification._id,
//     // Map other notification properties to formatted table properties
//   }));
// }

// function formatSettingsTable(settings: _ISetting[]): _IFormattedSetting[] {
//   return settings.map((setting) => ({
//     _id: setting._id,
//     // Map other setting properties to formatted table properties
//   }));
// }

// function formatFeedbackTable(feedback: _IFeedback[]): _IFormattedFeedback[] {
//   return feedback.map((feedbackItem) => ({
//     _id: feedbackItem._id,
//     // Map other feedback properties to formatted table properties
//   }));
// }

// function formatMaintenanceRequestsTable(
//   requests: _IMaintenanceRequest[]
// ): _IFormattedMaintenanceRequest[] {
//   return requests.map((request) => ({
//     _id: request._id,
//     // Map other maintenance request properties to formatted table properties
//   }));
// }

// function formatSecurityLogsTable(
//   logs: _ISecurityLog[]
// ): _IFormattedSecurityLog[] {
//   return logs.map((log) => ({
//     _id: log._id,
//     // Map other security log properties to formatted table properties
//   }));
// }

// function formatAdminDetails(user: _IUser): _IEditUser {
//   return {
//     _id: user._id,
//     fullname: `${user?.profile?.first_name ?? "Update"} ${
//       user?.profile?.last_name ?? "Profile"
//     }`,
//     email: user.email,
//     createdAt: convertDateToString(
//       (user?.createdAt as unknown as string) ?? new Date()
//     ),
//     updatedAt: convertDateToString(
//       (user?.updatedAt as unknown as string) ?? new Date()
//     ),
//     image: user?.image || null,
//     first_name: user.profile?.first_name || null,
//     last_name: user.profile?.last_name || null,
//     contact_no: user.profile?.contact_no || null,
//     area: user.profile?.area || null,
//     city: user.profile?.city || null,
//     state: user.profile?.state || null,
//     pinCode: user.profile?.pinCode || null,
//   };
// }

export {
  formatCurrency,
  convertDateToString,
  generatePagination,
  classNames,
  setDarkThemeCookie,
  setLightThemeCookie,
  // formatUserType,
  // getDistinctFilterUrl,
  // getDistinctLatestUrl,
  // formatusersTable,
  // formatCentersTable,
  // formatSlotsTable,
  // formatAdminDetails,
  formatKey,
  formatTitles,
  // setHiddenCookie,
  // deleteHiddenCookie,
  // formatusersTable,
};
