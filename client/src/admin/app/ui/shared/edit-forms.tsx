// pages/index.tsx or wherever you need the EditForms component
"use client";
import React from "react";
import { useFormState } from "react-dom";
import { cardsBg } from "../themes";
import CommonInput, { GlobalError, InputGroup } from "./common-inputs";
import { EditBtn } from "./buttons";
import { groupFieldConfigs } from "@/utils/functions/forms.functions";

export default function EditForms({
  id,
  type,
  updateFunction,
  formType,
  route,
  fieldConfigs,
  data,
}: EditFormsProps) {
  // Initial state for form
  const initialState: any = {
    message: null,
    errors: {},
  };

  // Function to update the entity with its ID
  const updateEntityWithId = updateFunction.bind(null, id);

  // Use useFormState hook for form state
  const [state, dispatch] = useFormState(updateEntityWithId, initialState);

  // Group field configurations
  const groupedFieldConfigs = groupFieldConfigs(fieldConfigs);
  const groupData = data ?? {};

  return (
    <form action={dispatch} className={`rounded-md ${cardsBg} p-4 md:p-6`}>
      <div className="">
        {formType === "single" ? (
          <>
            {fieldConfigs.map((field) => {
              return (
                <CommonInput
                  key={field.id}
                  id={field.id}
                  placeholder={field.placeholder}
                  input_type={field.input_type}
                  options={field.options}
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
              );
            })}
          </>
        ) : (
          <>
            {Object.entries(groupedFieldConfigs).map(([group, fields]) => (
              <InputGroup
                key={group}
                title={group.charAt(0).toUpperCase() + group.slice(1)} // Capitalize group name
                data={groupData}
                details={fields}
                errors={state?.type === "error" ? state?.errors : null}
              />
            ))}
          </>
        )}
      </div>

      <EditBtn
        href={route}
        text={`Updating ${type}`}
        label={`Update ${type}`}
      />
      <GlobalError message={state.message ?? null} />
    </form>
  );
}
