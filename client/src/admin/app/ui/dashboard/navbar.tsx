"use client";

import { usePathname } from "next/navigation";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, PowerIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { paymentLinks, usersLinks } from "@/app/lib/constants";
import {
  getRedLinkClassName,
  getGreenLinkClassName,
  getLinkClassName,
  getRedIconClassName,
  getGreenIconClassName,
  getIconClassName,
} from "./functions";
import { classNames, formatUserType } from "@/app/lib/utils";
import UserMenu from "./user-menu";
import { loginCallbackUrl } from "@/app/lib/routes";
import { signOutHelper } from "@/app/lib/actions";
import { LinklessLogo } from "../logos";
import { bgColor, textColor, strongTextColor, hoverTexts, hoverBg } from "../themes";

interface IProps {
  user: _IUser | undefined;
}

function NavlinksComponent({ pathname, data, title, rem }: _INavProps) {
  return (
    <>
      <hr className={`md:min-w-full ${rem ? "mt-12" : "mt-0"}`} />
      <h6
        className={`text-xs uppercase font-bold block pt-1 pb-2 no-underline pl-3 pr-4 ${textColor}`}
      >
        {title}
        {" Information"}
      </h6>
      {data.map((item) => {
        const LinkIcon = item.icon;
        return (
          <Link href={item.href} key={item.name}>
            <Disclosure.Button
              as="div"
              className={classNames(
                pathname === item.href
                  ? `${bgColor} border-slate-500 ${strongTextColor}`
                  : `border-transparent ${textColor} ${hoverBg} hover:border-gray-400 ${hoverTexts}`,
                `pl-3 pr-4 py-2 border-l-4 text-base font-medium flex gap-x-2 ${
                  item.type === "red"
                    ? getRedLinkClassName(pathname, item.href)
                    : item.type === "green"
                    ? getGreenLinkClassName(pathname, item.href)
                    : getLinkClassName(pathname, item.href)
                }`
              )}
              aria-current={pathname === item.href ? "page" : undefined}
            >
              <LinkIcon
                className={`w-6 ${
                  item.type === "red"
                    ? getRedIconClassName(pathname, item.href)
                    : item.type === "green"
                    ? getGreenIconClassName(pathname, item.href)
                    : getIconClassName(pathname, item.href)
                }`}
              />
              <p>{item.name}</p>
            </Disclosure.Button>
          </Link>
        );
      })}
    </>
  );
}

export default function Navbar({ user }: IProps) {
  const pathname = usePathname();
  const focusTheme =
    "focus:ring-custom-background-primary-light dark:focus:ring-custom-background-primary-dark";
  const btnEffects =
    "bg-gray-200 dark:bg-gray-400 hover:bg-gray-500 dark:hover:bg-gray-500";

  return (
    <Disclosure as="nav" className={` shadow-sm`}>
      {({ open, close }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex items-center">
                <Disclosure.Button as="div">
                  <Link
                    href={loginCallbackUrl}
                    className="flex flex-shrink-0 items-center"
                    onClick={() => close()}
                  >
                    <LinklessLogo />
                  </Link>
                </Disclosure.Button>
              </div>
              <UserMenu user={user} />
              <div className="-mr-2 flex items-center sm:hidden">
                <Disclosure.Button
                  className={`inline-flex items-center justify-center rounded-md p-2 ${textColor} focus:outline-none focus:ring-2 ${focusTheme}  ${bgColor}`}
                >
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden h-screen">
            <div className="space-y-1 pt-2 pb-3">
              <NavlinksComponent
                pathname={pathname}
                data={usersLinks}
                title="User"
              />
              {/* <NavlinksComponent
                pathname={pathname}
                data={applicationsLinks}
                title="applications"
              /> */}
              <NavlinksComponent
                pathname={pathname}
                data={paymentLinks}
                title="payment"
              />
            </div>
            <div className="border-t border-gray-400 pt-4 pb-3">
              {user ? (
                <>
                  <div className="flex items-center px-4">
                    <div className="flex-shrink-0">
                      <Image
                        className="h-8 w-8 rounded-full"
                        src={user?.image || "https://avatar.vercel.sh/leerob"}
                        height={32}
                        width={32}
                        alt={`${user?.username} avatar`}
                      />
                    </div>
                    <div className="ml-3">
                      <div
                        className={`text-base font-medium ${strongTextColor}`}
                      >
                        {formatUserType(user?.userType)}
                      </div>
                      <div className={`text-sm font-medium ${textColor}`}>
                        {user.email}
                      </div>
                    </div>
                  </div>
                  <form
                    action={async () => await signOutHelper()}
                    className="mt-3 space-y-1  flex h-[48px] grow items-center justify-center gap-2 mx-2 absolute bottom-4 w-[95%]"
                  >
                    <button
                      className={`flex h-[48px] grow items-center justify-center gap-2 rounded-md  p-3 text-sm font-medium ${btnEffects} ${hoverTexts}`}
                    >
                      <PowerIcon className="w-6" />
                      <div className="">Sign Out</div>
                    </button>
                  </form>
                </>
              ) : (
                <div className="mt-3 space-y-1">
                  <Link
                    href={"/auth/login"}
                    className={`flex h-[48px] grow items-center justify-center gap-2 rounded-md  p-3 text-sm font-medium ${btnEffects} ${hoverTexts}`}
                  >
                    Sign in
                  </Link>
                </div>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
