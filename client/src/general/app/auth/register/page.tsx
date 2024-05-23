import { Metadata } from "next";
import RegistrationForm from "@/app/ui/shared/register-user-form";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default function LoginPage() {
  return (
    <main className="-mx-4 flex flex-wrap">
      <div className="w-full px-4">
        <RegistrationForm />
      </div>
    </main>
  );
}
