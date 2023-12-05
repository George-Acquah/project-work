import { ExclamationCircleIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import { Icon, Text } from "@tremor/react";
import { bodyBg, strongTextColor, textColor } from "./themes";

export const inputClass =
  "peer pl-10 border-stroke dark:shadow-two w-full border text-base outline-none transition-all duration-300 focus:border-custom-primary dark:border-custom-transparent dark:bg-[#2C303B] dark:focus:border-custom-primary dark:focus:shadow-none placeholder:dark:text-custom-body-color-dark";

export default function CommonInputComp({
  value,
  id,
  placeholder,
  icon,
  label,
  type,
  disabled,
  errors,
  tooltip,
}: _ICommonInputComp) {
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

export function LoginInput({
  id,
  placeholder,
  icon,
  label,
  type,
  mt,
  required,
  minLenght,
  errors,
}: _ILoginInputComp) {
  const LinkIcon = icon;
  return (
    <div className={mt ? "mt-4" : ""}>
      <label htmlFor={id} className="mb-3 mt-5 block text-sm font-medium">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          name={id}
          placeholder={placeholder}
          type={type}
          className={`px-6 py-3 bg-[#f8f8f8] text-custom-body-color dark:text-custom-body-color-dark rounded-sm ${inputClass}`}
          required={required}
          minLength={minLenght}
        />
        <LinkIcon
          className={`pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2  peer-focus:${strongTextColor} ${textColor}`}
        />
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
