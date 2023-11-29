import { cookies } from "next/headers";
import React, { memo } from "react";
import { clientCookiesKeys } from "../lib/constants";
import { DarkIcon, LightIcon, SetLightTheme } from "./theme-icons";
import { bgColor } from "./themes";

export const ToggleTheme = memo(() => {
    const cookieStore = cookies();
    const themeCookie = cookieStore.get(clientCookiesKeys.THEME);
    const theme = themeCookie?.value;

  return (
    <div
      className={`fixed bottom-4 right-4 cursor-pointer flex items-center justify-center rounded-full z-50 w-8 h-8 ${bgColor}`}
    >
      {theme === "dark" ? <LightIcon /> : <DarkIcon />}
    </div>
  );
});

export default ToggleTheme;
