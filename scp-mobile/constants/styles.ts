import { Dimensions } from "react-native";
export const { width, height } = Dimensions.get("window");

const SIZES = {
  xSmall: 10,
  small: 12,
  medium: 16,
  large: 20,
  xLarge: 24,
  xxLarge: 32,

  // global sizes
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,
  margin: 20,

  // font sizes
  t1: 52,
  t2: 44,
  t3: 36,

  h1: 32,
  h2: 28,
  h3: 24,
  h4: 20,

  l1: 18,
  l2: 16,
  l3: 14,
  l4: 12,

  ps1: 18,
  ps2: 16,
  ps3: 14,
  ps4: 12,

  pr1: 18,
  pr2: 16,
  pr3: 14,
  pr4: 12,

  // app dimensions
  width,
  height,
};

const baseStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 5,
  fontSize: 16, // Base font size
  outline: "none",
  transition: "all 0.3s ease-in-out",
};

export { SIZES, baseStyles };
