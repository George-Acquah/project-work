import { DARK_THEME, LIGHT_THEME, SHARED_COLORS } from "@/constants/Colors";

export const text_colors = {
  title: {
    lightColor: LIGHT_THEME.contentPrimary,
    darkColor: DARK_THEME.contentPrimary,
  },
  main_title: {
    lightColor: LIGHT_THEME.backgroundPrimary,
    darkColor: DARK_THEME.backgroundPrimary,
  },
  description: {
    lightColor: LIGHT_THEME.contentSecondary,
    darkColor: DARK_THEME.contentInverseSecondary,
  },
  signup_label: {
    lightColor: LIGHT_THEME.contentSecondary,
    darkColor: DARK_THEME.contentSecondary,
  },
  terms: {
    lightColor: LIGHT_THEME.primary700,
    darkColor: LIGHT_THEME.primary700,
  },
  error: {
    lightColor: SHARED_COLORS.negative500,
    darkColor: SHARED_COLORS.negative500,
  },
};


export const bg_colors = {
  input_container: {
    lightColor: SHARED_COLORS.gray300,
    darkColor: DARK_THEME.backgroundSecondary,
  },
  main: {
    lightColor: LIGHT_THEME.backgroundPrimary,
    darkColor: DARK_THEME.backgroundPrimary,
  },
  scroll_view: {
    lightColor: "#D0D0D0",
    darkColor: "#353636",
  },
};