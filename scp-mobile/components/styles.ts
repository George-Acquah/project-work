import { SHARED_COLORS } from "@/constants/Colors";
import { StyleSheet } from "react-native";

const generageScrollViewStyles = (HEADER_HEIGHT: number) => {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: HEADER_HEIGHT,
      overflow: "hidden",
      zIndex: 1,
    },
    content: {
      flex: 1,
      gap: 16,
    },
  });
};

const generateErrorModalStyles = (colorScheme: "light" | "dark") => {
  return StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor:
        colorScheme === "light" ? "rgba(0, 0, 0, 0.6)" : "rgba(0, 0, 0, 0.9)",
      // Ensure the modal container fills the entire screen, including the safe area
      paddingTop: 0,
      paddingBottom: 0,
    },
    modalContent: {
      width: 320,
      padding: 20,
      backgroundColor:
        colorScheme === "light" ? SHARED_COLORS.gray200 : SHARED_COLORS.gray700,
      borderRadius: 10,
      alignItems: "center",
    },
    errorMessage: {
      marginBottom: 20,
      // fontSize: 16,
      textAlign: "center",
    },
  });
};

export { generageScrollViewStyles, generateErrorModalStyles };
