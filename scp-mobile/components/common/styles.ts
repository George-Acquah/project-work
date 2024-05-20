import { StyleSheet } from "react-native";
import { DARK_THEME, LIGHT_THEME, SHARED_COLORS } from "@/constants/Colors";

// Function to generate styles dynamically based on color scheme
const generateStyles = (colorScheme: 'light' | 'dark') => {
  return StyleSheet.create({
    button: {
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 8,
      borderWidth: 1,
      borderColor:
        colorScheme === "light"
          ? LIGHT_THEME.primary700
          : LIGHT_THEME.primary700,
      backgroundColor:
        colorScheme === "light"
          ? LIGHT_THEME.primary700
          : LIGHT_THEME.primary700,
    },
    defaultButton: {
      borderColor:
        colorScheme === "light"
          ? LIGHT_THEME.primary700
          : LIGHT_THEME.primary700,
      backgroundColor:
        colorScheme === "light"
          ? LIGHT_THEME.primary700
          : LIGHT_THEME.primary700,
    },
    destructiveButton: {
      backgroundColor: "rgba(239, 68, 68, 0.8)",
      borderColor: "#EF4444",
    },
    outlineButton: {
      backgroundColor: "transparent",
      borderColor:
        colorScheme === "light" ? SHARED_COLORS.gray400 : SHARED_COLORS.gray500,
    },
    secondaryButton: {
      backgroundColor:
        colorScheme === "light" ? SHARED_COLORS.gray300 : SHARED_COLORS.gray700,
      borderColor: "transparent",
    },
    ghostButton: {
      backgroundColor: "transparent",
      borderColor: "transparent",
    },
    linkButton: {
      backgroundColor: "transparent",
      borderColor: "transparent",
    },
    text: {
      fontSize: 16,
    },
    defaultText: {
      color:
        colorScheme === "light"
          ? LIGHT_THEME.contentInversePrimary
          : LIGHT_THEME.contentInversePrimary,
    },
    destructiveText: {
      color: "#FFFFFF",
    },
    outlineText: {
      color:
        colorScheme === "light" ? SHARED_COLORS.gray800 : SHARED_COLORS.gray100,
    },
    secondaryText: {
      color:
        colorScheme === "light"
          ? LIGHT_THEME.contentInversePrimary
          : DARK_THEME.contentInversePrimary,
    },
    ghostText: {
      color:
        colorScheme === "light" ? SHARED_COLORS.gray800 : SHARED_COLORS.gray100,
    },
    linkText: {
      color: "#4F46E5",
    },
  });
};

const generatePaginationStyles = (colorScheme: "light" | "dark") => {
  return StyleSheet.create({
    //Pagination Arrows
    arrowContainer: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 5,
      backgroundColor:
        colorScheme === "light" ? SHARED_COLORS.gray100 : SHARED_COLORS.gray800,
      marginRight: 10,
    },
    containerRight: {
      marginRight: 0,
      marginLeft: 10,
    },
    //Page numbers
    numberContainer: {
      alignItems: "center",
      justifyContent: "center",
      height: 36,
      borderRadius: 5,
      backgroundColor:
        colorScheme === "light" ? SHARED_COLORS.gray100 : SHARED_COLORS.gray800,
      paddingHorizontal: 10,
      paddingVertical: 5,
      marginHorizontal: 2,
    },
    singleContainer: {
      borderRadius: 5,
      backgroundColor:
        colorScheme === "light" ? SHARED_COLORS.gray100 : SHARED_COLORS.gray800,
    },
    activeContainer: {
      backgroundColor:
        colorScheme === "light"
          ? LIGHT_THEME.primary500
          : SHARED_COLORS.gray900,
    },
    inactiveContainer: {
      backgroundColor:
        colorScheme === "light" ? SHARED_COLORS.gray200 : SHARED_COLORS.gray700,
    },
    middleContainer: {
      backgroundColor: "transparent",
    },
    pagText: {
      fontSize: 16,
      fontWeight: "bold",
      color:
        colorScheme === "light" ? SHARED_COLORS.gray900 : SHARED_COLORS.gray100,
    },
    activeText: {
      color:
        colorScheme === "light" ? SHARED_COLORS.gray100 : SHARED_COLORS.gray900,
    },
    inactiveText: {
      color:
        colorScheme === "light" ? SHARED_COLORS.gray500 : SHARED_COLORS.gray400,
    },

    // Pagination Return
    container: {
      width: "100%",
      paddingHorizontal: 4,
    },
    paginationContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingTop: 4,
    },
    pageNumbersContainer: {
      flexDirection: "row",
      marginHorizontal: 1,
    },
  });
};

export { generateStyles, generatePaginationStyles };
