import SideNav from "@/app/ui/dashboard/sidenav";
import UserMenu from "../ui/dashboard/user-menu";
import { auth } from "@/auth";
import { textColor } from "../ui/themes";

export default async function Layout({ children }: _IChildren) {
  const session = await auth();
  const user = session?.user;
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div
        className={`flex-grow p-6 md:overflow-y-auto md:px-12 md:pb-12 md:pt-4 ${textColor}`}
      >
        <div className="h-16 justify-between items-center hidden md2:flex mb-4">
          <h1>Welcome {` ${user?.email}`}</h1>
          <UserMenu user={user} home />
        </div>
        {children}
      </div>
    </div>
  );
}
