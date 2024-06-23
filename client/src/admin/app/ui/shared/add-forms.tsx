"use client";

import React, { useState } from "react";
import { TagIcon } from "@heroicons/react/24/outline";
import { useFormState } from "react-dom";
import { Select, SelectItem } from "@tremor/react";
import { bodyBg, cardsBg, textColor } from "../themes";
import { generateInputClass } from "@/utils/functions/styles.functions";
import CommonInput, { GlobalError, InputErrors, RenderIcons } from "./common-inputs";
import { AddBtn } from "./buttons";
import { addUserFields } from "@/constants/users.constants";

export default function AddForms({
  options,
  addFunction,
  type,
  route,
}: _IAddForm) {
  // const [formData, setFormData] = useState(entityData);
  // const [selectFields, setSelectFields] = useState(selecteds);

  // const handleChange = (key: string, value: any) => {
  //   setFormData((prevData: any) => ({ ...prevData, [key]: value }));
  // };
  // Initial state for form
  const initialState: any = {
    message: null,
    errors: {},
  };
  // Use useFormState hook for form state
  const [state, dispatch] = useFormState(addFunction, initialState);

  return (
    <form action={dispatch} className={`rounded-md ${cardsBg} p-4 md:p-6`}>
      <div className={``}>
        {addUserFields(options).map((field) => (
          <CommonInput
            key={field.id}
            id={field.id}
            placeholder={field.placeholder}
            input_type={field.input_type}
            options={options}
            radio={field.radio}
            width={field.width}
            label={field.label}
            icon={field.icon}
            type={field.type}
            mt={field.mt}
            bg={field.bg}
            errors={state?.type === "error" ? state?.errors : null}
          />
        ))}
      </div>

      <AddBtn href={route} text={`Adding ${type}`} label={`Add ${type}`} />
      <GlobalError message={state.message ?? null} />
    </form>
  );
}
