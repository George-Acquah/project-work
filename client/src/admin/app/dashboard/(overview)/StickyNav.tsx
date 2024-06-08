'use client'
import UserMenu from "@/app/ui/dashboard/user-menu";
import { textColor } from "@/app/ui/themes";
import { _ISessionUser } from "@/next-auth";
import { useState, useEffect } from "react";

export const StickyNav = ({ user }: { user?: _ISessionUser }) => {
  // Sticky Navbar
  const [sticky, setSticky] = useState(false);
  const handleStickyNavbar = () => {
    if (window.scrollY >= 100) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleStickyNavbar);
  });

  return (
    <div
      className={`left-0 top-0 z-40 hidden md2:flex justify-between items-center mb-4 md:px-12 md:pb-12 md:pt-4 ml-60 ${textColor} ${
        sticky
          ? "dark:bg-custom-gray-dark dark:shadow-sticky-dark fixed z-[9999] bg-custom-white !bg-opacity-80 shadow-sticky backdrop-blur-sm transition"
          : "absolute bg-custom-transparent"
      }`}
    >
      <h1>Welcome {` ${user?.email}`}</h1>
      <UserMenu user={user} home />
    </div>
  );
};