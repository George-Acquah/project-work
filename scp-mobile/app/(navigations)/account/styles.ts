import { LIGHT_THEME } from "@/constants/Colors";
import { SIZES } from "@/constants/styles";
import { StyleSheet } from "react-native";

const bg_styles = {
  container: {
    lightColor: "",
    darkColor: ''
  },
}

const generateAccountIndexStyles = (colorScheme: 'light' | 'dark') => {
  return StyleSheet.create({
    card: {
      height: 100,
      backgroundColor:
        colorScheme === "light"
          ? LIGHT_THEME.primary700
          : LIGHT_THEME.primary700, // Might use gray
      marginTop: 10,
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
      marginHorizontal: 10,
      width: 105,
    },
    option: {
      height: 120,
      backgroundColor:
        colorScheme === "light"
          ? LIGHT_THEME.primary700
          : LIGHT_THEME.primary700, // Might use gray
      marginTop: 15,
      borderRadius: 10,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: SIZES.base,
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


export { generateAccountIndexStyles }