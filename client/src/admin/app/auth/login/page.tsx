import SmartCarParkingAdminLogo from "@/app/ui/logos";
import LoginForm from "@/app/ui/login-form";
import { Metadata } from "next";
import { secondaryBg, strongTextColor } from "@/app/ui/themes";
import { Suspense } from "react";
import { LoginFormSkeleton } from "@/app/ui/skeletons";
import { inter } from "@/app/ui/font";

export const metadata: Metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center">
      <div className="relative mx-auto flex w-full flex-col space-y-3 p-4 md:mt-4">
        <div
          className={`pos__center flex justify-between items-center px-12 h-24 rounded-lg p-3 md:h-32 max-w-[620px] ${secondaryBg} ${strongTextColor}`}
        >
          <div className="w-32 md:w-34">
            <SmartCarParkingAdminLogo />
          </div>
          <h1 className={`${inter.className} uppercase text-2xl ml-4`}>
            Smart Car Parking Admin
          </h1>
        </div>
        <Suspense fallback={<LoginFormSkeleton />}>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}
