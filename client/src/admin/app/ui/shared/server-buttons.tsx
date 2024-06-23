import { signOut } from "@/auth";
import { PowerIcon } from "@heroicons/react/24/outline";

export const SignOutBtn = () => (
  <form
    action={async () => {
      "use server";
      await signOut();
    }}
  >
    <button
      className={`flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-red-600 dark:bg-red-600 p-3 text-sm font-medium text-white hover:bg-red-500 dark:hover:bg-red-500 md:flex-none md:justify-start md:p-2 md:px-3`}
    >
      <PowerIcon className="w-6" />
      <div className="hidden md:block">Sign Out</div>
    </button>
  </form>
);
