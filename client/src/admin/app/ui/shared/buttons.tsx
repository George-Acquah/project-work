'use client'

import Link from "next/link";
import { useFormStatus } from "react-dom";
import { SvgSpinner } from "./icons";
import { textColor } from "../themes";
import { Button } from "@tremor/react";
import { TrashIcon } from "@heroicons/react/24/outline";

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
            <SvgSpinner className="text-white" color="white" />
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

export function DeleteClientBtn({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      aria-disabled={pending}
      className="aria-disabled:pointer-events-none aria-disabled:bg-opacity-70 bg-red-500 rounded-md border border-red-500 p-2 hover:bg-red-600"
      type="submit"
    >
      {pending ? (
        <div className="flex items-center">
          <SvgSpinner className=" text-white w-4 h-4" fill="white" />
        </div>
      ) : (
        <>
          <span className="sr-only">{label}</span>
          <TrashIcon className="w-4 fill-white" />
        </>
      )}
    </button>
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

export function StepBtn({ onClick, type, href, text}: _IStepBtn) {
  const { pending } = useFormStatus();
  return (
    <div className="mt-6 transition-all duration-300">
      {type === "cancel" && href ? (
        <Link
          href={href}
          className={`flex h-[2.3rem] items-center rounded capitalize px-4 text-sm font-medium  transition-colors hover:bg-gray-200 dark:hover:bg-gray-700 ${textColor}`}
        >
          {type}
        </Link>
      ) : (
        <Button
          aria-disabled={pending}
          className="aria-disabled:pointer-events-none rounded capitalize aria-disabled:bg-opacity-70 h-[2.05rem]"
          size="sm"
          color={type === 'submit' ? 'green' : type === 'back' ? 'gray' : 'blue'}
          type={type === 'submit' ? 'submit' : 'button'}
          onClick={ type === 'submit' ? undefined : onClick}
        >
          {pending ? (
            <div className="flex items-center justify-between capitalize">
              <p className="">{text}...</p>
              <SvgSpinner className="text-white" color="white" />
            </div>
          ) : (
            `${type}`
          )}
        </Button>
      )}
    </div>
  );
}
