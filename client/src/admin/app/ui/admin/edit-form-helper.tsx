
import { editAdminDetails, editAdminProfileDetails, editAdminContactDetails, editAdminOtherDetails } from "@/app/lib/constants";
import { SvgSpinner } from "@/app/lib/icons";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { Title, Text, Button } from "@tremor/react";
import Link from "next/link";
import { useFormStatus } from "react-dom";
import CommonInputComp from "../inputs";

interface IEditAdminForm {
  admin: _IEditUser;
  title?: string;
  errors?: any;
}
interface IBtn {
  href: string;
  text: string;
  label: string;
}

function getValue(
  applicant: _IEditUser,
  helper: string
) {
  const columns = Object.keys(applicant);
  let result = "";

  columns.map((column) => {
    if (column === helper) {
      result = applicant[column]!;
    }
  });

  return result;
}

export function EditBtn({ href, text, label }: IBtn) {
  const { pending } = useFormStatus();
  return (
    <div className="mt-6 flex items-center justify-end gap-4">
      <Link
        href={href}
        className="flex h-[2.3rem] items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
      >
        Cancel
      </Link>
      <Button
        aria-disabled={pending}
        className="aria-disabled:pointer-events-none aria-disabled:bg-opacity-70"
        size="xs"
        type="submit"
      >
        {pending ? (
          <div className="flex items-center">
            <p className="mr-2">{text}...</p>
            <SvgSpinner className="text-white"/>
          </div>
        ) : (
          `${label}`
        )}
      </Button>
    </div>
  );
}

export function GlobalError({ message }: { message: any}) {
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

export default function CommonDivComp({ admin, title, errors }: IEditAdminForm) {
  return (
    <>
      <Title>{title}</Title>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="lg:grid lg:grid-cols-2 ">
          {title === "User Details"
            ? editAdminDetails.map((detail) => {
                return (
                  <CommonInputComp
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
            : title === "Profile Details"
            ? editAdminProfileDetails.map((detail) => {
                return (
                  <CommonInputComp
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
                  <CommonInputComp
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
                  <CommonInputComp
                    key={`${detail.id}__${detail.placeholder}`}
                    id={detail.id}
                    placeholder={detail.placeholder}
                    value={getValue(admin, detail.id)}
                    label={detail.label}
                    icon={detail.icon}
                    type={detail.type}
                    disabled={detail.disabled}
                  />
                );
              })}
        </div>
      </div>
    </>
  );
}
