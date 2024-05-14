import { View, Text } from "@/components/Themed";
import Colors, { COLORS } from "@/constants/Colors";
import { FONTS } from "@/constants/fonts";
import { SIZES_2 } from "@/constants/styles";
import Button from "@/components/common/button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { bg_colors, text_colors } from "./styles";
import { AUTH_MODALS } from "@/constants/root";
import { OtpInput } from "react-native-otp-entry";
import  { Entypo } from "@expo/vector-icons"
import { router } from "expo-router";
import RendererHOC from "@/components/Renderer.HOC";
import TabBarIcon from "@/components/common/Icons";
import { TouchableOpacity } from "react-native";

interface _IOtp {
  from: string;
}
const OTP = ({from}: _IOtp) => {

  const onOTPSubmit = () => {
    //Whenever the submit buton is clicked
    if (from === AUTH_MODALS.SIGNUP) {
      //Navigate to Success Screen After Performing verification of OTP
      router.navigate(
        `/success/?title=${"Account Created"}&description=${"You have successfully created ypur account"}&btnLabel=${"Go to Home"}&route=${"/(auth)/welcome"}&action=${AUTH_MODALS.VEHICLES}`
      );
    } else if (from === AUTH_MODALS.FORGOT) {
      //Navigate to Set up new Password Screen
      router.push("/(auth)/reset-password");
    }
  };

  const renderHeader = () => (
    <View style={{marginTop: SIZES_2.padding}}>
      <TouchableOpacity
        onPress={() => router.back()}
      >
        <TabBarIcon fontProvider={Entypo} name="chevron-left" color="#fff" />
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
          focusColor={COLORS.primary500}
          focusStickBlinkingDuration={500}
          disabled={false}
          onTextChange={(text) => console.log(text)}
          onFilled={(text) => console.log(`OTP is ${text}`)}
          textInputProps={{
            accessibilityLabel: "One-Time Password",
          }}
          theme={{
            pinCodeContainerStyle: {
              backgroundColor: COLORS.backgroundSecondary,
              width: SIZES_2.width / 8,
              height: SIZES_2.width / 8,
              borderWidth: 3,
              borderRadius: SIZES_2.radius,
              borderColor: COLORS.backgroundSecondary,
              marginTop: SIZES_2.padding * 2,
            },
            focusedPinCodeContainerStyle: {
              borderColor: COLORS.gray300,
            },
            focusStickStyle: {
              backgroundColor: COLORS.contentPrimary,
            },
            pinCodeTextStyle: {
              ...FONTS.h3,
              color: COLORS.contentPrimary,
            },
          }}
        />

        {/* Resend Code */}
        <View
          style={{
            flexDirection: "row",
            marginTop: SIZES_2.radius,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ ...FONTS.ps2 }} {...text_colors.signup_label}>
            Didn't receive the code?
          </Text>

          <Button
            title="Resend"
            style={{ backgroundColor: null }}
            additionalTextStyles={{ color: Colors.light.primary }}
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
          marginBottom: SIZES_2.padding,
        }}
      >
        <Button
          additionalStyles={{
            borderRadius: SIZES_2.radius,
            marginTop: SIZES_2.padding,
          }}
          additionalTextStyles={{
            ...FONTS.l2,
            color: COLORS.gray50,
          }}
          type="opacity"
          onPress={() => {
            console.log("clicked");
            onOTPSubmit();
          }}
        >
          <RendererHOC
            loading={false}
            error={null}
            color={COLORS.gray50}
            pad
          >
            <Text style={{ ...FONTS.pr2 }} {...text_colors.title}>
              Verify
            </Text>
          </RendererHOC>
        </Button>
      </View>
    );
  };

  return (
    <View
      style={{ flex: 1, paddingHorizontal: SIZES_2.padding }}
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
          marginTop: SIZES_2.radius,
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
