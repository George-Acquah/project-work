import { dashboardRoutes } from "@/app/lib/routes";
import { bodyBg, cardsBg } from "@/app/ui/themes";

const addUserFields = (options: string[]) => {
  return [
    {
      id: "email",
      placeholder: "Enter Email",
      label: "Email",
      icon: 'AtSymbolIcon',
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
      icon: 'UserIcon',
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

const updateUserFields = (options: string[], checked: boolean, data?: _IUser, profile?: _IProfile, type: 'group' | 'single' = 'single') => {
  return [
    {
      id: "email",
      placeholder: "Enter Email",
      label: "Email",
      icon: "AtSymbolIcon",
      type: "email",
      required: true,
      mt: false,
      width: type === "single" && "lg:w-1/2",
      bg: type === "single" ? bodyBg : undefined,
      group: "Basic",
      value: data?.email,
    },
    {
      id: "fullName",
      label: "Full Name",
      placeholder: "Enter Full Name",
      icon: "UserIcon",
      type: "text",
      disabled: false,
      width: type === "single" && "lg:w-1/2",
      bg: type === "single" ? bodyBg : undefined,
      group: "Basic",
      value: data?.profile?.first_name,
    },
    {
      label: "User Type",
      id: "userType",
      type: "select",
      input_type: "select",
      bg: type === "single" ? bodyBg : undefined,
      disabled: false,
      options: options,
      value: data?.userType,
      group: "Basic",
      width: type === "single" && "lg:w-1/2",
    },
    {
      label: "Verified Status",
      id: "isActive",
      type: "radio",
      input_type: "radio",
      disabled: false,
      group: "Basic",
      width: type === "single" && "lg:w-1/2",
      radio: [
        {
          id: "verified",
          checked: checked ?? false,
          bg: type === "single" ? cardsBg : bodyBg,
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
    profile && {
      id: "area",
      placeholder: "Enter Area",
      label: "Area",
      group: "Profile Info",
      icon: "MapPinIcon",
      bg: type === "single" ? bodyBg : undefined,
      disabled: false,
      value: profile.area,
      width: type === "single" && "lg:w-1/2",
    },
    profile && {
      id: "city",
      placeholder: "Enter City",
      label: "City",
      group: "Profile Info",
      icon: "GlobeEuropeAfricaIcon",
      bg: type === "single" ? bodyBg : undefined,
      disabled: false,
      value: profile.city,
      width: type === "single" && "lg:w-1/2",
    },
    profile && {
      id: "state",
      placeholder: "Enter State",
      label: "State",
      group: "Profile Info",
      icon: "GlobeEuropeAfricaIcon",
      bg: type === "single" ? bodyBg : undefined,
      disabled: false,
      value: profile.state,
      width: type === "single" && "lg:w-1/2",
    },
    profile && {
      id: "phone_number",
      placeholder: "Enter Phone Number",
      icon: "PhoneIcon",
      label: "Phone Number",
      group: "Profile Info",
      bg: type === "single" ? bodyBg : undefined,
      disabled: false,
      value: profile.contact_no,
      width: type === "single" && "lg:w-1/2",
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