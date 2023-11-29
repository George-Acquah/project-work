import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { Text } from "@tremor/react";

export default function CommonInputComp({
  value,
  id,
  placeholder,
  icon,
  label,
  type,
  disabled,
  errors,
}: _ICommonInputComp) {
  const LinkIcon = icon;
  return (
    <div className="mb-4 lg:mr-4">
      <label htmlFor={id} className="mb-2 block text-sm font-medium">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          name={id}
          defaultValue={value}
          placeholder={placeholder}
          className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
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
          className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2  placeholder:text-gray-500"
          required={required}
          minLength={minLenght}
        />
        <LinkIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
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
