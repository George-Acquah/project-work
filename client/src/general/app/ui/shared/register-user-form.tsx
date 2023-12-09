"use client";

import { useFormState } from "react-dom";
import { authenticate } from "@/app/lib/actions";
import { loginDetails, registerDetails } from "@/app/lib/constants";
import { SvgCheck } from "@/app/ui/shared/icons";
import AuthForm from "./auth-form";
import { globalBorder } from "./themes";

export default function RegistrationForm() {
  const [state, dispatch] = useFormState(authenticate, undefined);

    return (
      <AuthForm
        data={registerDetails}
        title="Create your account now"
        description="It's totally free and super easy."
        dispatch={dispatch}
        state={state}
        hrText="Or, register with your email"
        href="/auth/login"
        usageText="Already using our platform?"
        btnName="Sign Up"
        route="Login"
      >
        <UserConsent />
      </AuthForm>
    );
}

const UserConsent = () => (
  <div className="mt-4 mb-8 flex">
    <label
      htmlFor="checkboxLabel"
      className="flex cursor-pointer select-none items-center text-sm font-medium text-body-color"
    >
      <div className="relative">
        <input type="checkbox" id="checkboxLabel" className="sr-only" />
        <div
          className={`box mr-4 flex h-5 w-5 items-center justify-center rounded border border-opacity-20 dark:border-opacity-40 ${globalBorder.border}`}
        >
          <span className="opacity-0">
            <SvgCheck className="dark:text-green-600" />
          </span>
        </div>
      </div>
      <span>
        By creating account means you agree to the
        <a href="#0" className="text-green-600 hover:underline">
          {" "}
          Terms and Conditions{" "}
        </a>
        , and our
        <a href="#0" className="text-green-600 hover:underline">
          {" "}
          Privacy Policy{" "}
        </a>
      </span>
    </label>
  </div>
);
