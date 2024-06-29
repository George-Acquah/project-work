import {
  ExclamationCircleIcon,
  InformationCircleIcon,
  TagIcon,
} from "@heroicons/react/24/outline";
import { Icon, Select, SelectItem, Text } from "@tremor/react";
import { bodyBg, cardsBg, textColor } from "../themes";
import {
  generateInputClass,
  generateSelectClass,
} from "@/utils/functions/styles.functions";
import { inputIcons } from "../users/constants";
import iconMap from "@/constants/form.constants";

interface _InputWithErrors {
  id: string;
  prependComponent?: React.ReactNode;
  errors: Record<string, string[] | undefined>;
}

export const InputErrors = ({
  errors,
  id,
  prependComponent = <ExclamationCircleIcon className="h-5 w-5 text-red-500" />,
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
  title,
  data,
  details,
  errors,
}: CommonDivCompProps<T>): JSX.Element {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className={`rounded-md ${bodyBg} p-4 md:p-6`}>
        <div className="lg:grid lg:grid-cols-2 gap-4 ">
          {details.map((detail) => (
            <CommonInput
              key={`${String(detail.id)}__${detail.placeholder}`}
              id={String(detail.id)}
              placeholder={detail.placeholder}
              value={data[detail.id]}
              label={detail.label}
              icon={detail.icon}
              type={detail.type}
              disabled={detail.disabled}
              errors={errors}
              tooltip={detail?.tooltip}
              input_type={detail.input_type}
              options={detail.options}
              radio={detail.radio}
              width={detail.width}
              mt={detail.mt}
              bg={detail.bg}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CommonInput({
  value,
  id,
  placeholder,
  icon,
  label,
  input_type,
  options,
  radio,
  type,
  disabled,
  errors,
  tooltip,
  width,
  bg,
}: _IDetail) {
  const LinkIcon = icon ? iconMap[icon] : undefined;
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
      {input_type === "select" ? (
        <>
          {options && (
            <Select
              id={id}
              name={id}
              icon={TagIcon}
              aria-describedby={`${id}-error`}
              aria-labelledby={`${id}`}
              defaultValue={value}
              className={`${generateSelectClass(err_bool!!, width, bg)}`}
            >
              {options.map((option) => (
                <SelectItem
                  key={option}
                  className={`${generateSelectClass(err_bool!!, width)}`}
                  value={option}
                >
                  {option}
                </SelectItem>
              ))}
            </Select>
          )}
        </>
      ) : input_type === "radio" ? (
        <>
          {radio && (
            <fieldset className="mb-4 lg:w-1/2 ">
              <div
                className={` border border-gray-200 dark:border-gray-600 px-[14px] py-3 ${cardsBg}`} //TODO
              >
                <div className="flex gap-4">
                  {radio.map((item) => (
                    <div
                      key={`${item.id}-${item.value}`}
                      className="flex items-center"
                    >
                      <input
                        id={item.id}
                        name={id}
                        type="radio"
                        value={item.value}
                        defaultChecked={item.checked}
                        className={`h-4 w-4 border-gray-300 dark:border-gray-600 ${
                          bg ?? cardsBg
                        } text-gray-600 focus:ring-2 focus:ring-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-gray-600`}
                      />
                      <label
                        htmlFor={item.id}
                        className={`ml-2 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ${
                          item.id === "verified" ? textColor : "text-white/90"
                        }  ${
                          item.value === "true"
                            ? `${item.bg ?? cardsBg}`
                            : "bg-red-500"
                        }`}
                      >
                        {item.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </fieldset>
          )}
        </>
      ) : input_type === "textarea" ? (
        <div className={`relative ${width}`}>
          <textarea
            id={id}
            name={id}
            defaultValue={value}
            placeholder={placeholder}
            aria-describedby={`${id}-error`}
            aria-labelledby={`${id}`}
            className={generateInputClass(err_bool!!, bg)}
            autoComplete={"on"}
            disabled={disabled}
            rows={4} // Adjust as needed
          />
          {icon && LinkIcon && (
            <LinkIcon className="pointer-events-none absolute left-3 top-[26px]  h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          )}
        </div>
      ) : (
        <>
          <div className={`relative ${width}`}>
            <input
              id={id}
              name={id}
              defaultValue={value}
              placeholder={placeholder}
              aria-describedby={`${id}-error`}
              aria-labelledby={`${id}`}
              type={type}
              className={generateInputClass(err_bool!!, bg)}
              autoComplete={"on"}
              disabled={disabled}
            />
            {icon && LinkIcon && (
              <LinkIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            )}
          </div>
        </>
      )}

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

export const RenderIcons = ({ helper }: { helper: "user" | "email" }) => {
  const Icon = inputIcons[helper];
  return (
    <Icon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
  );
};
