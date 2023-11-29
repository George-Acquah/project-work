"use client";

import { lusitana } from "@/app/ui/font";
import { useFormState, useFormStatus } from "react-dom";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import Button from "./button";
import { authenticate } from "../lib/actions";
import { bgColor, textColor } from "./themes";
import { loginDetails } from "../lib/constants";
import { LoginInput } from "./inputs";

export default function LoginForm() {
  const [state, dispatch] = useFormState(authenticate, undefined);

  return (
    <form action={dispatch} className="space-y-3">
      <div
        className={`flex-1 rounded-lg px-6 pb-4 pt-8 ${bgColor} ${textColor}`}
      >
        <h1 className={`${lusitana.className} mb-3 text-2xl`}>
          Please log in to continue.
        </h1>
        <div className="w-full">
          <div className="w-full">
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
          </div>
        </div>
        <LoginButton />
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
    </form>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      variant="default"
      className="mt-8 w-full text-gray-50 py-5 text-base"
      aria-disabled={pending}
    >
      Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}
