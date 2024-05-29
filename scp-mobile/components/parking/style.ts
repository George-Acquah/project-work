import { DARK_THEME, LIGHT_THEME, SHARED_COLORS } from "@/constants/Colors";
import { SIZES } from "@/constants/styles";
import { FONTS } from "@/constants/fonts";
import { StyleSheet } from "react-native";

const generateParkingCenterStyles = (colorScheme: "light" | "dark") => {
  return StyleSheet.create({
    addCenterTitle: {
      ...FONTS.h1,
      textAlign: 'center'
    }
  });
};

export { generateParkingCenterStyles };
