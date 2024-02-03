import { HRWithText } from "@/app/auth/layout";
import { ArrowRightIcon, ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { inter } from "./font";
import { LoginInput } from "./inputs";
import { globalBorder, providerBtnClass, secondaryBg, textColor } from "./themes";
import { SvgGithub, SvgGoogle } from "./icons";
import Link from "next/link";
import { useFormStatus } from "react-dom";
import Button from "./button";

const GithubButton = () => (
  <button className={`w-full ${globalBorder.hoverBorder} ${providerBtnClass}`}>
    <span className="mr-3">
      <SvgGithub />
    </span>
    Sign in with Github
  </button>
);

const GoogleButton = () => (
  <button className={`w-full ${globalBorder.hoverBorder} ${providerBtnClass}`}>
    <span className="mr-3">
      <SvgGoogle />
    </span>
    Sign in with Google
  </button>
);

function AuthButton({name}: {name: string}) {
  const { pending } = useFormStatus();
  return (
    <Button
      variant="default"
      className="mb-6 w-full text-lg text-gray-50 bg-primary-btn hover:bg-button-hover px-3 py-6 font-medium"
      aria-disabled={pending}
    >
      {name} <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}

export default function AuthForm({children, data, title, description, dispatch, state, hrText, usageText, href, btnName, route}: _ILogin) {
  // const [state, dispatch] = useFormState(authenticate, undefined);
  return (
    <form
      action={dispatch}
      className={`flex-1 px-6 pt-10 pb-6 shadow-three mx-auto max-w-[500px] sm:p-[60px]  ${secondaryBg} px-4 ${textColor}`}
    >
      <div className={`${inter.className}`}>
        <h1
          className={` mb-3 text-2xl sm:text-3xl font-bold text-center ${textColor}`}
        >
          {title}
        </h1>
        <p
          className={`mb-11 text-base font-medium text-body-color text-center`}
        >
          {description}
        </p>
        <GoogleButton />
        <GithubButton />
        <HRWithText text={hrText} />
        {data.map((details) => (
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
        {children}
        <AuthButton name={btnName} />
        <p className="text-center text-base font-medium text-body-color">
          {usageText}
          <Link href={href}className="text-green-600 hover:underline">
            {route}
          </Link>
        </p>
        {state && (
          <div className="flex h-8 items-end space-x-1">
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
            <p aria-live="polite" className="text-sm text-red-500">
              {state}
            </p>
          </div>
        )}
      </div>
    </form>
  );
}
