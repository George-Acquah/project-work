import { ThemedView as View } from "@/components/common/ThemedView";
import { ThemedText as Text } from "@/components/common/ThemedText";
import { FONTS } from "@/constants/fonts";
import Button from "@/components/common/button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { bg_colors, text_colors } from "./styles";
import { AUTH_MODALS } from "@/constants/root";
import { OtpInput } from "react-native-otp-entry";
import { Entypo } from "@expo/vector-icons";
import { router } from "expo-router";
import { TouchableOpacity } from "react-native";
import { useColorScheme } from "@/utils/hooks/useColorScheme";
import { SIZES } from "@/constants/styles";
import { TabBarIcon } from "../navigation/TabBarIcon";
import { DARK_THEME, LIGHT_THEME, SHARED_COLORS } from "@/constants/Colors";
import RendererHOC from "../common/renderer.hoc";

interface _IOtp {
  from?: string;
}
const OTP = ({ from }: _IOtp) => {
  const colorScheme = useColorScheme();
  const onOTPSubmit = () => {
    //Whenever the submit buton is clicked
    if (from === AUTH_MODALS.SIGNUP) {
      //Navigate to Success Screen After Performing verification of OTP
      router.navigate(
        `/success/?title=${"Account Created"}&description=${"You have successfully created ypur account"}&btnLabel=${"Go to Home"}&route=${"/(auth)/welcome"}&action=${
          AUTH_MODALS.VEHICLES
        }`
      );
    } else if (from === AUTH_MODALS.FORGOT) {
      //Navigate to Set up new Password Screen
      router.push("/(auth)/reset-password");
    }
  };

  const renderHeader = () => (
    <View style={{ marginTop: SIZES.padding }}>
      <TouchableOpacity onPress={() => router.back()}>
        <TabBarIcon
          fontProvider={Entypo}
          name="chevron-left"
          color={
            colorScheme === "light"
              ? LIGHT_THEME.contentPrimary
              : DARK_THEME.contentPrimary
          }
        />
      </TouchableOpacity>
    </View>
  );

  const renderTitle = () => {
    return (
      <View>
        {/* TITLE */}
        <Text style={[{ ...FONTS.h2 }]} {...text_colors.title}>
          Enter the OTP code
        </Text>
        {/* Description */}
        <Text style={[{ ...FONTS.ps2 }]} {...text_colors.description}>
          To confirm the account, enter the 6-digit code we sent to your email
          address
        </Text>
      </View>
    );
  };

  const renderOTP = () => {
    return (
      <View style={{ flex: 1 }}>
        {/* OTP Input */}
        <OtpInput
          numberOfDigits={6}
          focusColor={
            colorScheme === "light"
              ? LIGHT_THEME.primary500
              : DARK_THEME.primary500
          }
          focusStickBlinkingDuration={500}
          disabled={false}
          onTextChange={(text) => console.log(text)}
          onFilled={(text) => console.log(`OTP is ${text}`)}
          textInputProps={{
            accessibilityLabel: "One-Time Password",
          }}
          theme={{
            pinCodeContainerStyle: {
              backgroundColor:
                colorScheme === "light"
                  ? LIGHT_THEME.backgroundSecondary
                  : DARK_THEME.backgroundSecondary,
              width: SIZES.width / 8,
              height: SIZES.width / 8,
              borderWidth: 3,
              borderRadius: SIZES.radius,
              borderColor:
                colorScheme === "light"
                  ? LIGHT_THEME.backgroundSecondary
                  : DARK_THEME.backgroundSecondary,
              marginTop: SIZES.padding * 2,
            },
            focusedPinCodeContainerStyle: {
              borderColor: SHARED_COLORS.gray300,
            },
            focusStickStyle: {
              backgroundColor:
                colorScheme === "light"
                  ? LIGHT_THEME.contentPrimary
                  : DARK_THEME.contentPrimary,
            },
            pinCodeTextStyle: {
              ...FONTS.h3,
              color:
                colorScheme === "light"
                  ? LIGHT_THEME.contentPrimary
                  : DARK_THEME.contentPrimary,
            },
          }}
        />

        {/* Resend Code */}
        <View
          style={{
            flexDirection: "row",
            marginTop: SIZES.radius,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ ...FONTS.ps2 }} {...text_colors.signup_label}>
            Didn't receive the code?
          </Text>

          <Button
            title="Resend"
            style={{ backgroundColor: undefined }}
            additionalTextStyles={{ color:LIGHT_THEME.primary500 }}
            type="opacity"
          />
        </View>
      </View>
    );
  };

  const renderFooter = () => {
    return (
      <View
        style={{
          marginBottom: SIZES.padding,
        }}
      >
        <Button
          additionalStyles={{
            borderRadius: SIZES.radius,
            marginTop: SIZES.padding,
          }}
          additionalTextStyles={{
            ...FONTS.l2,
            color: SHARED_COLORS.gray50,
          }}
          type="opacity"
          onPress={() => {
            console.log("clicked");
            onOTPSubmit();
          }}
        >
          <RendererHOC loading={false} error={null} color={SHARED_COLORS.gray50} pad>
            <Text style={{ ...FONTS.pr2 }} {...text_colors.main_title}>
              Verify
            </Text>
          </RendererHOC>
        </Button>
      </View>
    );
  };

  return (
    <View
      style={{ flex: 1, paddingHorizontal: SIZES.padding }}
      {...bg_colors.main}
    >
      {/* Header */}
      {renderHeader()}

      <KeyboardAwareScrollView
        enableOnAndroid={true}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps={"handled"}
        extraScrollHeight={-300}
        contentContainerStyle={{
          flexGrow: 1,
          marginTop: SIZES.radius,
        }}
      >
        {/* Title and Description */}
        {renderTitle()}

        {/* OTP */}
        {renderOTP()}

        {/* Footer */}
        {renderFooter()}
      </KeyboardAwareScrollView>
    </View>
  );
};

export default OTP;
