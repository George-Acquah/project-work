import SideNav from "@/app/ui/dashboard/sidenav";
import UserMenu from "../ui/dashboard/user-menu";
import { auth } from "@/auth";
import { textColor } from "../ui/themes";

interface _IL extends _IChildren {
  pageTitle: string;
}
export default async function Layout({ children, pageTitle }: _IL) {
  const session = await auth();
  const user = session?.user;

  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      {/* Sidebar with fixed width on larger screens */}
      <div className="flex-shrink-0 w-full md:w-64">
        <SideNav />
      </div>
      {/* Main content area that grows to take the remaining width */}
      <div
        className={`flex-grow p-6 md:overflow-y-auto md:overflow-x-hidden md:px-12 md:pb-12 md:pt-4 ${textColor}`}
      >
        <div className="h-16 justify-between items-center hidden md:flex mb-4">
          <h1>Welcome {user?.email}</h1>
          <h1>{pageTitle}</h1>
          <UserMenu user={user} home />
        </div>
        {children}
      </div>
    </div>
  );
}
