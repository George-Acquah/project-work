import {
  AntDesign,
  Entypo,
  FontAwesome,
  MaterialIcons,
  Ionicons,
} from "@expo/vector-icons";
import { type IconProps } from "@expo/vector-icons/build/createIconSet";
import { type ComponentProps } from "react";

type FontProvider =
  | typeof FontAwesome
  | typeof Ionicons
  | typeof MaterialIcons
  | typeof Entypo
  | typeof AntDesign;

interface _ITabBarIcon {
  fontProvider: FontProvider;
  auth?: boolean;
}

export function TabBarIcon({
  fontProvider,
  name,
  style,
  auth,
  ...rest
}: IconProps<ComponentProps<FontProvider>["name"]> & _ITabBarIcon) {
  const IconComponent = fontProvider;
  return (
    <IconComponent
      size={28}
      name={name}
      style={[
        {
          marginBottom: -3,
          marginLeft: auth ? 8 : 0,
        },
        style,
      ]}
      {...rest}
    />
  );
}