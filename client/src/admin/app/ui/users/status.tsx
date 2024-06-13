import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Badge } from "@tremor/react";

export default function UserStatus({ status, entity }: { status: string, entity: string }) {
  return (
    <span>
      {status === "verified" ? (
        <Badge className="bg-green-500 text-white rounded-lg" icon={CheckIcon}>
          Verified
        </Badge>
      ) : status === "available" ? (
        <Badge className="bg-green-500 text-white  rounded-lg" icon={CheckIcon}>
          Available
        </Badge>
      ) : null}
      {status === "not verified" ? (
        <Badge
          className="bg-red-500 text-neutral-100 -ml-3  rounded-lg"
          icon={XMarkIcon}
        >
          Unverified
        </Badge>
      ) : status === "not available" ? (
        <Badge
          className="bg-red-500 text-neutral-100 -ml-3  rounded-lg"
          icon={XMarkIcon}
        >
          Unavailable
        </Badge>
      ) : null}
    </span>
  );
}
