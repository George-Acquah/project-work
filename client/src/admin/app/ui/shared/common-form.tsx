// pages/index.tsx or wherever you need the EditForms component
"use client";
import React from "react";
import { useFormState } from "react-dom";
import { cardsBg } from "../themes";
import CommonInput, { GlobalError, InputGroup } from "./common-inputs";
import { FormBtn } from "./buttons";
import { groupFieldConfigs } from "@/utils/functions/forms.functions";

export default function Forms({
  id, // Resource ID (used for update)
  type, // Type of resource (e.g., "User")
  action, // Function to handle form submission
  actionType = "add", // Type of action ("add" or "update")
  formType, // Form type ("single" or "grouped")
  route, // Route to navigate after form submission
  fieldConfigs, // Configuration for form fields
  data, // Initial form data (used for update)
}: _IForms) {
  // Initial state for form
  const initialState: any = {
    message: null,
    errors: {},
  };

  const resolvedAction = actionType === "add" ? action : action.bind(null, id);

  // Use useFormState hook for form state
  const [state, dispatch] = useFormState(resolvedAction, initialState);

  // Group field configurations
  const groupedFieldConfigs = groupFieldConfigs(fieldConfigs);
  const groupData = data ?? {};

  const label = actionType === "add" ? "Add" : "Update";
  const text = actionType === "add" ? "Adding" : "Updating";

  return (
    <form action={dispatch} className={`rounded-md ${cardsBg} p-4 md:p-6`}>
      <div className="">
        {formType === "single" ? (
          <>
            {fieldConfigs.map((field) => {
              return (
                <CommonInput
                  key={field.id}
                  {...field} // Spread the field properties
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

      <FormBtn
        href={route}
        text={`${text} ${type}`}
        label={`${label} ${type}`}
      />
      <GlobalError message={state.message ?? null} />
    </form>
  );
}
