"use client";
import { Fragment } from "react";
import { HR } from "@/app/auth/layout";
import useCustomSearchParams from "@/hooks/search-params.hook";
import { CheckIcon } from "@heroicons/react/24/solid";
import { StepBtn } from "./buttons";

export const StepperBtns = ({ steps }: { steps: string[] }) => {
  const { handleSetParams, modalValue } = useCustomSearchParams("FORM_STEP");
  const current = parseInt(modalValue ?? "");

  const handleNext = () => {
    if (current < steps.length - 1) {
      handleSetParams(true, (current + 1).toString());
    }
  };

  const handleBack = () => {
    if (current > 0) {
      handleSetParams(true, (current - 1).toString());
    }
  };

  return (
    <div className="transition-all duration-300 flex justify-end items-center space-x-4  p-4">
      <StepBtn
        href={current === 0 ? "g" : undefined}
        type={current === 0 ? "cancel" : "back"}
        onClick={current === 0 ? undefined : handleBack}
      />
      <StepBtn
        type={current === steps.length - 1 ? "submit" : "next"}
        onClick={current === steps.length - 1 ? undefined : handleNext}
        text={current === steps.length - 1 ? "Sending" : undefined}
      />
    </div>
  );
};

const Stepper = ({ steps }: { steps: string[] }) => {
  const { modalValue } = useCustomSearchParams("FORM_STEP");
  const current = parseInt(modalValue ?? "");

  const renderStepIcons = () => (
    <div className="flex justify-around items-center px-1 py-4">
      {steps.map((step, index) => (
        <Fragment key={index}>
          <div
            className={`w-6 h-6 p-1 rounded-full flex items-center justify-center transition-all duration-300 ${
              current === index
                ? "bg-blue-500 text-white "
                : "border-2 border-blue-700 dark:border-blue-500"
            }`}
          >
            {current > index ? (
              <CheckIcon className="w-6 h-6 text-gray-900 dark:text-white font-extrabold" />
            ) : (
              <p className="p-2 text-center">{index + 1}</p>
            )}
          </div>
          {index !== steps.length - 1 && <HR height="h-[4px]" />}
        </Fragment>
      ))}
    </div>
  );

  return (
    <div>
      {renderStepIcons()}
      {/* {renderStepBtns()} */}
    </div>
  );
};

export default Stepper;
