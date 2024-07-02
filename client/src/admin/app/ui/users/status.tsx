import { FC } from "react";
import { CheckIcon } from "@heroicons/react/24/solid";
import { Badge } from "@tremor/react";

// Define a type for the valid status values
export type _IStatus =
  | "verified"
  | "not verified"
  | "available"
  | "not available"
  | "insured"
  | "not insured"
  | "has reservation"
  | "no reservation";

// Define the structure of each status object in the status map
interface StatusInfo {
  text: string;
  icon: any; // Heroicons components are functional components
  className: string;
}

// Create a map for the statuses and their corresponding attributes
const statusMap: Record<_IStatus, StatusInfo> = {
  verified: {
    text: "Verified",
    icon: CheckIcon,
    className: "bg-green-500 ",
  },
  "not verified": {
    text: "Unverified",
    icon: undefined,
    className: "bg-red-500 border-red-600 ",
  },
  available: {
    text: "Available",
    icon: CheckIcon,
    className: "bg-green-500 ",
  },
  "not available": {
    text: "Unavailable",
    icon: undefined,
    className: "bg-red-500 border-red-600",
  },
  insured: {
    text: "Insured",
    icon: CheckIcon,
    className: "bg-green-500 ",
  },
  "not insured": {
    text: "Not Insured",
    icon: undefined,
    className: "bg-red-500 border-red-600",
  },
  "has reservation": {
    text: "Has Reservation",
    icon: CheckIcon,
    className: "bg-green-500 ",
  },
  "no reservation": {
    text: "No Reservation",
    icon: undefined,
    className: "bg-red-500 border-red-600",
  },
};

// Define the props type for the StatusBadge component
interface StatusBadgeProps {
  status: _IStatus;
}

const StatusBadge: FC<StatusBadgeProps> = ({ status }) => {
  const statusInfo = statusMap[status];

  if (!statusInfo) return null; // Render nothing if the status is not in the map

  return (
    <Badge
      className={`rounded px-2 py-1 outline-none text-white ${statusInfo.className}`}
      icon={statusInfo.icon}
    >
      {statusInfo.text}
    </Badge>
  );
};

export default StatusBadge;
