import { Metadata } from "next";
import RegistrationForm from "@/app/ui/auth/register-user-form";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default function RegistrationPage() {
  return (
    <main className="flex items-center justify-center">
      <div className="relative mx-auto flex w-full max-w-[460px] flex-col space-y-2.5 p-4 md:mt-4">
        <RegistrationForm />
      </div>
    </main>
  );
}
