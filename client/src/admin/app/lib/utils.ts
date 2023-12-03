import { deleteCookie, setCookie } from "cookies-next";
import { clientCookiesKeys, clientCookiesValues } from "./constants";
import { UserType } from "./constants";
import { endpoints } from "./endpoints";

const formatCurrency = (amount: number) => {
  return (amount / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

const convertDateToString = (
  dateString: string,
  locale: string = "en-US"
) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    // Invalid date, return the original string or handle the error accordingly
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

function formatUserType(type: _TUserType) {
  if (type === UserType.PARK_OWNER) {
    return "Park Owner";
  }
  return type
}


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

function deleteThemeCookie() {
  deleteCookie(clientCookiesKeys.THEME);
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const getDistinctFilterUrl = (helper: string) => {
  switch (helper) {
    case UserType.ADMIN:
      return endpoints.USERS.GET_FILTERED_USERS;
    case UserType.PARK_OWNER:
      return endpoints.USERS.GET_FILTERED_USERS;
    case UserType.CUSTOMER:
      return endpoints.USERS.GET_FILTERED_USERS;

    default:
      return endpoints.USERS.GET_FILTERED_USERS;
  }
};
const getDistinctLatestUrl = (helper: string) => {
  switch (helper) {
    case UserType.ADMIN:
      return endpoints.USERS.GET_LATEST_USERS;
    case UserType.PARK_OWNER:
      return endpoints.USERS.GET_LATEST_USERS;
    case UserType.CUSTOMER:
      return endpoints.USERS.GET_LATEST_USERS;

    default:
      return endpoints.USERS.GET_LATEST_USERS;
  }
};

function formatusersTable(users: _IUser[]): _IFormattedUser[] {
  return users.map((user) => ({
    _id: user._id,
    image: user.image || null,
    email: user.email,
    fullname: `${user?.profile?.first_name ?? "Update"} ${
      user?.profile?.last_name ?? "Profile"
    }`,
    contact: user.profile.contact_no ?? "Update Profile",
    location: user.profile.area ?? "Update Profile",
    vehicles: user?.vehicles?.length ?? 0,
    centers: user?.centers?.length ?? 0,
    userType: formatUserType(user.userType),
    createdAt: convertDateToString(
      (user?.createdAt as unknown as string) ?? new Date()
    ),
    updatedAt: convertDateToString(
      (user?.updatedAt as unknown as string) ?? new Date()
    ),
    isVerified: user.isVerified ? "verified" : "not verified",
  }));
}

function formatCentersTable(users: _IUser[]): _IFormattedUser[] {
  return users.map((user) => ({
    _id: user._id,
    image: user.image || null,
    email: user.email,
    fullname: `${user?.profile?.first_name ?? "Update"} ${
      user?.profile?.last_name ?? "Profile"
    }`,
    contact: user.profile.contact_no ?? "Update Profile",
    location: user.profile.area ?? "Update Profile",
    vehicles: user?.vehicles?.length ?? 0,
    centers: user?.centers?.length ?? 0,
    userType: formatUserType(user.userType),
    createdAt: convertDateToString(
      (user?.createdAt as unknown as string) ?? new Date()
    ),
    updatedAt: convertDateToString(
      (user?.updatedAt as unknown as string) ?? new Date()
    ),
    isVerified: user.isVerified ? "verified" : "not verified",
  }));
}

// function formatAdminDetails(user: _IUser): _IEditUser {
//     return {
//       id: user.id,
//       username: user.username,
//       email: user.email,
//       createdAt: convertDateToString(user.createdAt as unknown as string),
//       updatedAt: convertDateToString(user.updatedAt as unknown as string),
//       image: user.profile?.image || null,
//       first_name: user.profile?.first_name || null,
//       last_name: user.profile?.last_name || null,
//       contact_no: user.profile?.contact_no || null,
//       area: user.profile?.area || null,
//       city: user.profile?.city || null,
//       state: user.profile?.state || null,
//       pinCode: user.profile?.pinCode || null,
//     };
// }

export {
  formatCurrency,
  convertDateToString,
  generatePagination,
  classNames,
  setDarkThemeCookie,
  setLightThemeCookie,
  formatUserType,
  getDistinctFilterUrl,
  getDistinctLatestUrl,
  formatusersTable,
  formatCentersTable,
  // setHiddenCookie,
  // deleteHiddenCookie,
  // formatusersTable,
  // formatAdminDetails,
}

