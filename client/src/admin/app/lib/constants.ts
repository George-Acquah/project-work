// import {
//   ArrowDownIcon,
//   ArrowUpIcon,
//   HomeModernIcon,
//   TvIcon,
//   UserPlusIcon,
//   UsersIcon,
//   HomeIcon,
//   BoltSlashIcon,
//   DocumentIcon,
//   UserCircleIcon,
//   AtSymbolIcon,
//   CalendarDaysIcon,
// } from "@heroicons/react/24/outline";
// import { dashboardRoutes } from "./routes";

// const clientCookiesKeys = {
//   BANNER_HIDDEN: "template-banner-hidden",
// };

// const clientCookiesValues = {
//   BANNER_HIDDEN: "true",
// };

// const roomLinks: _INavLinks[] = [
//   {
//     href: "/admin/users/roomType",
//     name: "Room Types",
//     type: "normal",
//     icon: HomeModernIcon,
//   },
//   {
//     href: "/admin/users/rooms",
//     name: "Rooms",
//     type: "normal",
//     icon: HomeIcon,
//   },
// ];

// const usersLinks: _INavLinks[] = [
//   {
//     href: dashboardRoutes.USERS.APPLICANTS.BASE,
//     name: "Applicants",
//     type: "normal",
//     icon: UsersIcon,
//   },
//   // {
//   //   href: dashboardRoutes.USERS.STUDENTS.BASE,
//   //   name: "Students",
//   //   type: "normal",
//   //   icon: UsersIcon,
//   // },
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
//     href: "/admin/paymentInformation/income",
//     name: "Income",
//     type: "green",
//     icon: ArrowUpIcon,
//   },
//   {
//     href: "/admin/paymentInformation/withdrawal",
//     name: "Withdrawal",
//     type: "red",
//     icon: ArrowDownIcon,
//   },
// ];

// const applicationsLinks: _INavLinks[] = [
//   {
//     href: "/dashboard/applications",
//     name: "Overview",
//     type: "normal",
//     icon: TvIcon,
//   },
//   {
//     href: "/dashboard/applications/details",
//     name: "Applications",
//     type: "normal",
//     icon: DocumentIcon,
//   },
// ];

// const applicantsTableColumn: string[] = [
//   "IMAGE",
//   "USERNAME",
//   "EMAIL ADDRESS",
//   "ROLE",
//   "DATE REGISTERED",
//   "LAST UPDATED",
//   "IS ACTIVE",
//   // "PHONE NUMBER",
//   // "GENDER",
// ];

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
//     id: "username",
//     placeholder: "Enter Username",
//     value: "test-val",
//     label: "Username",
//     icon: UserCircleIcon,
//     type: "text",
//     disabled: false,
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
//     placeholder: "Creation Dat",
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
//     icon: UserCircleIcon,
//     type: "text",
//     disabled: false,
//   },
//   {
//     id: "area",
//     placeholder: "Enter Area",
//     value: "test area",
//     label: "Area",
//     icon: UserCircleIcon,
//     type: "text",
//     disabled: false,
//   },
//   {
//     id: "city",
//     placeholder: "Enter City",
//     value: "Accra",
//     label: "City",
//     icon: UserCircleIcon,
//     type: "text",
//     disabled: false,
//   },
//   {
//     id: "state",
//     placeholder: "Enter State",
//     value: "state",
//     label: "State",
//     icon: UserCircleIcon,
//     type: "text",
//     disabled: false,
//   },
//   {
//     id: "pinCode",
//     placeholder: "Enter Pincode",
//     value: "pinCode",
//     label: "Pincode",
//     icon: UserCircleIcon,
//     type: "text",
//     disabled: false,
//   },
// ];

// export {
//   clientCookiesKeys,
//   clientCookiesValues,
//   applicationsLinks,
//   roomLinks,
//   usersLinks,
//   paymentLinks,
//   applicantsTableColumn,
//   navDropdownLinks,
//   editAdminDetails,
//   editAdminProfileDetails,
//   editAdminContactDetails,
//   editAdminOtherDetails,
// };