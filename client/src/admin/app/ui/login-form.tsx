"use client";

import { lusitana } from "@/app/ui/font";
import { useFormState, useFormStatus } from "react-dom";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import Button from "./button";
import { authenticate } from "../lib/actions";
import { secondaryBg, textColor, strongTextColor, providerBtnClass } from "./themes";
import { loginDetails } from "../lib/constants";
import { LoginInput } from "./inputs";
import { SvgCheck, SvgGithub, SvgGoogle } from "../lib/icons";
import { HRWithText } from "../auth/layout";
import Link from "next/link";

export default function LoginForm() {
  const [state, dispatch] = useFormState(authenticate, undefined);

  return (
    <form action={dispatch} className="space-y-3">
      <div className="w-full">
        <div className="w-full">
          <div
            className={`flex-1 rounded px-6 pb-4 pt-8 shadow-three mx-auto max-w-[500px]  ${secondaryBg} px-4 ${textColor}`}
          >
            <h1
              className={`${lusitana.className} mb-3 text-2xl font-bold text-center ${strongTextColor}`}
            >
              Sign in to your account here
            </h1>
            <p
              className={`${lusitana.className} mb-11 text-base font-medium text-custom-body-color text-center`}
            >
              Login to your account for a reservation now.
            </p>
            <GoogleButton />
            <GithubButton />
            <HRWithText text="Or, sign in with your email" />
            {loginDetails.map((details) => (
              <LoginInput
                key={details.id}
                required={details?.required}
                minLenght={details.minLenght}
                id={details.id}
                placeholder={details.placeholder}
                label={details.label}
                icon={details.icon}
                type={details.type}
                mt={details.mt}
              />
            ))}
            <RememberMe />
            <LoginButton />
            <p className="text-center text-base font-medium text-custom-body-color">
              Don&apos;t you have an account?{" "}
              <Link
                href="/auth/register"
                className="text-blue-400 hover:underline"
              >
                Sign up
              </Link>
            </p>
            <div className="flex h-8 items-end space-x-1">
              {state === "CredentialSignin" && (
                <>
                  <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                  <p aria-live="polite" className="text-sm text-red-500">
                    Invalid credentials
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      variant="default"
      className="mb-8 w-full text-gray-50 py-6 text-xl font-thin"
      aria-disabled={pending}
    >
      Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}

const GithubButton = () => (
  <button className={`w-full ${providerBtnClass}`}>
    <span className="mr-3">
      <SvgGithub />
    </span>
    Sign in with Github
  </button>
);

const GoogleButton = () => (
  <button className={`w-full ${providerBtnClass}`}>
    <span className="mr-3">
      <SvgGoogle />
    </span>
    Sign in with Google
  </button>
);

const RememberMe = () => (
  <div className="mt-4 mb-8 flex flex-col justify-between sm:flex-row sm:items-center">
    <div className="mb-4 sm:mb-0">
      <label
        htmlFor="checkboxLabel"
        className="flex cursor-pointer select-none items-center text-sm font-medium text-body-color"
      >
        <div className="relative">
          <input type="checkbox" id="checkboxLabel" className="sr-only" />
          <div className="box mr-4 flex h-5 w-5 items-center justify-center rounded border border-custom-body-color border-opacity-20 dark:border-white dark:border-opacity-10">
            <span className="opacity-0">
              <SvgCheck />
            </span>
          </div>
          
        </div>
        Keep me signed in
      </label>
    </div>
    <div>
      <Link href="/auth/forgot-password" className="text-sm font-medium text-blue-400 hover:underline">
        Forgot Password?
      </Link>
    </div>
  </div>
);