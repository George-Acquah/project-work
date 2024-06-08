import { DARK_THEME, LIGHT_THEME, SHARED_COLORS } from "@/constants/Colors";
import { SIZES } from "@/constants/styles";
import { StyleSheet } from "react-native";

const bg_styles = {
  container: {
    lightColor: SHARED_COLORS.gray200,
    darkColor: SHARED_COLORS.gray700,
  },
};

const text_styles = {
  container: {
    lightColor: SHARED_COLORS.gray900,
    darkColor: DARK_THEME.contentPrimary,
  },
  sub: {
    lightColor: SHARED_COLORS.gray700,
    darkColor: SHARED_COLORS.gray200,
  },
};

const generateAccountIndexStyles = (colorScheme: "light" | "dark") => {
  return StyleSheet.create({
    card: {
      height: 100,
      backgroundColor:
        colorScheme === "light" ? SHARED_COLORS.gray200 : SHARED_COLORS.gray700, // Might use gray
      borderRadius: 10,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      width: 100,
    },
    option: {
      height: 100,
      backgroundColor:
        colorScheme === "light"
          ? LIGHT_THEME.primary700
          : LIGHT_THEME.primary700, // Might use gray
      marginTop: 15,
      borderRadius: 10,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: SIZES.base,
      paddingHorizontal: SIZES.base * 1.5,
      marginHorizontal: 10,
    },
    subtitle: {
      color:
        colorScheme === "light"
          ? LIGHT_THEME.contentPrimary
          : LIGHT_THEME.contentPrimary, //"#181D31"
      marginTop: 10,
      fontWeight: "bold",
      fontSize: 16,
    },
    headerImage: {
      color: "#808080",
      bottom: -90,
      left: -35,
      position: "absolute",
    },
  });
};

export { generateAccountIndexStyles, bg_styles, text_styles };
