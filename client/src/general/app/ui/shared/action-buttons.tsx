'use client'
import Link from "next/link";
import Button from "./button";
import { useFormStatus } from "react-dom";
import { SvgSpinner } from "./icons";

interface _IBasicActionButton {
  href: string;
  label: string;
  loading_label: string;
}
interface _ISpecificActionButton extends _IBasicActionButton {
  decider: boolean;
}
export function AddActionButton({ decider, loading_label, label, href }: _ISpecificActionButton) {
  const { pending } = useFormStatus();
  return (
    <div className="mt-6 flex justify-end gap-x-2">
      <Link
        href={href}
        className="flex h-9 items-center rounded bg-gray-10 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:dark:text-white transition-colors dark:hover:bg-gray-50/50 hover:bg-gray-200"
      >
        Cancel
      </Link>
      <Button size="sm" type="submit" aria-disabled={pending}>
        {pending ? (
          <div className="flex items-center">
            <p className="mr-2">{`${loading_label} ${label}`}...</p>
            <SvgSpinner className="text-white" />
          </div>
        ) : (
          `${decider ? `Update ${label}` : `Add ${label}`}`
        )}
      </Button>
    </div>
  );
}

export function ActionButton({
  loading_label,
  label,
  href,
}: _IBasicActionButton) {
  const { pending } = useFormStatus();
  return (
    <div className="mt-6 flex justify-end gap-x-2">
      <Link
        href={href}
        className="flex h-9 items-center rounded bg-gray-10 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:dark:text-white transition-colors dark:hover:bg-gray-50/50 hover:bg-gray-200"
      >
        Cancel
      </Link>
      <Button size="sm" type="submit" aria-disabled={pending}>
        {pending ? (
          <div className="flex items-center">
            <p className="mr-2">{`${loading_label} ${label}`}...</p>
            <SvgSpinner className="text-white" />
          </div>
        ) : (
          `Request ${label}`
        )}
      </Button>
    </div>
  );
}