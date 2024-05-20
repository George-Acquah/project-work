import LoginForm from "@/app/ui/shared/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <main className="-mx-4 flex flex-wrap">
      <div className="w-full px-4">
        <LoginForm />
      </div>
    </main>
  );
}
