import {
  editAdminDetails,
  editAdminProfileDetails,
  editAdminContactDetails,
  editAdminOtherDetails,
} from "@/app/lib/constants";
import { SvgSpinner } from "@/app/lib/icons";
import { ExclamationCircleIcon, UserIcon } from "@heroicons/react/24/outline";
import { Title, Text, Button } from "@tremor/react";
import Link from "next/link";
import { useFormStatus } from "react-dom";
import { cardsBg, textColor } from "../themes";
import { inputIcons } from "../users/constants";
import CommonInput from "../shared/common-inputs";

interface _InputWithErrors {
  id: string;
  children: React.ReactNode;
  errors?: any;
}
export const InputWithErrors = ({ errors, id, children }: _InputWithErrors) => {
  return (
    <>
      {children}
      {errors && errors[id] ? (
        <div
          id="customer-error"
          aria-live="polite"
          className="mt-2 text-sm text-red-500 flex space-x-2"
        >
          <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
          {errors[id].map((error: string) => (
            <Text className="text-red-500" key={error}>
              {error}
            </Text>
          ))}
        </div>
      ) : null}
    </>
  );
};

function getValue(admin: _IEditUser, helper: string) {
  const columns = Object.keys(admin);
  let result = "";

  columns.map((column) => {
    if (column === helper) {
      result = admin[column]!;
    }
  });

  return result;
}

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
        className="aria-disabled:pointer-events-none rounded aria-disabled:bg-opacity-70"
        size="xs"
        type="submit"
      >
        {pending ? (
          <div className="flex items-center">
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

export function GlobalError({ message }: { message: any }) {
  return (
    <>
      {message && (
        <div className="mt-2 text-sm text-red-500 flex items-center space-x-2">
          <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
          <Text className="text-red-500">{message}</Text>
        </div>
      )}
    </>
  );
}

export default function CommonDivComp({
  admin,
  title,
  errors,
}: _IEditAdminForm) {
  return (
    <>
      <Title>{title}</Title>
      <div className={`rounded-md ${cardsBg} p-4 md:p-6`}>
        <div className="lg:grid lg:grid-cols-2">
          {title === "User Details"
            ? editAdminDetails.map((detail) => {
                return (
                  <CommonInput
                    key={`${detail.id}__${detail.placeholder}`}
                    id={detail.id}
                    placeholder={detail.placeholder}
                    value={getValue(admin, detail.id)}
                    label={detail.label}
                    icon={detail.icon}
                    type={detail.type}
                    disabled={detail.disabled}
                    errors={errors}
                    tooltip={detail?.tooltip}
                  />
                );
              })
            : title === "Profile Details"
            ? editAdminProfileDetails.map((detail) => {
                return (
                  <CommonInput
                    key={`${detail.id}__${detail.placeholder}`}
                    id={detail.id}
                    placeholder={detail.placeholder}
                    value={getValue(admin, detail.id)}
                    label={detail.label}
                    icon={detail.icon}
                    type={detail.type}
                    disabled={detail.disabled}
                    errors={errors}
                  />
                );
              })
            : title === "Contact Details"
            ? editAdminContactDetails.map((detail) => {
                return (
                  <CommonInput
                    key={`${detail.id}__${detail.placeholder}`}
                    id={detail.id}
                    placeholder={detail.placeholder}
                    value={getValue(admin, detail.id)}
                    label={detail.label}
                    icon={detail.icon}
                    type={detail.type}
                    disabled={detail.disabled}
                    errors={errors}
                  />
                );
              })
            : editAdminOtherDetails.map((detail) => {
                return (
                  <CommonInput
                    key={`${detail.id}__${detail.placeholder}`}
                    id={detail.id}
                    placeholder={detail.placeholder}
                    value={getValue(admin, detail.id)}
                    label={detail.label}
                    icon={detail.icon}
                    type={detail.type}
                    disabled={detail.disabled}
                    errors={null}
                  />
                );
              })}
        </div>
      </div>
    </>
  );
}

export const RenderIcons = ({ helper }: { helper: "user" | "email" }) => {
  const Icon = inputIcons[helper];
  return (
    <Icon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
  );
};
