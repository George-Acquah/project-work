"use client";

import React from "react";
import { useFormState } from "react-dom";
import { cardsBg } from "../themes";
import CommonInput, { GlobalError } from "./common-inputs";
import { AddBtn } from "./buttons";
import { addUserFields } from "@/constants/users.constants";

export default function AddForms({
  options,
  addFunction,
  type,
  route,
}: _IAddForm) {

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
