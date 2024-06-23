"use client";

import React, { useState } from "react";
import { useFormState } from "react-dom";
import { cardsBg } from "../themes";
import CommonInput, { GlobalError } from "./common-inputs";
import { EditBtn } from "./buttons";
import { updateUserFields } from "@/constants/users.constants";

export default function EditForms({
  id,
  options,
  updateFunction,
  isVerified,
  type,
  entityData,
  route,
  selecteds,
}: _IEditApplicantForm) {
  const [formData, setFormData] = useState(entityData);
  const [selectFields, setSelectFields] = useState(selecteds);

  const handleChange = (key: string, value: any) => {
    setFormData((prevData: any) => ({ ...prevData, [key]: value }));
  };

  // Initial state for form
  const initialState: any = {
    message: null,
    errors: {},
  };
  // Function to update applicant with its ID
  const updateApplicantWithId = updateFunction.bind(null, id, selectFields);

  // Use useFormState hook for form state
  const [state, dispatch] = useFormState(updateApplicantWithId, initialState);

  return (
    <form action={dispatch} className={`rounded-md ${cardsBg} p-4 md:p-6`}>
      <div className={``}>
        {updateUserFields(options ?? [ ], isVerified, {
          email: entityData.email,
          fullname: entityData?.fullName,
        }).map((field) => (
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
            value={field.value}
            errors={state?.type === "error" ? state?.errors : null}
          />
        ))}
      </div>

      <EditBtn href={route} text={`Updating ${type}`} label={`Update ${type}`} />
      <GlobalError message={state.message ?? null} />
    </form>
  );
}
