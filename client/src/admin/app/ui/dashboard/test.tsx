"use client";
import { testEmail } from "@/app/lib/actions";
import { classNames } from "@/app/lib/utils";
import { useFormState, useFormStatus } from "react-dom";
import { SvgSpinner } from "../shared/icons";

const TestEmail = () => {
  // Initial state for form
  const initialState: any = {
    message: null,
    errors: {},
  };

  // Use useFormState hook for form state
  const [state, dispatch] = useFormState(testEmail, initialState);

  const { pending } = useFormStatus();
  console.log("state:  ", state);
  return (
    <form action={dispatch}>
      <div>
        <button
          aria-disabled={pending}
          className={classNames(
            "flex w-full px-4 py-2 text-sm bg-blue-700 text-gray-100 aria-disabled:pointer-events-none rounded aria-disabled:bg-opacity-70"
          )}
          type="submit"
        >
          {pending ? (
            <div className="flex items-center">
              <p className="mr-2">Sending mail...</p>
              <SvgSpinner className="text-white" />
            </div>
          ) : (
            " Send Mail"
          )}
        </button>
      </div>
    </form>
  );
};

export default TestEmail;
