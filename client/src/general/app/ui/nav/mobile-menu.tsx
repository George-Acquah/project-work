import { navigations } from '@/app/lib/constants';
import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { SvgArrowUp, SvgArrowDown } from '../shared/icons';
import { useNavbar } from '@/utils/contexts/NavbarVisibilityContext';
import { textColor } from '../shared/themes';

export const NavImages = () => {
  const { sticky, navbarOpen } = useNavbar();
    return (
      <nav className="w-60 max-w-full px-4 xl:mr-12">
        <Link
          href="/"
          className={`header-logo block w-full ${
            !navbarOpen ? (sticky ? "py-5 lg:py-2" : "py-8") : "py-2"
          } `}
        >
          <Image
            src="/images/logo/logo-2.svg"
            alt="logo"
            width={140}
            height={30}
            className="w-full dark:hidden"
          />
          <Image
            src="/images/logo/logo.svg"
            alt="logo"
            width={140}
            height={30}
            className="hidden w-full dark:block"
          />
        </Link>
      </nav>
    );
  }

const MobileMenu = () => {
  const session: any = {};
  const { navigationItems } = navigations;
  const { closeNavbarMenu, openIndex, handleSubmenu, sticky } = useNavbar();
  return (
    <>
      <div
        className={`fixed inset-y-0 right-0 visible z-[9999 bg-white dark:bg-dark ${textColor} w-full overflow-y-auto px-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 top-[4.5rem]`}
      >
        <div className="mt-6 flow-root">
          <div className="-my-6 divide-y divide-gray-500/10">
            <div>
              <div className="space-y-2 py-6  text-2xl ">
                {navigationItems.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.name}
                      className="transition-all duration-500"
                    >
                      <div className="flex items-center justify-between text-2xl py-2 px-5 -mx-3  transition-all duration-500 font-semibold leading-7 hover:bg-nav-hover rounded-lg">
                        <Link
                          key={item.name}
                          href={item.path}
                          className=" py-2 text-base flex items-center justify-start  gap-5"
                          onClick={closeNavbarMenu}
                        >
                          <div className="fill-white">
                            <Icon />
                          </div>
                          <div className="name">{item.name}</div>
                        </Link>
                        {item.data && ( // Updated condition to check isOpen
                          <div className="flex items-center">
                            {openIndex === i ? (
                              <SvgArrowUp
                                onClick={() => handleSubmenu(i)}
                                className="cursor-pointer"
                              />
                            ) : (
                              <SvgArrowDown
                                onClick={() => handleSubmenu(i)}
                                className="cursor-pointer"
                              />
                            )}
                          </div>
                        )}
                      </div>
                      {openIndex === i && item.data && (
                        <div className="items-center py-2 px-5   transition-all duration-500 font-semibold ">
                          {item.data.map((data, j) => (
                            <Link
                              key={j}
                              className="pl-14 py-2 -mx-3 flex items-center gap-5 text-gray-900 hover:bg-gray-50 leading-7 rounded-lg  text-base"
                              href={`${item.path}?section=${data.id as string}`}
                              onClick={closeNavbarMenu}
                            >
                              <div className="icon">
                                <data.icon />
                              </div>
                              <div className="block">{data.name}</div>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="py-6">
              {session && session.token ? (
                <>
                  Signed in as {session.user.email} <br />
                  <Link
                    href="/api/auth/signout"
                    className="-mx-3 mt-10 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 black_btn"
                    onClick={closeNavbarMenu}
                  >
                    Sign Out
                  </Link>
                </>
              ) : (
                <>
                  Not signed in <br />
                  <Link
                    href="/api/auth/signin"
                    className="-mx-3 mt-10 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 black_btn"
                    onClick={closeNavbarMenu}
                  >
                    Sign In
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MobileMenu;