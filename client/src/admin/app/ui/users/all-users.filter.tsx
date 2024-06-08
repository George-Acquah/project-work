import { MenuItem } from "@headlessui/react";
import {
  UserCircleIcon, // For user roles
  UserGroupIcon, // For user groups
  UserIcon, // For individual users
  ShieldCheckIcon, // For verified status
  XCircleIcon, // For not verified status
  ClockIcon, // For recently active
  PauseIcon, // For inactive status
} from "@heroicons/react/24/solid"; // Importing relevant icons

interface _IMenuItem {
  icon: React.ElementType;
  title: string;
}

export function fetchData<T = any>(data: T, timeout: number) {
  return new Promise<T>((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, timeout);
  });
}

const AllUsersFilter = async () => {
  // Simulate fetching user types, verification status, and other filters
  const [userTypes, verifiedStatus, otherFilters] = await Promise.all([
    fetchData<_IMenuItem[]>(
      [
        { icon: UserCircleIcon, title: "Admin" }, // Represents an Admin role
        { icon: UserGroupIcon, title: "Editor" }, // Represents an Editor role
        { icon: UserIcon, title: "Viewer" }, // Represents a Viewer role
      ],
      500 // Simulating a 500ms delay for userTypes
    ),

    fetchData<_IMenuItem[]>(
      [
        { icon: ShieldCheckIcon, title: "Verified" }, // Represents Verified status
        { icon: XCircleIcon, title: "Not Verified" }, // Represents Not Verified status
      ],
      700 // Simulating a 700ms delay for verifiedStatus
    ),

    fetchData<_IMenuItem[]>(
      [
        { icon: ClockIcon, title: "Recently Active" }, // Represents recent activity
        { icon: PauseIcon, title: "Inactive" }, // Represents inactivity
      ],
      900 // Simulating a 900ms delay for otherFilters
    ),
  ]);

  // Render each filter block
  const renderFilterBlock = (title: string, items: _IMenuItem[]) => (
    <div className="mb-4 px-2">
      <h3 className="mb-2 font-semibold text-[#2C303B] dark:text-white/70">
        {title}
      </h3>
      <div className="my-1 h-px bg-[#2C303B]/5 dark:bg-white/5" />
      {items.map((item) => (
        <MenuItem key={item.title}>
          <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-[#2C303B]/10 dark:data-[focus]:bg-white/10">
            <item.icon className="h-6 w-6 fill-[#2C303B] dark:fill-white/30" />
            {item.title}
          </button>
        </MenuItem>
      ))}
    </div>
  );

  return (
    <>
      {renderFilterBlock("User Types", userTypes)}
      {renderFilterBlock("Verification Status", verifiedStatus)}
      {renderFilterBlock("Other Filters", otherFilters)}
    </>
  );
};

export default AllUsersFilter;
