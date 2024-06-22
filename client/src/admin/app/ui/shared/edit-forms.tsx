"use client";

import React, { useState } from "react";
import { TagIcon } from "@heroicons/react/24/outline";
import { useFormState } from "react-dom";
import { Select, SelectItem } from "@tremor/react";
import { dashboardRoutes } from "@/app/lib/routes";
import { bodyBg, cardsBg, textColor } from "../themes";
import { generateInputClass } from "@/utils/functions/styles.functions";
import { GlobalError, InputErrors, RenderIcons } from "./common-inputs";
import { EditBtn } from "./buttons";

export default function EditForms({
  fields,
  updateEntity,
  entityData,
  id,
  selecteds,
  successMessage = "Updating Info",
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
  const updateApplicantWithId = updateEntity.bind(null, id, selectFields);

  // Use useFormState hook for form state
  const [state, dispatch] = useFormState(updateApplicantWithId, initialState);

  return (
    <form action={dispatch} className={`rounded-md ${cardsBg} p-4 md:p-6`}>
      <div className={``}>
        {fields.map((field) => (
          <div key={field.key} className={`mb-4 lg:w-1/2`}>
            <label
              htmlFor={field.key}
              className="mb-2 block text-sm font-medium"
            >
              {field.label}
            </label>
            {field.type === "select" ? (
              <>
                <Select
                  id={field.key}
                  icon={TagIcon}
                  defaultValue={selectFields}
                  onValueChange={(event) => setSelectFields(event)}
                  className={`transition-all duration-300 object-cover ${bodyBg} text-custom-body-color text-lg dark:text-custom-body-color-dark dark:hover:bg-[#2C303B]/20`}
                >
                  {field.options?.map((option) => (
                    <SelectItem
                      key={option}
                      className={`cursor-pointer dark:shadow-two text-base outline-none transition-all duration-300 bg-white/80 hover:bg-white ${bodyBg} text-custom-body-color dark:text-custom-body-color-dark dark:hover:bg-[#2C303B] focus:outline-none  border-gray-600  dark:border-gray-600`}
                      value={option}
                    >
                      {option}
                    </SelectItem>
                  ))}
                </Select>
                <InputErrors id={field.key} errors={state.errors ?? null} />
              </>
            ) : field.type === "radio" ? (
              <>
                <fieldset className="mb-4 lg:w-1/2 ">
                  <div
                    className={` border border-gray-200 dark:border-gray-600 px-[14px] py-3 ${bodyBg}`}
                  >
                    <div className="flex gap-4">
                      {field.radio?.map((item) => (
                        <div
                          key={`${item.id}-${item.value}`}
                          className="flex items-center"
                        >
                          <input
                            id={item.id}
                            name={field.key}
                            type="radio"
                            value={item.value}
                            defaultChecked={item.checked}
                            className={`h-4 w-4 border-gray-300 dark:border-gray-600 ${cardsBg} text-gray-600 focus:ring-2 focus:ring-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-gray-600`}
                          />
                          <label
                            htmlFor={item.id}
                            className={`ml-2 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ${
                              item.id === "verified"
                                ? textColor
                                : "text-white/90"
                            }  ${
                              item.value === "true"
                                ? `${cardsBg}`
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
                <InputErrors id={field.key} errors={state.errors ?? null} />
              </>
            ) : (
              <>
                <div className="relative">
                  <input
                    id={field.key}
                    name={field.key}
                    type="text"
                    value={formData[field.key]}
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                    className={`px-6 py-3 bg-[#f8f8f8] text-custom-body-color dark:text-custom-body-color-dark rounded-sm ${generateInputClass(
                      false
                    )} ${bodyBg}`}
                    disabled={field.disabled}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                  />
                  <RenderIcons helper={field.icon} />
                </div>
                {/* <InputErrors id={field.key} errors={null} /> */}
              </>
            )}
          </div>
        ))}
      </div>

      <EditBtn
        href={dashboardRoutes.USERS.CUSTOMERS.BASE}
        text="Updating Info"
        label="Edit Customer"
      />
      <GlobalError message={state.message ?? null} />
    </form>
  );
}
