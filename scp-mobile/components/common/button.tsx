import React from "react";
import { Pressable, PressableProps, View, Text, TouchableOpacity } from "react-native";
import {FontAwesome } from "@expo/vector-icons"
import { TabBarIcon } from "../navigation/TabBarIcon";
import { generateStyles } from "./styles";
import { useColorScheme } from "@/hooks/useColorScheme"
import { FONTS } from "@/constants/fonts";

interface _IButton extends PressableProps {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "md" | "lg" | "icon";
  additionalStyles?: object;
  additionalTextStyles?: object;
  title?: string;
  icon?: any;
  type?: "opacity" | "pressable";
  iconColor?: string;
  iconSize?: number;
  children?: React.ReactNode;
}

type Ref = View;
const Button = React.forwardRef<Ref, _IButton>(
  (
    {
      variant = "default",
      size = "default",
      title,
      additionalStyles,
      additionalTextStyles,
      icon,
      iconColor,
      iconSize,
      children,
      type,
      ...props
    },
    ref
  ) => {
    const colorScheme = useColorScheme() ?? 'light';
    const button_styles = generateStyles(colorScheme);
    const buttonStyles = React.useMemo(() => {
      let colorStyle: {};
      switch (variant) {
        case "default":
          colorStyle = button_styles.defaultButton;
          break;
        case "destructive":
          colorStyle = button_styles.destructiveButton;
          break;
        case "outline":
          colorStyle = button_styles.outlineButton;
          break;
        case "secondary":
          colorStyle = button_styles.secondaryButton;
          break;
        case "ghost":
          colorStyle = button_styles.ghostButton;
          break;
        case "link":
          colorStyle = button_styles.linkButton;
          break;
        default:
          colorStyle = button_styles.defaultButton;
      }

      return [colorStyle, sizes[size], additionalStyles && additionalStyles]; // Merge styles
    }, [variant, size, additionalStyles]);

    const textStyles = React.useMemo(() => {
      let textStyle: {};
      switch (variant) {
        case "default":
          textStyle = button_styles.defaultText;
          break;
        case "destructive":
          textStyle = button_styles.destructiveText;
          break;
        case "outline":
          textStyle = button_styles.outlineText;
          break;
        case "secondary":
          textStyle = button_styles.secondaryText;
          break;
        case "ghost":
          textStyle = button_styles.ghostText;
          break;
        case "link":
          textStyle = button_styles.linkText;
          break;
        default:
          textStyle = button_styles.defaultText;
      }
      return [textStyle, text_sizes[size], additionalTextStyles && additionalTextStyles]; // Merge styles
    }, [variant, text_sizes, additionalTextStyles]);

    return (
      <>
        {type && type === "opacity" ? (
          <TouchableOpacity
            style={[
              button_styles.button,
              ...buttonStyles,
              sizes[size],
              icon && { flexDirection: "row" },
            ]}
            ref={ref}
            {...props}
          >
            {icon && (
              <TabBarIcon
                fontProvider={FontAwesome}
                name={icon}
                color={iconColor ?? "white"}
                size={iconSize ?? 28}
              />
            )}
            {title ? (
              <Text
                style={[
                  { ...FONTS.ps1  },
                  button_styles.text,
                  ...textStyles,
                  text_sizes[size],
                ]}
              >
                {title}
              </Text>
            ) : (
              children
            )}
          </TouchableOpacity>
        ) : (
          <Pressable
            style={[
              button_styles.button,
              ...buttonStyles,
              sizes[size],
              icon && { flexDirection: "row" },
            ]}
            ref={ref}
            {...props}
          >
            {icon && (
              <TabBarIcon
                fontProvider={FontAwesome}
                name={icon}
                color={iconColor ?? "white"}
                size={iconSize ?? 28}
              />
            )}
            {title ? (
              <Text
                style={[
                  { ...FONTS.ps1 },
                  button_styles.text,
                  ...textStyles,
                  text_sizes[size],
                ]}
              >
                {title}
              </Text>
            ) : (
              children
            )}
          </Pressable>
        )}
      </>
    );
  }
);

const sizes = {
  default: { height: 48, paddingHorizontal: 16 },
  sm: { height: 36, paddingHorizontal: 12 },
  md: { height: 40, paddingHorizontal: 24 },
  lg: { height: 44, paddingHorizontal: 32 },
  icon: { height: 48, width: 48, padding: 0 },
};

const text_sizes = {
  default: { fontSize: 16 },
  sm: { fontSize: 16 },
  md: { fontSize: 18 },
  lg: { fontSize: 20 },
  icon: { fontSize: 26 },
};

export default Button;
