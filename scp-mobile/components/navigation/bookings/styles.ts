import { LIGHT_THEME, SHARED_COLORS } from "@/constants/Colors";
import { SIZES } from "@/constants/styles";
import { StyleSheet } from "react-native";

const generateBookingStyles = (colorScheme: "light" | "dark") => {
  return StyleSheet.create({
    tabItemContainer: {
      overflow: "hidden",
      padding: 4,
      borderRadius: 4, // Assuming "sm" represents a small value for borderRadius
    },
    tabItemSubContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: SIZES.base,
    },
    tabItemContainerBorder: {
      borderWidth: colorScheme === "light" ? 0 : 1,
      borderColor:
        colorScheme === "light" ? "transparent" : LIGHT_THEME.backgroundPrimary,
    },
    tabItemContainerButton: {
      marginTop: "auto",
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
    },
    tabItem: {
      paddingHorizontal: 2,
      justifyContent: "center",
    },
    tabItemText: {
      fontSize: 16, // Adjust font size
      color: "#fff",
    },
    tabItemTextActive: {
      backgroundColor: "#fff", // Active tab text color
      color:
        colorScheme === "light"
          ? LIGHT_THEME.primary700
          : LIGHT_THEME.primary700,
      fontWeight: "bold", // Adjust font weight for active state
      borderWidth: 2,
      borderColor:
        colorScheme === "light"
          ? LIGHT_THEME.primary700
          : LIGHT_THEME.primary700,
      shadowColor:
        colorScheme === "light"
          ? LIGHT_THEME.primary700
          : LIGHT_THEME.primary700,
      shadowOffset: { width: 0, height: 0 }, // No offset
      shadowOpacity: 0.2, // Adjust opacity for outline strength
      shadowRadius: 20, // Adjust blur for outline softness
    },
    reserve_button: {
      textAlign: "center", // Align text to the center
      color: "white", // Text color
      fontWeight: "bold", // Font weight
      fontSize: 20, // Font size
    },
    duration_input: {
      marginTop: 10, // Margin top of 10 pixels
      width: 300, // Width of 300 pixels
      fontSize: 17, // Font size of 17 pixels
      color: "gray",
    },
    duration_container: {
      flexDirection: "row", // Arrange children in a row
      alignItems: "center", // Align children vertically at the center
      backgroundColor:
        colorScheme === "light" ? SHARED_COLORS.gray100 : SHARED_COLORS.gray900, // Background color
      paddingVertical: 5, // Vertical padding of 5px
      borderRadius: 8, // Rounded corners
      marginTop: 30, // Top margin of 30px
    },
    sub_container: {
      marginVertical: 10, // Margin top and bottom of 10px
      width: 300, // Width of 300px
      fontSize: 17, // Font size of 17px
    },
    container: {
      flex: 1, // Flex grow to fill available space
      flexDirection: "row", // Arrange children in a row
      alignItems: "center", // Align children vertically at the center
      backgroundColor:
        colorScheme === "light" ? SHARED_COLORS.gray100 : SHARED_COLORS.gray900, // Background color
      paddingVertical: 5, // Vertical padding of 5px
      borderRadius: 8, // Rounded corners
      marginHorizontal: 5, // Horizontal margin of 5px
    },
  });
};

export { generateBookingStyles };
