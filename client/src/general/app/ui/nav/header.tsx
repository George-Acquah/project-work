"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigations } from "@/app/lib/constants";
import { useNavbar } from "@/utils/contexts/NavbarVisibilityContext";
import { navbar, textColor } from "../shared/themes";
import {
  SvgAllignLeftMenu,
  SvgArrowDown,
  SvgArrowUp,
  SvgClose,
} from "../shared/icons";
import MobileMenu, { NavImages } from "./mobile-menu";

const Header = () => {
  const {
    navbarOpen,
    toggleNavbar,
    sticky,
    openIndex,
    handleSubmenu,
    closeSubMenu,
    closeNavbarMenu,
  } = useNavbar();

  const pathname = usePathname();
  const { navigationItems } = navigations;

  return (
    <header className={`absolute inset-x-0 top-0 z-50 `}>
      <nav
        className={`header left-0 top-0 z-40 flex w-full items-center ${
          sticky || navbarOpen
            ? "dark:bg-gray-dark dark:shadow-sticky-dark fixed z-[9999] bg-white !bg-opacity-80 shadow-sticky backdrop-blur-sm transition"
            : "absolute bg-transparent"
        } ${navbarOpen && "py-3"}`}
        aria-label="Global"
      >
        <div className="container">
          <div className={`relative -mx-4 flex items-center justify-between`}>
            <NavImages />
            <div
              className={`absolute right-4 top-1/2 block translate-y-[-50%] lg:hidden rounded-lg px-3 py-[6px] ${
                navbar.HOVER
              } transition-all duration-500 ${sticky && "hover:shadow-sm"}`}
            >
              <SvgAllignLeftMenu
                className={`w-8 h-8 p-1 font-bold cursor-pointer ${
                  navbarOpen ? "hidden" : "block"
                }`}
                onClick={() => toggleNavbar(navbarOpen)}
              />
              <SvgClose
                className={`w-8 h-8 p-1 font-bold cursor-pointer ${
                  navbarOpen ? "block" : "hidden"
                }`}
                onClick={() => toggleNavbar(navbarOpen)}
              />
            </div>
            {/* {state.user && <div>Welcome, {state.user.username}</div> } */}

            <div className="hidden lg:flex lg:gap-x-12">
              {navigationItems.map((item, index) => (
                <div
                  key={item.name}
                  onMouseEnter={() => handleSubmenu(index)}
                  onMouseLeave={closeSubMenu}
                  className="relative group"
                >
                  <div className="flex items-center gap-2">
                    <Link
                      href={item.path}
                      className={`flex py-2 text-base lg:mr-0 lg:inline-flex lg:px-0 lg:py-6 ${
                        pathname === item.path
                          ? "text-greenText dark:text-white"
                          : "text-dark hover:text-greenText/70 dark:text-white/70 dark:hover:text-white"
                      }`}
                      onClick={closeSubMenu}
                    >
                      {item.name}
                    </Link>
                    {item.data && (
                      <div className="flex items-center">
                        {openIndex === index ? (
                          <SvgArrowUp
                            use
                            isFixed={sticky || pathname !== "/"}
                            onClick={() => handleSubmenu(index)}
                            className="cursor-pointer text"
                          />
                        ) : (
                          <SvgArrowDown
                            use
                            isFixed={sticky || pathname !== "/"}
                            onClick={() => handleSubmenu(index)}
                            className="cursor-pointer"
                          />
                        )}
                      </div>
                    )}
                  </div>
                  {!navbarOpen && openIndex === index && item.data && (
                    <div
                      className={`py-2 px-2 transition-all duration-500 font-semibold ${textColor} ${
                        item.name === "About" && "about-margin"
                      }`}
                    >
                      {item.data.map((data, j) => (
                        <Link
                          key={j}
                          className="px-4 py-2 gap-5 hover:bg-greenText hover:bg-opacity-50 leading-7 rounded-lg text-base text-start w-full "
                          href={`${item.path}?section=${data.id as string}`}
                          onClick={closeNavbarMenu}
                        >
                          {data.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
              <Link
                href="/auth/login"
                className={`ease-in-out shadow-btn hover:shadow-btn-hover hidden rounded bg-greenText px-6 py-3 text-base font-medium text-white transition duration-300 hover:bg-opacity-90 md:block md:px-8 lg:px-6 xl:px-8`}
                onClick={closeNavbarMenu}
              >
                SignIn
              </Link>
            </div>
          </div>
        </div>
      </nav>
      {navbarOpen && <MobileMenu />}
    </header>
  );
};

export default Header;
