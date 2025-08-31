import images from "@/constants/images";
import { ThemedText as Text } from "./ThemedText";
import { ThemedView as View } from "./ThemedView";
import { Image } from "react-native";
import { FONTS } from "@/constants/fonts";
import { SIZES } from "@/constants/styles";
import { text_colors } from "../auth/styles";
import Button from "./button";

interface _IErrorComponent {
  title?: string;
  onRetry?: () => void; // Add onRetry prop
  size?:  'xs' | 'sm' | 'md' | 'lg';
}

const ErrorComponent = ({ title, onRetry, size = 'lg' }: _IErrorComponent) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      {/* Error Image */}
      <Image
        source={images.error}
        resizeMode="contain"
        style={{ width: 300, height: size === 'lg' ? 350 : size === 'md' ? 250 : size === 'sm' ? 150 : 100 }}
      />
      {/* Description */}
      <Text
        style={{
          ...FONTS.ps1,
          textAlign: "center",
          marginTop: SIZES.radius,
        }}
        {...text_colors.description}
      >
        {title ?? "Something went wrong"}
      </Text>

      {/* Retry Button */}
      <Button
        additionalStyles={{
          borderRadius: SIZES.radius * 0.1,
          marginTop: SIZES.padding,
          paddingHorizontal: 20
        }}
        additionalTextStyles={{ ...FONTS.pr1 }}
        type={onRetry ? 'opacity' : 'pressable'}
        onPress={onRetry} // Call the onRetry function
        title="Retry"
        size="md"
      />
    </View>
  );
};

export default ErrorComponent;