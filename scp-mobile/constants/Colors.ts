/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};

export const SHARED_COLORS = {
  // Gray
  gray50: "#F6F6F6",
  gray100: "#EEEEEE",
  gray200: "#E2E2E2",
  gray300: "#CBCBCB",
  gray400: "#AFAFAF",
  gray500: "#6B6B6B",
  gray600: "#545454",
  gray700: "#333333",
  gray800: "#1F1F1F",
  gray900: "#141414",

  // Positive
  positive50: "#E6F2ED",
  positive100: "#ADDEC9",
  positive200: "#66D19E",
  positive300: "#06C167",
  positive400: "#048848",
  positive500: "#03703C",
  positive600: "#03582F",
  positive700: "#10462D",

  // Negative
  negative50: "#FFEFED",
  negative100: "#FED7D2",
  negative200: "#F1998E",
  negative300: "#E85C4A",
  negative400: "#E11900",
  negative500: "#AB1300",
  negative600: "#870F00",
  negative700: "#5A0A00",

  // Warning
  warning50: "#FFFAF0",
  warning100: "#FFF2D9",
  warning200: "#FFE3AC",
  warning300: "#FFCF70",
  warning400: "#FFC043",
  warning500: "#BC8B2C",
  warning600: "#996F00",
  warning700: "#674D1B",
};

export const LIGHT_THEME = {
  // Primary (Green)
  primary50: "#F6FDFB",
  primary100: "#EBF2F0",
  primary200: "#CCE0DF",
  primary300: "#AACCAD",
  primary400: "#87C09C",
  primary500: "#63B38E",
  primary600: "#48A57A",
  primary700: "#349864",

  // Background
  backgroundPrimary: "#FFFFFF",
  backgroundSecondary: "#F6F6F6",
  backgroundTertiary: "#E2E2E2",
  backgroundInversePrimary: "#333333",
  backgroundInverseSecondary: "#6B6B6B",

  // Content
  contentPrimary: "#333333",
  contentSecondary: "#6B6B6B",
  contentTertiary: "#AFAFAF",
  contentInversePrimary: "#FFFFFF",
  contentInverseSecondary: "#CBCBCB",
  contentInverseTertiary: "#EEEEEE",
};

export const DARK_THEME = {
  // Primary (Green)
  primary50: "#000000",
  primary100: "#1F1F1F",
  primary200: "#333333",
  primary300: "#545454",
  primary400: "#6B6B6B",
  primary500: "#AFAFAF",
  primary600: "#CBCBCB",
  primary700: "#EEEEEE",

  // Background
  backgroundPrimary: "#1F1F1F",
  backgroundSecondary: "#333333",
  backgroundTertiary: "#545454",
  backgroundInversePrimary: "#CBCBCB",
  backgroundInverseSecondary: "#AFAFAF",

  // Content
  contentPrimary: "#FFFFFF",
  contentSecondary: "#CBCBCB",
  contentTertiary: "#AFAFAF",
  contentInversePrimary: "#000000",
  contentInverseSecondary: "#545454",
  contentInverseTertiary: "#6B6B6B",
};
