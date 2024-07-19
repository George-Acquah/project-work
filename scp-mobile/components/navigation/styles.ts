import { SHARED_COLORS } from "@/constants/Colors";
import { SIZES } from "@/constants/styles";
import { StyleSheet } from "react-native";

export const generateHomeStyles = (colorScheme: "light" | "dark") => {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
    overlay: {
      position: "absolute",
      top: 40,
      left: 10,
      right: 10,
      backgroundColor:
        colorScheme === "light" ? SHARED_COLORS.gray50 : SHARED_COLORS.gray100,
      padding: SIZES.padding * 0.6,
      borderRadius: 8,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    searchButton: {
      position: "absolute",
      top: 60,
      left: 10,
      right: 10,
      backgroundColor: 'white',
      paddingHorizontal: SIZES.padding * 0.6,
      paddingVertical: SIZES.padding * 0.4,
      shadowColor: "#000",
      borderRadius: 30,
      shadowOffset: { width: 4, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 10,
      // height: 30
    },
    toggleButton: {
      position: "absolute",
      bottom: 10,
      right: 10,
      backgroundColor:
        colorScheme === "light" ? SHARED_COLORS.gray50 : SHARED_COLORS.gray300,
      padding: 10,
      borderRadius: 50,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
  });
};
