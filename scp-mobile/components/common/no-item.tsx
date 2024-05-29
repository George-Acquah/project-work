import images from "@/constants/images";
import { ThemedText as Text } from "./ThemedText";
import { ThemedView as View } from "./ThemedView";
import { Image } from "react-native";
import { FONTS } from "@/constants/fonts";
import { SIZES } from "@/constants/styles";
import { text_colors } from "../auth/styles";

interface _INoItemFound {
  description: string;
}
const NoItemFound = ({ description }: _INoItemFound) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
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
        No item found
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
    </View>
  );
}

export default NoItemFound;