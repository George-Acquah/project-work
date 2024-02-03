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
  const [isMobile, setIsMobile] = useState(false);

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

  const smallScreenSize = 991; // Set your desired small screen size

  const handleMobileView = useCallback(() => {
    const currentScreenWidth = window.innerWidth;

    if (currentScreenWidth >= smallScreenSize) {
      setIsMobile(false);
      setNavbarOpen(false);
    } else {
      setIsMobile(true);
    }
  }, [setIsMobile, setNavbarOpen, smallScreenSize]);

  useEffect(() => {
    window.addEventListener("scroll", handleStickyNavbar);

    return () => {
      window.removeEventListener("scroll", handleStickyNavbar);
    };
  }, [handleStickyNavbar]);

  useEffect(() => {
    const handleResize = () => {
      handleMobileView();
    };

    // Attach the event listener when the component mounts
    window.addEventListener("resize", handleResize);

    // Initial check on component mount
    handleMobileView();

    // Detach the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleMobileView]);

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
    throw new Error("useNavbar must be used within a Navbar Provider");
  }
  return context;
};
