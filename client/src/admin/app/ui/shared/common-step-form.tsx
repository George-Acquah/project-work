"use client";
import React from "react";
import { useFormState } from "react-dom";
import { cardsBg } from "../themes";
import CommonInput, { GlobalError, InputGroup } from "./common-inputs";
import { FormBtn } from "./buttons";
import { groupFieldConfigs } from "@/utils/functions/forms.functions";
import { addVehicleFields, addVehicleInsuranceFields, addVehicleRegistrationFields } from "@/constants/vehicles.constants";
import { StepperBtns } from "./stepper";
import useCustomSearchParams from "@/hooks/search-params.hook";

export default function StepForms({
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

    const { modalValue } = useCustomSearchParams("FORM_STEP");
    const current = parseInt(modalValue ?? "");

  const resolvedAction = actionType === "add" ? action : action.bind(null, id);

  // Use useFormState hook for form state
  const [state, dispatch] = useFormState(resolvedAction, initialState);

      const fieldsForStep = [
        addVehicleFields("single", []), // Assuming options are empty for demo
        addVehicleInsuranceFields("single"),
        addVehicleRegistrationFields("single"),
      ];

  // Group field configurations
  const groupedFieldConfigs = groupFieldConfigs(fieldsForStep[current]);
  const groupData = data ?? {};

  const label = actionType === "add" ? "Add" : "Update";
  const text = actionType === "add" ? "Adding" : "Updating";

  const steps = [
    "Vehicle Details",
    "Insurance Details",
    "Registration Details",
  ];

  return (
    <form action={dispatch} className={`rounded-md ${cardsBg} p-4 md:p-6`}>
      <div className="">
        {formType === "single" ? (
          <>
            {fieldsForStep[current].map((field) => {
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

      <StepperBtns steps={steps} />
      <GlobalError message={state.message ?? null} />
    </form>
  );
}
