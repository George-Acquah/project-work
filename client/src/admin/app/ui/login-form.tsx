"use client"
import { inter } from "@/app/ui/font";
import { useFormState, useFormStatus } from "react-dom";
import { authenticate } from "../lib/actions";
import {
  secondaryBg,
  textColor,
  strongTextColor,
  providerBtnClass,
  loginBtnClass,
} from "./themes";
import { loginDetails } from "../lib/constants";
import { SvgCheck, SvgGithub, SvgGoogle } from "../lib/icons";
import { HRWithText } from "../auth/layout";
import Link from "next/link";
import CommonInput from "./shared/common-inputs";
import Loading from "./shared/loading";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function LoginForm() {
  const initialState = {
    type: undefined,
    message: null,
  };
  const [state, dispatch] = useFormState<ActionResult, FormData>(authenticate, initialState);
  const [loading, setLoading] = useState(false);

  return (
    <form action={dispatch} className="">
      <div className="w-full">
        {loading && <Loading />}
        <div className="w-full">
          <div
            className={`flex-1 rounded px-6 pb-4 pt-8 shadow-three mx-auto max-w-[420px]  ${secondaryBg} px-4 ${textColor}`}
          >
            <h1
              className={`${inter.className} mb-3 text-2xl font-medium text-center ${strongTextColor}`}
            >
              Sign in to your account here
            </h1>
            <p
              className={`${inter.className} mb-11 text-base font-medium text-custom-body-color text-center`}
            >
              Login to your account as an admin.
            </p>
            <GoogleButton />
            <GithubButton />
            <HRWithText text="Or, sign in with your email" />
            {loginDetails.map((details) => (
              <CommonInput
                key={details.id}
                id={details.id}
                placeholder={details.placeholder}
                label={details.label}
                icon={details.icon}
                type={details.type}
                mt={details.mt}
                errors={state?.type === "error" ? state?.errors : null}
              />
            ))}
            <RememberMe />
            <LoginButton setLoading={setLoading} />
            <p className="text-center text-base font-medium text-custom-body-color">
              Don&apos;t you have an account?{" "}
              <Link
                href="/auth/register"
                className="text-blue-400 hover:underline"
              >
                Sign up
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
    setLoading(pending)
  }, [pending, setLoading])
  return (
    <button
      className={`w-full ${loginBtnClass} cursor-pointer`}
      aria-disabled={pending}
    >
      {pending ? "Logging in ..." : "Log in"}
    </button>
  );
}

const GithubButton = () => (
  <div className={`w-full ${providerBtnClass} cursor-pointer`} onClick={undefined}>
    <span className="mr-3">
      <SvgGithub />
    </span>
    Sign in with Github
  </div>
);

const GoogleButton = () => (
 <div className={`w-full ${providerBtnClass} cursor-pointer`} onClick={undefined}>
    <span className="mr-3">
      <SvgGoogle />
    </span>
    Sign in with Google
  </div>
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