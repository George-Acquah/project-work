import { ThemedView as View } from "@/components/common/ThemedView";
import { ThemedText as Text } from "@/components/common/ThemedText";
import { FONTS } from "@/constants/fonts";
import { router } from "expo-router";
import { Image, TouchableOpacity } from "react-native";
import Button from "@/components/common/button";
import { SIZES } from "@/constants/styles";
import { SHARED_COLORS } from "@/constants/Colors";
import { bg_colors, text_colors } from "../auth/styles";
import images from "@/constants/images";

interface _ISuccess {
  title: string;
  description: string;
  btnLabel: string;
  route: string;
  secBtnLabel?: string;
  secRoute?: string;
  action?: string;
}
const SuccessComponent = ({
  title,
  description,
  btnLabel,
  route,
  action,
  secBtnLabel,
  secRoute
}: _ISuccess) => {
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: SIZES.padding,
      }}
      {...bg_colors.main}
    >
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {/* Success Image */}
        <Image
          source={images.success}
          resizeMode="contain"
          style={{ width: 150, height: 150 }}
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
          {title}
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
      {/* Footer */}
      {secBtnLabel !== undefined && secRoute !== undefined && (
        <TouchableOpacity
          onPress={() => {
            router.navigate(secRoute);
          }}
        >
          <Text
            style={{ ...FONTS.ps2, textAlign: "center" }}
            {...text_colors.terms}
          >
            {secBtnLabel}
          </Text>
        </TouchableOpacity>
      )}
      <Button
        additionalStyles={{
          borderRadius: SIZES.radius,
          marginTop: SIZES.padding,
          marginBottom: SIZES.padding,
        }}
        additionalTextStyles={{
          ...FONTS.l2,
          color: SHARED_COLORS.gray50,
        }}
        title={btnLabel}
        type="opacity"
        onPress={() => {
          action !== undefined
            ? router.navigate(`${route}?action=${action}`)
            : router.navigate(route);
        }}
      />
    </View>
  );
};

export default SuccessComponent;
