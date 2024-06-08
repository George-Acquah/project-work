import images from "@/constants/images";
import { ThemedText as Text } from "./ThemedText";
import { ThemedView as View } from "./ThemedView";
import { Image } from "react-native";
import { FONTS } from "@/constants/fonts";
import { SIZES } from "@/constants/styles";
import { text_colors } from "../auth/styles";
import { Entypo } from "@expo/vector-icons";
import { router } from "expo-router";
import { useColorScheme } from "@/utils/hooks/useColorScheme";
import { SHARED_COLORS } from "@/constants/Colors";


interface _INoItemFound {
  description: string;
  title?: string;
}
const NoItemFound = ({ description, title }: _INoItemFound) => {
  const colorScheme = useColorScheme() ?? "light";

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      {/* Success Image */}
      <Image
        source={images.empty}
        resizeMode="contain"
        style={{ width: 300, height: 350 }}
      />

      {/* Title */}
      <Text
        style={{
          ...FONTS.h2,
          textAlign: "center",
          marginTop: SIZES.padding,
        }}
        {...text_colors.title}
      >
        {title ?? "No item found"}
      </Text>

      {/* Description */}
      <Text
        style={{
          ...FONTS.ps2,
          textAlign: "center",
          marginTop: SIZES.radius,
        }}
        {...text_colors.description}
      >
        {description}
      </Text>

      <Entypo
        name="chevron-left"
        size={20}
        color={colorScheme === "light" ? "white" : "black"}
        style={{
          padding: 10,
          backgroundColor:
            colorScheme === "light"
              ? SHARED_COLORS.gray700
              : SHARED_COLORS.gray100,
          width: 40,
          position: "absolute",
          left: 10,
          top: 35,
          borderRadius: 30,
        }}
        onPress={() => router.back()}
      />
    </View>
  );
}

export default NoItemFound;