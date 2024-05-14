import { DARK_THEME, LIGHT_THEME } from "@/constants/Colors";

export const text_colors = {
  title: {
    lightColor: LIGHT_THEME.contentPrimary,
    darkColor: DARK_THEME.contentPrimary,
  },
  description: {
    lightColor: LIGHT_THEME.contentInverseSecondary,
    darkColor: DARK_THEME.contentInverseSecondary,
  },
  signup_label: {
    lightColor: LIGHT_THEME.contentSecondary,
    darkColor: DARK_THEME.contentSecondary,
  },
  terms: {
    lightColor: LIGHT_THEME.primary400,
    darkColor: DARK_THEME.primary400,
  },
};


export const bg_colors = {
  input_container: {
    lightColor: LIGHT_THEME.backgroundSecondary,
    darkColor: DARK_THEME.backgroundSecondary,
  },
  main: {
    lightColor: LIGHT_THEME.backgroundPrimary,
    darkColor: DARK_THEME.backgroundPrimary,
  },
};