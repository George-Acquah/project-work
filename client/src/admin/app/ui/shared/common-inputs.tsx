import { ExclamationCircleIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import { Icon, Text } from "@tremor/react";
import { cardsBg } from "../themes";
import { getValue } from "@/utils/functions/forms.functions";
import { generateInputClass } from "@/utils/functions/styles.functions";

interface _InputWithErrors {
  id: string;
  prependComponent: React.ReactNode;
  errors: Record<string, string[] | undefined>;
}
const InputErrors = ({
  errors,
  id,
  prependComponent,
}: _InputWithErrors) => {
  return (
    <>
      {errors && errors[id] ? (
        <div id={`${id}-error`} className="mt-2 text-sm text-red-500">
          {errors[id]?.map((error: string) => (
            <div className="flex space-x-2" key={error}>
              {prependComponent}
              <Text className="text-red-500">{error}</Text>
            </div>
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
  errors,
  tooltip,
}: _IDetail) {
  const LinkIcon = icon;
  const err_bool = errors && (errors[id]!! as unknown as boolean);
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
          aria-describedby={`${id}-error`}
          aria-labelledby={`${id}`}
          type={type}
          className={generateInputClass(err_bool!!)}
          autoComplete={"on"}
          disabled={disabled}
        />
        <LinkIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
      </div>
      {errors && (
        <InputErrors
          id={id}
          errors={errors}
          prependComponent={
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
          }
        />
      )}
    </div>
  );
}
