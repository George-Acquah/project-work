import SmartCarParkingAdminLogo from "@/app/ui/dashboard/logos";
import LoginForm from "@/app/ui/auth/login-form";
import { Metadata } from "next";
import { secondaryBg, strongTextColor } from "@/app/ui/themes";
import { Suspense } from "react";
import { LoginFormSkeleton } from "@/app/ui/shared/skeletons";
import { inter } from "@/app/ui/font";

export const metadata: Metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center">
      <div className="relative mx-auto flex w-full flex-col space-y-3 p-4 md:mt-4">
        <Suspense fallback={<LoginFormSkeleton />}>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}
