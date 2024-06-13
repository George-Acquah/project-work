import NavLinks from '@/app/ui/dashboard/nav-links';
import { PowerIcon } from '@heroicons/react/24/outline';
import SmartCarParkingAdminLogo from "../logos";
import { signOut } from '@/auth';
import { borderRight, cardsBg, textColor } from '../themes';

export const SignOutBtn = () => (
  <form
    action={async () => {
      "use server";
      await signOut();
    }}
  >
    <button
      className={`flex h-[48px] grow items-center justify-center gap-2 rounded-md ${cardsBg} p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3`}
    >
      <PowerIcon className="w-6" />
      <div className="hidden md:block">Sign Out</div>
    </button>
  </form>
);

export default function Sidebar() {
  return (
    <>
      <div
        className={`flex h-screen flex-col px-3 py-4 md:px-2 md:overflow-y-auto ${textColor} ${borderRight} `}
      >
        <div className="mb-4 ml-2">
          <SmartCarParkingAdminLogo />
        </div>
        <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
          <NavLinks />
          <SignOutBtn />
        </div>
      </div>
    </>
  );
}
