"use client";
import React from "react";
import { bgColor } from "./themes";
import { useTheme } from "../../utils/contexts/theme.context";
import { SvgSun, SvgMoon } from "./icons";
const themeClass = `fixed bottom-4 right-4 cursor-pointer flex items-center justify-center rounded-full z-50 w-8 h-8 ${bgColor}`;

const ThemeToggler = () => {
  const { theme, setTheme } = useTheme();
  return (
    <button
      aria-label="theme toggler"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={themeClass}
    >
      <SvgSun />
      <SvgMoon />
    </button>
  );
};

export default ThemeToggler;
