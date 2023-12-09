"use client";

import { useFormState, useFormStatus } from "react-dom";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import Button from "./button";
import { authenticate } from "@/app/lib/actions";
import { loginDetails } from "@/app/lib/constants";
import { SvgCheck } from "@/app/ui/shared/icons";
import Link from "next/link";
import AuthForm from "./auth-form";
import { globalBorder } from "./themes";

export default function LoginForm() {
  const [state, dispatch] = useFormState(authenticate, undefined);
  return (
    <AuthForm
      data={loginDetails}
      title="Sign in to your account here"
      description="Login to your account for a reservation now."
      dispatch={dispatch}
      state={state}
      hrText="Or, sign in with your email"
      href="/auth/register"
      usageText={`Don&apos;t you have an account?`}
      btnName="Log in"
      route="Sign up"
    >
      <RememberMe />
    </AuthForm>
  );
}

const RememberMe = () => (
  <div className="mt-4 mb-8 flex flex-col justify-between sm:flex-row sm:items-center">
    <div className="mb-4 sm:mb-0">
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
        Keep me signed in
      </label>
    </div>
    <div>
      <Link
        href="/auth/forgot-password"
        className="text-sm font-medium text-green-600 hover:underline"
      >
        Forgot Password?
      </Link>
    </div>
  </div>
);
