"use client";

import { useTheme } from "@/utils/contexts/theme-contexts";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";

const LightIcon = () => {
  const { setTheme } = useTheme();
  return (
    <SunIcon
      onClick={() => setTheme('light')}
      className="p-1 fill-content-strong-dark  text-3xl cursor-pointer rounded-full hover:drop-shadow-md border-custom-background-primary-dark dark:hover:border-x hover:transition hover:ease-out duration-300 "
    />
  );
};

const DarkIcon = () => {
  const { setTheme } = useTheme();
  return (
    <MoonIcon
      onClick={() => setTheme("dark")}
      className="p-1 fill-content-strong-light text-3xl cursor-pointer rounded-full hover:drop-shadow-md hover:border-x border-navbarPrimary hover:transition hover:ease-out duration-300"
    />
  );
};