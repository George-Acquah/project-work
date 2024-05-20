import { getCookie, setCookie } from "cookies-next";

// Define a type for your theme
export const themeKey = "general-theme";

export const getThemeCookie = () =>
  getCookie(themeKey) as _IThemeType | undefined;
export const setThemeCookie = (theme: _IThemeType) =>
  setCookie(themeKey, theme, { maxAge: 30 * 24 * 60 * 60 });
