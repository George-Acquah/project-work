"use client";

import { inter, lusitana } from "@/app/ui/font";
import { useFormState, useFormStatus } from "react-dom";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import Button from "../shared/button";
import { authenticate } from "../../lib/actions";
import {
  secondaryBg,
  textColor,
  strongTextColor,
  providerBtnClass,
  loginBtnClass,
} from "../themes";
import { loginDetails } from "../../lib/constants";
import { SvgCheck, SvgGithub, SvgGoogle } from "../../lib/icons";
import { HRWithText } from "../../auth/layout";
import Link from "next/link";
import CommonInput from "../shared/common-inputs";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function RegistrationForm() {
  const initialState: any = {
    message: null,
    errors: {},
  };
  const [state, dispatch] = useFormState(authenticate, initialState);
  const [loading, setLoading] = useState(false);

  return (
    <form action={dispatch} className="space-y-3">
      <div className="w-full">
        <div className="w-full">
          <div
            className={`flex-1 rounded px-6 pb-4 pt-8 shadow-three mx-auto max-w-[500px]  ${secondaryBg} px-4 ${textColor}`}
          >
            <h1
              className={` mb-3 text-2xl font-medium text-center ${strongTextColor}`}
            >
              Request for admin role
            </h1>
            <p
              className={`${lusitana.className} mb-6 text-base font-medium text-custom-body-color text-center`}
            >
              It&apos;s totally free and super easy
            </p>
            {/* <GoogleButton />
            <GithubButton /> */}
            {/* <HRWithText text="register with your email" /> */}
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
            <LoginButton setLoading={setLoading} />
            <p className="text-center text-base font-medium text-custom-body-color">
              Already approved as an admin?{" "}
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

function LoginButton({
  setLoading,
}: {
  setLoading: Dispatch<SetStateAction<boolean>>;
}) {
  const { pending } = useFormStatus();
  useEffect(() => {
    setLoading(pending);
  }, [pending, setLoading]);
  return (
    <button
      className={`w-full ${loginBtnClass} cursor-pointer`}
      aria-disabled={pending}
    >
      {pending ? "Please Wait ..." : "Request"}
    </button>
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
        By requesting to be registered means you agree with the
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
