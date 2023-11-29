import React from "react";
import Link from "next/link";
import { textColor, bgColor } from "../ui/themes"; // Make sure to import bgColor from your theme

const AuthenticationLayout = ({ children }: _IChildren) => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">{children}</div>
      <div className={`h-[0.3px] mx-8 bg-gray-400`} />
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
