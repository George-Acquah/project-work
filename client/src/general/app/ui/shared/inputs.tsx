import { ExclamationCircleIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import { Icon, Text } from "@tremor/react";
import { bodyBg, cardsBg, globalBorder, strongTextColor, textColor } from "./themes";

export const inputClass = `peer pl-10 border-stroke dark:shadow-two w-full border text-base outline-none transition-all duration-300 dark:border-transparent dark:bg-[#2C303B] ${globalBorder.focusBorder} dark:focus:shadow-none placeholder:dark:text-body-color-dark`;

interface _ICommonGroupInput<T=any, R=any> {
  data: T;
  reference: R;
  state: any;
  title: string;
}

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
required
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
          className={`px-6 py-3 bg-[#f8f8f8] text-body-color dark:text-body-color-dark rounded-sm ${inputClass} ${bodyBg} ${
            id === "email" ? "mt-[5px]" : ""
          }`}
          type={type}
          disabled={disabled}
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

export function getValue(data: any, helper: string) {
  const columns = Object.keys(data);
  let result = "";

  columns.map((column) => {
    if (column === helper) {
      result = data[column]!;
    }
  });

  return result;
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
        {label}{" "}
        {type === "number" && (
          <span className="text-base text-gray-300">(in minutes)</span>
        )}
      </label>
      <div className="relative">
        <input
          id={id}
          name={id}
          placeholder={placeholder}
          type={type}
          className={`px-6 py-3 bg-[#f8f8f8] text-body-color dark:text-body-color-dark rounded-sm ${inputClass}`}
          required={required}
          minLength={minLenght}
          min={type === "number" ? minLenght : undefined}
        />
        <LinkIcon
          className={`pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 peer-focus:${strongTextColor} ${textColor}`}
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

export function CommonGroupInputs({ data, reference, state, title}: _ICommonGroupInput) {
  return (
    <>
      <h1 className={`mt-8 mb-3 text-lg sm:text-xl `}>{title}</h1>
      <div className={` rounded-md ${cardsBg} p-4 md:p-6`}>
        {data.map((detail: any) => (
          <CommonInputComp
            key={`${detail.id}__${detail.placeholder}`}
            id={detail.id}
            placeholder={detail.placeholder}
            value={reference ? getValue(reference, detail.id) : detail.value}
            label={detail.label}
            icon={detail.icon}
            type={detail.type}
            disabled={detail.disabled}
            errors={state?.errors}
          />
        ))}
      </div>
    </>
  );
}
