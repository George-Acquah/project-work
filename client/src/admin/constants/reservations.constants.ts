import { dashboardRoutes } from "@/app/lib/routes";
import { bodyBg } from "@/app/ui/themes";

export const RESERVATIONS_BREADCRUMBS = (id?: string) => {
  return {
    VIEW_RESERVATION: [
      {
        label: "Reservations",
        href: `${dashboardRoutes.RESERVATIONS.BASE}`,
      },
      {
        label: "Update Reservation",
        href: `${dashboardRoutes.RESERVATIONS.BASE}/${id}/update`,
        active: true,
      },
    ],
  };
};


export const updateReservationFields = (
  options: string[],
  data?: _IFormattedReservation
) => {
  return [
    {
      id: "center_name",
      placeholder: "Enter center name",
      icon: "TagIcon",
      label: "Center Name",
      type: "text",
      // value: data.center_name,
      bg: bodyBg,
    },
    {
      id: "description",
      placeholder: "Enter description",
      label: "Description",
      icon: "ChatBubbleBottomCenterIcon",
      type: "text",
      input_type: "textarea",
      // value: data.description,
      bg: bodyBg,
    },
    {
      id: "type",
      placeholder: "Select type",
      input_type: "select",
      label: "Type",
      type: "text",
      options: options,
      // value: data.type,
      bg: bodyBg,
    },
    // Add more fields as needed...
  ] as _IDetail[];
};