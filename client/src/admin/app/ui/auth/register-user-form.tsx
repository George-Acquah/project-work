"use client";

import { lusitana } from "@/app/ui/font";
import { useFormState, useFormStatus } from "react-dom";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import Button from "../shared/button";
import { authenticate } from "../../lib/actions";
import {
  secondaryBg,
  textColor,
  strongTextColor,
  providerBtnClass,
} from "../themes";
import { loginDetails } from "../../lib/constants";
import { SvgCheck, SvgGithub, SvgGoogle } from "../../lib/icons";
import { HRWithText } from "../../auth/layout";
import Link from "next/link";
import CommonInput from "../shared/common-inputs";

export default function RegistrationForm() {
  const initialState: any = {
    message: null,
    errors: {},
  };
  const [state, dispatch] = useFormState(authenticate, initialState);

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
              Create your account now
            </h1>
            <p
              className={`${lusitana.className} mb-11 text-base font-medium text-custom-body-color text-center`}
            >
              It&apos;s totally free and super easy
            </p>
            <GoogleButton />
            <GithubButton />
            <HRWithText text="Or, register with your email" />
            {loginDetails.map((detail) => (
              <CommonInput
                key={`${String(detail.id)}__${detail.placeholder}`}
                id={String(detail.id)}
                placeholder={detail.placeholder}
                label={detail.label}
                icon={detail.icon}
                type={detail.type}
                errors={state.errors}
                // required={detail?.required}
                // minLenght={detail.minLenght}
                mt={detail.mt}
              />
            ))}
            <UserConsent />
            <LoginButton />
            <p className="text-center text-base font-medium text-custom-body-color">
              Already using our platform?{" "}
              <Link
                href="/auth/login"
                className="text-blue-400 hover:underline"
              >
                Login
              </Link>
            </p>
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
      Sign Up <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}

const GithubButton = () => (
  <button className={providerBtnClass}>
    <span className="mr-3">
      <SvgGithub />
    </span>
    Sign in with Github
  </button>
);

const GoogleButton = () => (
  <button className={providerBtnClass}>
    <span className="mr-3">
      <SvgGoogle />
    </span>
    Sign in with Google
  </button>
);

const UserConsent = () => (
  <div className="mt-4 mb-8 flex">
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
      <span>
        By creating account means you agree to the
        <a href="#0" className="text-blue-400 hover:underline">
          {" "}
          Terms and Conditions{" "}
        </a>
        , and our
        <a href="#0" className="text-blue-400 hover:underline">
          {" "}
          Privacy Policy{" "}
        </a>
      </span>
    </label>
  </div>
);
