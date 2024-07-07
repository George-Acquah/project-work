// "use client";
// import React from "react";
// import { useFormState } from "react-dom";
// import { cardsBg } from "../themes";
// import CommonInput, { GlobalError, InputGroup } from "./common-inputs";
// import { groupFieldConfigs } from "@/utils/functions/forms.functions";
// import { addVehicleFields, addVehicleInsuranceFields, addVehicleRegistrationFields } from "@/constants/vehicles.constants";
// import { StepperBtns } from "./stepper";
// import useCustomSearchParams from "@/hooks/search-params.hook";

// export default function StepForms({
//   id, // Resource ID (used for update)
//   type, // Type of resource (e.g., "User")
//   action, // Function to handle form submission
//   actionType = "add", // Type of action ("add" or "update")
//   formType, // Form type ("single" or "grouped")
//   route, // Route to navigate after form submission
//   fieldConfigs, // Configuration for form fields
//   data, // Initial form data (used for update)
// }: _IForms) {
//   // Initial state for form
//   const initialState: any = {
//     message: null,
//     errors: {},
//   };

//     const { modalValue } = useCustomSearchParams("FORM_STEP");
//     const current = parseInt(modalValue ?? "");

//   const resolvedAction = actionType === "add" ? action : action.bind(null, id);

//   // Use useFormState hook for form state
//   const [state, dispatch] = useFormState(resolvedAction, initialState);

//       const fieldsForStep = [
//         addVehicleFields("single", []), // Assuming options are empty for demo
//         addVehicleInsuranceFields("single"),
//         addVehicleRegistrationFields("single"),
//       ];

//   // Group field configurations
//   const groupedFieldConfigs = groupFieldConfigs(fieldsForStep[current]);
//   const groupData = data ?? {};

//   const label = actionType === "add" ? "Add" : "Update";
//   const text = actionType === "add" ? "Adding" : "Updating";

//   const steps = [
//     "Vehicle Details",
//     "Insurance Details",
//     "Registration Details",
//   ];

//   return (
//     <form action={dispatch} className={`rounded-md ${cardsBg} p-4 md:p-6`}>
//       <div className="">
//         {formType === "single" ? (
//           <>
//             {fieldsForStep[current].map((field) => {
//               return (
//                 <CommonInput
//                   key={field.id}
//                   {...field} // Spread the field properties
//                   errors={state?.type === "error" ? state?.errors : null}
//                 />
//               );
//             })}
//           </>
//         ) : (
//           <>
//             {Object.entries(groupedFieldConfigs).map(([group, fields]) => (
//               <InputGroup
//                 key={group}
//                 title={group.charAt(0).toUpperCase() + group.slice(1)} // Capitalize group name
//                 data={groupData}
//                 details={fields}
//                 errors={state?.type === "error" ? state?.errors : null}
//               />
//             ))}
//           </>
//         )}
//       </div>

//       <StepperBtns steps={steps} />
//       <GlobalError message={state.message ?? null} />
//     </form>
//   );
// }
"use client";
import React, { useState } from "react";
import { useFormState } from "react-dom";
import { cardsBg } from "../themes";
import CommonInput, { GlobalError, InputGroup } from "./common-inputs";
import {
  addVehicleFields,
  addVehicleInsuranceFields,
  addVehicleRegistrationFields,
} from "@/constants/vehicles.constants";
import { StepperBtns } from "./stepper";
import useCustomSearchParams from "@/hooks/search-params.hook";
import { groupFieldConfigs } from "@/utils/functions/forms.functions";

type FormDataType = {
  vehicle: Record<string, any>;
  insurance: Record<string, any>;
  registration: Record<string, any>;
};

type FormStep = "vehicle" | "insurance" | "registration";

export default function StepForms({
  id,
  type,
  action,
  actionType = "add",
  formType,
  route,
  fieldConfigs,
  data,
}: _IForms) {
  const initialState: any = {
    message: null,
    errors: {},
  };

  const { modalValue } = useCustomSearchParams("FORM_STEP");
  const current = parseInt(modalValue ?? "") || 0;

  const resolvedAction = actionType === "add" ? action : action.bind(null, id);
  const [state, dispatch] = useFormState(resolvedAction, initialState);

  // Form data for all steps
  const [formData, setFormData] = useState<FormDataType>({
    vehicle: {},
    insurance: {},
    registration: {},
  });

  console.log(formData);

  const steps = [
    "Vehicle Details",
    "Insurance Details",
    "Registration Details",
  ];
  const stepKeys: FormStep[] = ["vehicle", "insurance", "registration"];

  const fieldsForStep = [
    addVehicleFields("single", []),
    addVehicleInsuranceFields("single"),
    addVehicleRegistrationFields("single"),
  ];

  // Handle field changes correctly
  const handleFieldChange = (
    stepKey: FormStep,
    fieldId: string,
    value: any
  ) => {
    console.log(stepKey)
    console.log(fieldId)
    console.log(value);
    setFormData((prevData) => ({
      ...prevData,
      [stepKey]: {
        ...prevData[stepKey],
        [fieldId]: value,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Consolidate all data for submission
    const allData = {
      ...formData.vehicle,
      ...formData.insurance,
      ...formData.registration,
    };

    console.log(allData);
    // await dispatch(allData); // Dispatch all data to the action
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`rounded-md ${cardsBg} p-4 md:p-6`}
    >
      <div className="">
        {formType === "single" ? (
          <>
            {fieldsForStep[current].map((field) => (
              <CommonInput
                key={field.id}
                {...field}
                value={formData[stepKeys[current]][field.id] || ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleFieldChange(stepKeys[current], 'field.id', e.target.value)
                }
                errors={state?.type === "error" ? state?.errors : null}
              />
            ))}
          </>
        ) : (
          <>
            {Object.entries(groupFieldConfigs(fieldsForStep[current])).map(
              ([group, fields]) => (
                <InputGroup
                  key={group}
                  title={group.charAt(0).toUpperCase() + group.slice(1)}
                  data={formData[stepKeys[current]]}
                  details={fields}
                  errors={state?.type === "error" ? state?.errors : null}
                  onChange={(fieldId: string, value: any) =>
                    handleFieldChange(stepKeys[current], fieldId, value)
                  }
                />
              )
            )}
          </>
        )}
      </div>

      <StepperBtns steps={steps} />
      <GlobalError message={state.message ?? null} />
    </form>
  );
}