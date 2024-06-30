import Link from "next/link";
import { useFormStatus } from "react-dom";
import { SvgSpinner } from "../icons";
import { textColor } from "../themes";
import { Button } from "@tremor/react";

export function EditBtn({ href, text, label }: _IBtn) {
  const { pending } = useFormStatus();
  return (
    <div className="mt-6 flex items-center justify-end gap-4">
      <Link
        href={href}
        className={`flex h-[2.3rem] items-center rounded  px-4 text-sm font-medium  transition-colors hover:bg-gray-200 dark:hover:bg-gray-700 ${textColor}`}
      >
        Cancel
      </Link>
      <Button
        aria-disabled={pending}
        className="aria-disabled:pointer-events-none rounded aria-disabled:bg-opacity-70 h-[2.05rem]"
        size="sm"
        type="submit"
      >
        {pending ? (
          <div className="flex items-center justify-between capitalize">
            <p className="">{text}...</p>
            <SvgSpinner className="text-white" color="white"/>
          </div>
        ) : (
          `${label}`
        )}
      </Button>
    </div>
  );
}

export function AddBtn({ href, text, label }: _IBtn) {
  const { pending } = useFormStatus();
  return (
    <div className="mt-6 flex items-center justify-end gap-4">
      <Link
        href={href}
        className={`flex h-[2.3rem] items-center rounded  px-4 text-sm font-medium  transition-colors hover:bg-gray-200 dark:hover:bg-gray-700 ${textColor}`}
      >
        Cancel
      </Link>
      <Button
        aria-disabled={pending}
        className="aria-disabled:pointer-events-none rounded aria-disabled:bg-opacity-70 h-[2.05rem]"
        size="sm"
        type="submit"
      >
        {pending ? (
          <div className="flex items-center capitalize">
            <p className="mr-2">{text}...</p>
            <SvgSpinner className="text-white" />
          </div>
        ) : (
          `${label}`
        )}
      </Button>
    </div>
  );
}

export function FormBtn({ href, text, label }: _IBtn) {
  const { pending } = useFormStatus();
  return (
    <div className="mt-6 flex items-center justify-end gap-4">
      <Link
        href={href}
        className={`flex h-[2.3rem] items-center rounded  px-4 text-sm font-medium  transition-colors hover:bg-gray-200 dark:hover:bg-gray-700 ${textColor}`}
      >
        Cancel
      </Link>
      <Button
        aria-disabled={pending}
        className="aria-disabled:pointer-events-none rounded aria-disabled:bg-opacity-70 h-[2.05rem]"
        size="sm"
        type="submit"
      >
        {pending ? (
          <div className="flex items-center justify-between capitalize">
            <p className="">{text}...</p>
            <SvgSpinner className="text-white" color="white" />
          </div>
        ) : (
          `${label}`
        )}
      </Button>
    </div>
  );
}
