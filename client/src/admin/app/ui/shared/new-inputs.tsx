// components/InputGroup.tsx

import React from "react";
import { bodyBg, cardsBg } from "../themes";
import CommonInput from "./common-inputs";

// Interface for the component props
interface InputGroupProps<T> {
  title: string;
  data: T;
  details: FieldConfig[];
  errors: Record<string, any>;
}

export function InputGroup<T extends Record<string, any>>({
  title,
  data,
  details,
  errors,
}: InputGroupProps<T>): JSX.Element {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className={`rounded-md ${bodyBg} p-4 md:p-6`}>
        <div className="lg:grid lg:grid-cols-2 gap-4">
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
