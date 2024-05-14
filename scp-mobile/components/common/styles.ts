
import { StyleSheet } from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { DARK_THEME, LIGHT_THEME, SHARED_COLORS } from "@/constants/Colors";

const colorScheme = useColorScheme() ?? "light";
const button_styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor:
      colorScheme === "light"
        ? LIGHT_THEME.backgroundInversePrimary
        : DARK_THEME.backgroundInversePrimary,
    backgroundColor:
      colorScheme === "light"
        ? LIGHT_THEME.backgroundPrimary
        : DARK_THEME.backgroundPrimary,
  },
  defaultButton: {
    borderColor:
      colorScheme === "light"
        ? LIGHT_THEME.backgroundInversePrimary
        : DARK_THEME.backgroundInversePrimary,
    backgroundColor:
      colorScheme === "light"
        ? LIGHT_THEME.backgroundPrimary
        : DARK_THEME.backgroundPrimary,
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
        ? LIGHT_THEME.contentPrimary
        : DARK_THEME.contentPrimary,
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


export {
  button_styles
}