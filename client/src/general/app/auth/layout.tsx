import React from "react";
import Link from "next/link";
import { gradientDark, textColor } from "@/app/ui/shared/themes";

export const HR = () => (
  <>
    {" "}
    <div
      className={`h-px w-full bg-gradient-to-r from-transparent to-transparent ${gradientDark}`}
    ></div>
  </>
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
    <span className="hidden h-[1px] w-full max-w-[70px] bg-body-color/50 sm:block"></span>
    <p className="w-full px-5 text-center text-base font-medium text-body-color">
      {text}
    </p>
    <span className="hidden h-[1px] w-full max-w-[70px] bg-body-color/50 sm:block"></span>
  </div>
);

const AuthenticationLayout = ({ children }: _IChildren) => {
  return (
    <><section className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px]">
      <div className="container">{children}</div>
    </section><HR /><LoginFooter /></>
  );
};

const LoginFooter = () => {
  return (
    <footer className={`mt-auto text-center text-gray-500 ${textColor} pt-4`}>
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
