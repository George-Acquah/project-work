import React from "react";
import Link from "next/link";
import {
  gradientDark,
  textColor,
} from "../ui/themes";

export const HR = () => (
  <div
    className={`h-px w-full bg-gradient-to-r from-transparent to-transparent ${gradientDark}`}
  />
);

export const VR = () => (
  <div
    className={`w-[0.3px] bg-gradient-to-b from-transparent to-transparent ${gradientDark}`}
  />
);

export const HRWithText = ({
  text = "Or, sign in with your email",
}: {
  text: string;
}) => (
  <div className="mb-8 flex items-center justify-center">
    <span className="hidden h-[1px] w-full max-w-[70px] bg-custom-body-color/50 sm:block" />
    <p className="w-full px-2 text-center text-base font-medium text-custom-body-color">
      {text}
    </p>
    <span className="hidden h-[1px] w-full max-w-[70px] bg-custom-body-color/50 sm:block" />
  </div>
);

const AuthenticationLayout = ({ children }: _IChildren) => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">{children}</div>
      <HR />
      <LoginFooter />
    </div>
  );
};

const LoginFooter = () => {
  return (
    <footer className={`mt-auto text-center text-gray-500 ${textColor} py-4`}>
      <div className="flex justify-around items-center">
        <p>Smart Car Parking Admin</p>
        <div className="flex gap-x-4 mb-2">
          <Link href={"/"} className="hover:text-blue-400">
            Home
          </Link>
          <Link href={"/about"} className="hover:text-blue-400">
            About
          </Link>
        </div>
      </div>
      <p className="font-light">
        &copy; 2023 Smart Car Parking Admin. All rights reserved.
      </p>
    </footer>
  );
};

export default AuthenticationLayout;
