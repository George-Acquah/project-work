import { Menu, MenuButton, MenuItems, Transition } from "@headlessui/react";
import { FunnelIcon } from "@heroicons/react/24/solid";

export default function Filter({ children }: _IChildren) {
  return (
    <div className="">
      <Menu __demoMode>
        <MenuButton className="inline-flex h-10 items-center gap-2 rounded-md bg-gray-800 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white ">
          Filters
          <FunnelIcon className="h-4 fill-white/80" />
        </MenuButton>
        <Transition
          enter="transition ease-out duration-75"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <MenuItems
            anchor="bottom end"
            className="w-52 mt-2 origin-top-right rounded-xl border bg-[#ffffff] dark:bg-[#2C303B] border-white/5 p-1 text-sm/6 text-[#2C303B] dark:text-white [--anchor-gap:var(--spacing-1)] focus:outline-none border-b-[#2C303B]/20 dark:border-b-[#2C303B]/5 py-4"
          >
            {children}
            <div className="my-1 h-px bg-[#2C303B]/5 dark:bg-white/5" />
          </MenuItems>
        </Transition>
      </Menu>
    </div>
  );
}
