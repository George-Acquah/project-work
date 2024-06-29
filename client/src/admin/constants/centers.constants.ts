import { dashboardRoutes } from "@/app/lib/routes";
import { bodyBg } from "@/app/ui/themes";

const a = ["Class A", "Class B", "Class C"];
// Example field configurations for a Parking Center
const updateParkingCenterFields = (
  options: string[],
  checked: boolean,
  data: _IParkingCenter
) => {
  return [
    {
      id: "center_name",
      placeholder: "Enter center name",
      icon: "TagIcon",
      label: "Center Name",
      type: "text",
      value: data.center_name,
      bg: bodyBg,
    },
    {
      id: "description",
      placeholder: "Enter description",
      label: "Description",
      icon: "ChatBubbleBottomCenterIcon",
      type: "text",
      input_type: "textarea",
      value: data.description,
      bg: bodyBg,
    },
    {
      id: "type",
      placeholder: "Select type",
      input_type: "select",
      label: "Type",
      type: "text",
      options: options,
      value: data.type,
      bg: bodyBg,
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
    // Add more fields as needed...
  ] as _IDetail[];
};

const CENTERS_BREADCRUMBS = (id?: string) => {
  return {
    UPDATE_CENTER: [
    {
      label: "Parking Centers",
      href: `${dashboardRoutes.PARKING_LOTS.BASE}`,
    },
    {
      label: "Update Parking Center",
      href: `${dashboardRoutes.PARKING_LOTS.BASE}/${id}/update`,
      active: true,
    },
  ],
}
};

const centersFieldConfigs: _IDetail[] = [
  {
    id: "email",
    placeholder: "Enter name",
    label: "Name",
    type: "text",
    group: "Basic Info",
  },
  {
    id: "description",
    placeholder: "Enter description",
    label: "Description",
    type: "text",
    group: "Basic Info",
  },
  {
    id: "latitude",
    placeholder: "Enter latitude",
    label: "Latitude",
    type: "number",
    group: "Location Info",
  },
  {
    id: "longitude",
    placeholder: "Enter longitude",
    label: "Longitude",
    type: "number",
    group: "Location Info",
  },
  {
    id: "isVerified",
    placeholder: "",
    label: "Is Verified",
    type: "checkbox",
    group: "Other Info",
  },
  // Add more fields as needed
];

export { updateParkingCenterFields, centersFieldConfigs };

export default CENTERS_BREADCRUMBS;