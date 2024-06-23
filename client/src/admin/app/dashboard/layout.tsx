import SideNav from "@/app/ui/dashboard/sidenav";
import UserMenu from "../ui/dashboard/user-menu";
import { auth } from "@/auth";
import { textColor } from "../ui/themes";

export default async function Layout({ children }: _IChildren) {
  const session = await auth();
  const user = session?.user;

  return (
    <div className="grid h-screen grid-cols-1 md:grid-cols-[16rem,1fr]">
      {/* Sidebar with fixed width on larger screens */}
      <div className="">
        <SideNav />
      </div>

      {/* Main content area that grows to take the remaining width */}
      <div
        className={`p-6 md:px-12 md:pb-12 md:pt-4 ${textColor} overflow-x-hidden`}
      >
        <div className="justify-between items-center h-16 hidden md:flex mb-4">
          <h1 className="text-lg font-semibold">Welcome {user?.email}</h1>
          <UserMenu user={user} home />
        </div>

        {/* Content area that takes the remaining space */}
        <div>{children}</div>
      </div>
    </div>
  );
}
