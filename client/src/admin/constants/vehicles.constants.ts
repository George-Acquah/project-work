import { dashboardRoutes } from "@/app/lib/routes";
import { bodyBg } from "@/app/ui/themes";


export const addVehicleFields = (
  type: "single" | "group",
  options: string[]
) => {
  return [
    {
      id: "make",
      placeholder: "Enter Make",
      label: "Make",
      icon: "BuildingStorefrontIcon", // Assuming you have an icon like this
      type: "text",
      required: true,
      width: type === "single" && "lg:w-1/2",
      bg: type === "single" ? bodyBg : undefined,
      group: "Basic Details",
    },
    {
      id: "model",
      placeholder: "Enter Model",
      label: "Model",
      icon: "CarIcon", // Assuming you have an icon like this
      type: "text",
      required: true,
      width: type === "single" && "lg:w-1/2",
      bg: type === "single" ? bodyBg : undefined,
      group: "Basic Details",
    },
    {
      id: "year",
      placeholder: "Enter Year",
      label: "Year",
      icon: "CalendarIcon", // Assuming you have an icon like this
      type: "number",
      required: true,
      width: type === "single" && "lg:w-1/2",
      bg: type === "single" ? bodyBg : undefined,
      group: "Specifications",
    },
    {
      id: "vin",
      placeholder: "Enter VIN",
      label: "VIN",
      icon: "KeyIcon", // Assuming you have an icon like this
      type: "text",
      required: true,
      width: type === "single" && "lg:w-1/2",
      bg: type === "single" ? bodyBg : undefined,
      group: "Specifications",
    },
    {
      id: "color",
      placeholder: "Enter Color",
      label: "Color",
      icon: "PaletteIcon", // Assuming you have an icon like this
      type: "text",
      required: false,
      width: type === "single" && "lg:w-1/2",
      bg: type === "single" ? bodyBg : undefined,
      group: "Appearance",
    },
    {
      id: "type",
      placeholder: "Enter Vehicle Type",
      label: "Vehicle Type",
      icon: "TruckIcon", // Assuming you have an icon like this
      type: "text",
      required: false,
      width: type === "single" && "lg:w-1/2",
      bg: type === "single" ? bodyBg : undefined,
      group: "Specifications",
    },
    {
      label: "Active Status",
      id: "isActive",
      type: "radio",
      input_type: "radio",
      disabled: false,
      width: type === "single" && "lg:w-1/2",
      radio: [
        {
          id: "active",
          checked: true,
          value: "true",
          label: "Active",
        },
        {
          id: "inactive",
          checked: false,
          value: "false",
          label: "Inactive",
        },
      ],
      group: "Status",
    },
    {
      label: "Owner",
      id: "owner",
      type: "select",
      input_type: "select",
      disabled: false,
      options: options, // Options for the select field
      width: type === "single" && "lg:w-1/2",
      bg: type === "single" ? bodyBg : undefined,
      group: "Associations",
    },
  ] as _IDetail[];
};

export const addVehicleInsuranceFields = (type: "single" | "group") => {
  return [
    {
      id: "policyNumber",
      placeholder: "Enter Policy Number",
      label: "Policy Number",
      icon: "DocumentTextIcon",
      type: "text",
      width: type === "single" && "lg:w-1/2",
      bg: type === "single" ? bodyBg : undefined,
      group: "Insurance",
    },
    {
      id: "insurer",
      placeholder: "Enter Insurer Name",
      label: "Insurer",
      icon: "BuildingOfficeIcon",
      type: "text",
      width: type === "single" && "lg:w-1/2",
      bg: type === "single" ? bodyBg : undefined,
      group: "Insurance",
    },
    {
      id: "startDate",
      placeholder: "Select Start Date",
      label: "Start Date",
      icon: "CalendarIcon",
      type: "date",
      width: type === "single" && "lg:w-1/2",
      bg: type === "single" ? bodyBg : undefined,
      group: "Insurance",
    },
    {
      id: "endDate",
      placeholder: "Select End Date",
      label: "End Date",
      icon: "CalendarIcon",
      type: "date",
      required: true,
      width: type === "single" && "lg:w-1/2",
      bg: type === "single" ? bodyBg : undefined,
      group: "Insurance",
    },
    {
      id: "premiumAmount",
      placeholder: "Enter Premium Amount",
      label: "Premium Amount",
      icon: "CurrencyDollarIcon",
      type: "number",
      width: type === "single" && "lg:w-1/2",
      bg: type === "single" ? bodyBg : undefined,
      group: "Insurance",
    },
  ] as _IDetail[];
};

export const addVehicleRegistrationFields = (type: "single" | "group") => {
  return [
    {
      id: "registrationNumber",
      placeholder: "Enter Registration Number",
      label: "Registration Number",
      icon: "IdentificationIcon",
      type: "text",
      width: type === "single" && "lg:w-1/2",
      bg: type === "single" ? bodyBg : undefined,
      group: "Registration",
    },
    {
      id: "registrationDate",
      placeholder: "Select Registration Date",
      label: "Registration Date",
      icon: "CalendarIcon",
      type: "date",
      width: type === "single" && "lg:w-1/2",
      bg: type === "single" ? bodyBg : undefined,
      group: "Registration",
    },
    {
      id: "expiryDate",
      placeholder: "Select Expiry Date",
      label: "Expiry Date",
      icon: "CalendarIcon",
      type: "date",
      width: type === "single" && "lg:w-1/2",
      bg: type === "single" ? bodyBg : undefined,
      group: "Registration",
    },
  ] as _IDetail[];
};


export const VEHICLES_BREADCRUMBS = (id?: string) => {
  return {
    ADD: [
      {
        label: "Vehicles",
        href: `${dashboardRoutes.VEHICLES.BASE}`,
      },
      {
        label: "Add Vehicle",
        href: `${dashboardRoutes.VEHICLES.ADD}`,
        active: true,
      },
    ],
    UPDATE: [
      {
        label: "Vehicles",
        href: `${dashboardRoutes.VEHICLES.BASE}`,
      },
      {
        label: "Update Vehicle",
        href: `${dashboardRoutes.VEHICLES.BASE}/${id}/update`,
        active: true,
      },
    ],
  };
};