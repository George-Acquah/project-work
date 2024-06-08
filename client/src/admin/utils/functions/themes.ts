import { themeKey } from "@/constants/theme.constants";
import { getCookie, setCookie } from "cookies-next";

export const getThemeCookie = () =>
  getCookie(themeKey) as _IThemeType | undefined;
export const setThemeCookie = (theme: _IThemeType) =>
  setCookie(themeKey, theme, { maxAge: 30 * 24 * 60 * 60 });
