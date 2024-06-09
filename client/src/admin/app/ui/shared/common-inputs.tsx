import { ExclamationCircleIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import { Icon, Text } from "@tremor/react";
import { bodyBg, cardsBg } from "../themes";
import { getValue } from "@/utils/functions/forms.functions";

export const inputClass =
  "peer pl-10 border-stroke dark:shadow-two w-full border text-base outline-none transition-all duration-300 focus:border-custom-primary dark:border-custom-transparent dark:bg-[#2C303B] dark:focus:border-custom-primary dark:focus:shadow-none placeholder:dark:text-custom-body-color-dark";

interface _InputWithErrors {
  id: string;
  prependComponent: React.ReactNode;
  errors?: any;
}
export const InputWithErrors = ({
  errors,
  id,
  prependComponent,
}: _InputWithErrors) => {
  return (
    <>
      {prependComponent}
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

export function InputGroup<T extends Record<string, any>>({
  data,
  title,
  details,
  errors,
}: CommonDivCompProps<T>): JSX.Element {
  return (
    <>
      <h2>{title}</h2>
      <div className={`rounded-md ${cardsBg} p-4 md:p-6`}>
        <div className="lg:grid lg:grid-cols-2">
          {details.map((detail) => (
            <CommonInput
              key={`${String(detail.id)}__${detail.placeholder}`}
              id={String(detail.id)}
              placeholder={detail.placeholder}
              value={getValue<T>(data, detail.id)}
              label={detail.label}
              icon={detail.icon}
              type={detail.type}
              disabled={detail.disabled}
              errors={errors}
              tooltip={detail?.tooltip}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default function CommonInput({
  value,
  id,
  placeholder,
  icon,
  label,
  type,
  disabled,
  required,
  minLenght,
  errors,
  tooltip,
}: _IDetail) {
  const LinkIcon = icon;
  return (
    <div className="mb-4 lg:mr-4">
      <label
        htmlFor={id}
        className={`mb-2 text-sm font-medium ${
          tooltip ? "flex items-center" : "block"
        } ${id === "email" ? "mt-1" : ""} `}
      >
        {label}
        {tooltip && (
          <Icon
            icon={InformationCircleIcon}
            variant="simple"
            tooltip={`Your ${label.toLowerCase()} is auto generated`}
            className="bg-transparent"
          />
        )}
      </label>
      <div className="relative">
        <input
          id={id}
          name={id}
          defaultValue={value}
          placeholder={placeholder}
          className={`px-6 py-3 bg-[#f8f8f8] text-custom-body-color dark:text-custom-body-color-dark rounded-sm ${inputClass} ${bodyBg} ${
            id === "email" ? "mt-[5px]" : ""
          }`}
          type={type}
          disabled={disabled}
          minLength={minLenght}
          required={required}
        />
        <LinkIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
      </div>
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
    </div>
  );
}
