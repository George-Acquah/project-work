"use client";

import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react";
import { signIn } from "next-auth/react";
import React, { Fragment } from "react";
import Image from "next/image";
import { classNames } from "@/app/lib/utils";
import { PowerIcon } from "@heroicons/react/24/solid";
import { navDropdownLinks } from "@/app/lib/constants";
import Link from "next/link";
import { signOutHelper } from "@/app/lib/actions";
import { bodyBg, cardsBg, secHover, textColor } from "../themes";
import { _ISessionUser } from "@/next-auth";

type Props = {
  user?: _ISessionUser;
  home?: boolean;
};

const UserMenu = ({ user, home }: Props) => {
  return (
    <div
      className={classNames(
        `${
          home
            ? "hidden md2:flex md2:items-center"
            : "hidden sm:ml-6 sm:flex sm:items-center md:hidden"
        }`
      )}
    >
      <Menu as="div" className="relative ml-3">
        <div>
          <MenuButton
            className={`flex rounded-full  text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 dark:focus:ring-gray-700 focus:ring-offset-2`}
          >
            <span className="sr-only">Open user menu</span>
            <Image
              className="h-8 w-8 rounded-full"
              src="https://avatar.vercel.sh/leerob"
              height={32}
              width={32}
              alt="placeholder avatar"
            />
          </MenuButton>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <MenuItems
            className={`absolute right-0 z-10 mt-2 px-2 w-48 origin-top-right rounded-md  py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${cardsBg}`}
          >
            {user ? (
              <MenuItem>
                {({ focus }) => (
                  <>
                    {navDropdownLinks.map((item) => {
                      const LinkIcon = item.icon;
                      return (
                        <div
                          key={`${item.name}__${item.href}`}
                          className={classNames(
                            focus ? bodyBg : "",
                            `flex items-center w-full px-4 py-2 ${textColor} rounded-md ${secHover}`
                          )}
                        >
                          <LinkIcon className="w-6 h-6" />
                          <Link href={item.href} className="ml-4 text-base">
                            {item.name}
                          </Link>
                        </div>
                      );
                    })}
                    <div
                      className={classNames(
                        focus ? "bg-gray-100" : "",
                        "flex items-center w-full px-4 py-2 text-white rounded-md bg-red-500 mt-2"
                      )}
                    >
                      <PowerIcon className="w-6 h-6" />
                      <button
                        className="ml-4 text-base"
                        onClick={async () => {
                          await signOutHelper();
                        }}
                      >
                        Sign out
                      </button>
                    </div>
                  </>
                )}
              </MenuItem>
            ) : (
              <MenuItem>
                {({ focus }) => (
                  <button
                    className={classNames(
                      focus ? "bg-gray-100" : "",
                      "flex w-full px-4 py-2 text-sm text-gray-700"
                    )}
                    onClick={() => signIn("github")}
                  >
                    Sign in
                  </button>
                )}
              </MenuItem>
            )}
          </MenuItems>
        </Transition>
      </Menu>
    </div>
  );
};

export default UserMenu;
