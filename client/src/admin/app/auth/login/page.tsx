import SmartCarParkingAdminLogo from "@/app/ui/logos";
import LoginForm from "@/app/ui/login-form";
import { Metadata } from "next";
import { secondaryBg, strongTextColor } from "@/app/ui/themes";

export const metadata: Metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center">
      <div className="relative mx-auto flex w-full max-w-[450px] flex-col space-y-2.5 p-4 md:mt-4">
        <div
          className={`flex justify-content items-center h-24 w-full rounded-lg p-3 md:h-32 ${secondaryBg} ${strongTextColor}`}
        >
          <div className="w-32 md:w-36">
            <SmartCarParkingAdminLogo />
          </div>
          <p className="uppercase text-2xl ml-4">Smart Car Parking Admin</p>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
