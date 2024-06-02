import { DARK_THEME, LIGHT_THEME, SHARED_COLORS } from "@/constants/Colors";
import { SIZES, width } from "@/constants/styles";
import { FONTS } from "@/constants/fonts";
import { StyleSheet } from "react-native";

const generateParkingCenterStyles = (colorScheme: "light" | "dark") => {
  const WIDTH = width;
  return StyleSheet.create({
    centerContainer: {
      position: "relative",
    },
    addCenterTitle: {
      ...FONTS.h1,
      textAlign: "center",
    },
    centerDetailsContainer: {
      padding: 16,
      // Add other styling as needed
    },
    centerName: {
      fontSize: 24,
      fontWeight: "bold",
      // Add other styling as needed
    },
    centerAddress: {
      fontSize: 16,
      color: "gray",
      // Add other styling as needed
    },
    centerDescription: {
      fontSize: 14,
      marginTop: 8,
      // Add other styling as needed
    },
    slotAvailabilityContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 8,
    },
    slotAvailabilityText: {
      marginLeft: 8,
      fontSize: 14,
      // Add other styling as needed
    },
    plusButton: {
      // borderWidth: 30,
      borderRadius: 30,
      position: "absolute",
      bottom: 10,
      right: 10,
      borderColor: SHARED_COLORS.positive200,
    },
    plusIcon: {},
    ownerOptionsContainer: {
      marginLeft: SIZES.padding * 0.2,
      gap: 10,
      flexGrow: 1,
    },
    userOptionsButton: {
      margin: 10
    },
    userOptionsButtonOwner: {
      marginRight: SIZES.padding * 3.0,
      marginLeft: 10,
      marginBottom: 10,
    },
    ownerOptionsSubContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
    },
    ownerOptionsButton: {
      margin: 10,
      borderRadius: 30,
    },
    ownerIcon: {
      color:
        colorScheme === "light" ? SHARED_COLORS.gray800 : SHARED_COLORS.gray50,
    },
    detachedModal: {
      width: SIZES.padding * 8,
      borderRadius: SIZES.radius * 1.5,
      marginLeft: WIDTH - SIZES.padding * 8.4,
      flex: 1,
    },
    detachedBackground: {
      backgroundColor:
        colorScheme === "light" ? SHARED_COLORS.gray200 : SHARED_COLORS.gray700,
    },
  });
};

const generateCenterDetailsImageStyles = (colorScheme: 'light' | 'dark') => {
  return StyleSheet.create({
    headerContainer: {
      // flex: 1,
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
    },
    imageButton: {
      borderRadius: 30,
      position: "absolute",
      bottom: 10,
      right: 10,
      borderColor: SHARED_COLORS.positive200,
    },
  });
}

export { generateParkingCenterStyles, generateCenterDetailsImageStyles };
