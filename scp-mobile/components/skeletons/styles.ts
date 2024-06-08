import { SHARED_COLORS, DARK_THEME } from "@/constants/Colors";
import { SIZES } from "@/constants/styles";
import { StyleSheet } from "react-native"

const generateRootSkeletonStyles = (colorScheme: 'light' | 'dark') => {
  return StyleSheet.create({
    shape: {
      justifyContent: "center",
      height: 250,
      width: 250,
      borderRadius: 25,
      marginRight: 10,
      backgroundColor: "white",
    },
    container: {
      flex: 1,
      justifyContent: "center",
    },
    padded: {
      padding: 16,
    },
  });
}

const generateCenterFormSkeletonStyles = (colorScheme: "light" | "dark") => {
  return StyleSheet.create({
    shape: {
      justifyContent: "center",
      height: 250,
      width: 250,
      borderRadius: 25,
      marginRight: 10,
      backgroundColor: "white",
    },
    container: {
      flex: 1,
      justifyContent: "center",
    },
    padded: {
      padding: 16,
    },
    center_items: {
      justifyContent: "center",
      alignItems: "center",
    },
    iconWithTextContainer: {
      flexDirection: "row",
      height: 50,
      borderRadius: SIZES.radius,
      paddingHorizontal: SIZES.radius,
      alignItems: "center",
      backgroundColor:
        colorScheme === "light"
          ? SHARED_COLORS.gray300
          : DARK_THEME.backgroundSecondary,
    },
  });
};

export {
  generateRootSkeletonStyles,
  generateCenterFormSkeletonStyles
}