import { dashboardRoutes } from "@/app/lib/routes";
import { bodyBg } from "@/app/ui/themes";
import { AtSymbolIcon, UserIcon } from "@heroicons/react/24/outline";

interface _IUpdateUserData {
  email: string;
  fullname: string;
}

const addUserFields = (options: string[]) => {
  return [
    {
      id: "email",
      placeholder: "Enter Email",
      label: "Email",
      icon: AtSymbolIcon,
      type: "email",
      required: true,
      mt: false,
      width: "lg:w-1/2",
      bg: bodyBg,
    },
    {
      id: "fullName",
      label: "Full Name",
      placeholder: "Enter Full Name",
      icon: UserIcon,
      type: "text",
      disabled: false,
      width: "lg:w-1/2",
      bg: bodyBg,
    },
    {
      label: "User Type",
      id: "userType",
      type: "select",
      input_type: "select",
      disabled: false,
      options: options,
      width: "lg:w-1/2",
    },
    {
      label: "Verified Status",
      id: "isActive",
      type: "radio",
      input_type: "radio",
      disabled: false,
      width: "lg:w-1/2",
      radio: [
        {
          id: "verified",
          checked: false,
          value: "true",
          label: "Verified",
        },
        {
          id: "unverified",
          checked: true,
          value: "false",
          label: "Unverified",
        },
      ],
    },
  ] as _IDetail[];
}

const updateUserFields = (options: string[], checked: boolean, data?: _IUpdateUserData) => {
  return [
    {
      id: "email",
      placeholder: "Enter Email",
      label: "Email",
      icon: AtSymbolIcon,
      type: "email",
      required: true,
      mt: false,
      width: "lg:w-1/2",
      bg: bodyBg,
      value: data?.email
    },
    {
      id: "fullName",
      label: "Full Name",
      placeholder: "Enter Full Name",
      icon: UserIcon,
      type: "text",
      disabled: false,
      width: "lg:w-1/2",
      bg: bodyBg,
      value: data?.fullname
    },
    {
      label: "User Type",
      id: "userType",
      type: "select",
      input_type: "select",
      disabled: false,
      options: options,
      width: "lg:w-1/2",
    },
    {
      label: "Verified Status",
      id: "isActive",
      type: "radio",
      input_type: "radio",
      disabled: false,
      width: "lg:w-1/2",
      radio: [
        {
          id: "verified",
          checked: checked ?? false,
          value: "true",
          label: "Verified",
        },
        {
          id: "unverified",
          checked: checked ?? true,
          value: "false",
          label: "Unverified",
        },
      ],
    },
  ] as _IDetail[];
};

const BREADCRUMBS = {
  ADD_UERS: [
    {
      label: "All Users",
      href: `${dashboardRoutes.USERS.ALL.BASE}`,
    },
    {
      label: `Add User`,
      href: `${dashboardRoutes.USERS.ALL.ADD}`,
      active: true,
    },
  ],
  ADD_OWNERS: [
    {
      label: "Owners",
      href: `${dashboardRoutes.USERS.OWNERS.BASE}`,
    },
    {
      label: `Add Owner`,
      href: `${dashboardRoutes.USERS.OWNERS.ADD}`,
      active: true,
    },
  ],
};

export { addUserFields, updateUserFields, BREADCRUMBS };