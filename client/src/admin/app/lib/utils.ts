// import { deleteCookie, setCookie } from "cookies-next";
// import { clientCookiesKeys, clientCookiesValues } from "./constants";

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

// function setHiddenCookie() {
//   setCookie(clientCookiesKeys.BANNER_HIDDEN, clientCookiesValues.BANNER_HIDDEN);
// }

// function deleteHiddenCookie() {
//   deleteCookie(clientCookiesKeys.BANNER_HIDDEN);
// }

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

// function formatApplicantsTable(applicants: _IUser[]): _IFormattedUser[] {
//   return applicants.map((applicant) => ({
//     id: applicant.id,
//     image: applicant.profile?.image || null,
//     username: applicant.username,
//     email: applicant.email,
//     role: applicant.role,
//     createdAt: convertDateToString(applicant.createdAt as unknown as string),
//     updatedAt: convertDateToString(applicant.updatedAt as unknown as string),
//     isActive: applicant.isActive ? "active" : "not active",
//   }));
// }

// function formatAdminDetails(applicant: _IUser): _IEditUser {
//     return {
//       id: applicant.id,
//       username: applicant.username,
//       email: applicant.email,
//       createdAt: convertDateToString(applicant.createdAt as unknown as string),
//       updatedAt: convertDateToString(applicant.updatedAt as unknown as string),
//       image: applicant.profile?.image || null,
//       first_name: applicant.profile?.first_name || null,
//       last_name: applicant.profile?.last_name || null,
//       contact_no: applicant.profile?.contact_no || null,
//       area: applicant.profile?.area || null,
//       city: applicant.profile?.city || null,
//       state: applicant.profile?.state || null,
//       pinCode: applicant.profile?.pinCode || null,
//     };
// }

export {
  formatCurrency,
  convertDateToString,
  generatePagination,
  // setHiddenCookie,
  // deleteHiddenCookie,
  classNames,
  // formatApplicantsTable,
  // formatAdminDetails,
}

