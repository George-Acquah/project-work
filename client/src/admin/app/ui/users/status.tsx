import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Badge } from "@tremor/react";

export default function ApplicantStatus({ status }: { status: string }) {
  console.log(status);
  return (
    <span
    >
      {status === "active" ? (
        <Badge className="bg-green-500 text-white" icon={CheckIcon}>
          Active
        </Badge>
      ) : null}
      {status === "not active" ? (
        <Badge className="bg-gray-100 text-gray-500 -ml-3" icon={XMarkIcon}>
          Not Active
        </Badge>
      ) : null}
    </span>
  );
}
