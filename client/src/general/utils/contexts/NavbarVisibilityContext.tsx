"use client";
import {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";

export const NavbarContext = createContext<_INavbarContext>({
  isVisible: false,
  sticky: false,
  openIndex: -1,
  navbarOpen: false,
  toggleNavbar: () => {},
  handleStickyNavbar: () => {},
  handleSubmenu: () => {},
  closeSubMenu: () => {},
  closeNavbarMenu: () => {},
});

export function NavbarProvider({ children }: _IChildren) {
  const [isVisible, setIsVisible] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState(-1);
  const handleSubmenu = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(-1);
    } else {
      setOpenIndex(index);
    }
  };
  const closeSubMenu = () => setOpenIndex(-1);
  const closeNavbarMenu = () => setNavbarOpen(false);
  const openNavbarMenu = () => setNavbarOpen(true);
  const toggleNavbar = (arg: boolean) => setNavbarOpen(!arg);

  const handleScroll = () => {
    const currentScrollPos = window.scrollY;
    const reasonableScrollDistance = 300;

    if (currentScrollPos >= reasonableScrollDistance) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const handleStickyNavbar = useCallback(() => {
    const currentScrollPosition = window.scrollY;
    const distance = 80;

    if (navbarOpen) {
      setSticky(true);
    } else {
      if (currentScrollPosition >= distance) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    }
  }, [sticky, navbarOpen]);

  useEffect(() => {
    window.addEventListener("scroll", handleStickyNavbar);

    return () => {
      window.removeEventListener("scroll", handleStickyNavbar);
    };
  }, [handleStickyNavbar]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const contextValue = {
    isVisible,
    sticky,
    navbarOpen,
    openIndex,
    toggleNavbar,
    handleStickyNavbar,
    handleSubmenu,
    closeSubMenu,
    closeNavbarMenu,
  };

  return (
    <NavbarContext.Provider value={contextValue}>
      {children}
    </NavbarContext.Provider>
  );
}

export const useNavbar = () => {
  const context = useContext(NavbarContext);
  if (!context) {
    throw new Error("useNavbar must be used within a NavbarProvider");
  }
  return context;
};
