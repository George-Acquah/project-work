import { FC } from "react";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Badge } from "@tremor/react";

// Define a type for the valid status values
export type _IStatus = "verified" | "not verified" | "available" | "not available";

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
    className: "bg-green-500 text-white",
  },
  "not verified": {
    text: "Unverified",
    icon: XMarkIcon,
    className: "bg-red-500 text-neutral-100",
  },
  available: {
    text: "Available",
    icon: CheckIcon,
    className: "bg-green-500 text-white",
  },
  "not available": {
    text: "Unavailable",
    icon: XMarkIcon,
    className: "bg-red-500 text-neutral-100",
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
      className={`rounded-lg ${statusInfo.className}`}
      icon={statusInfo.icon}
    >
      {statusInfo.text}
    </Badge>
  );
};

export default StatusBadge;
