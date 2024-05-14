import { View, Text } from "@/components/Themed";
import { COLORS } from "@/constants/Colors";
import { FONTS } from "@/constants/fonts";
import { SIZES_2 } from "@/constants/styles";
import Button from "@/components/common/button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { text_colors } from "./styles";
import { AUTH_MODALS } from "@/constants/root";
import { Entypo } from "@expo/vector-icons";
import { router } from "expo-router";
import RendererHOC from "@/components/Renderer.HOC";
import TabBarIcon from "@/components/common/Icons";
import { TextInput } from "react-native";
import { FormInputs } from "./helpers";
import { Dispatch, SetStateAction, useRef, useState } from "react";

interface _IForgotPassword {
  setSelectedScreen: Dispatch<SetStateAction<string>>;
  hideModal?: () => void;
}
const ForgotPassword = ({ setSelectedScreen, hideModal }: _IForgotPassword) => {
  const [email, setEmail] = useState("");
  const emailRef = useRef<TextInput>();

  const handleForgotPassword = () => {
    hideModal();
    //Navigate to OTP
    router.navigate(`otp?from=${AUTH_MODALS.FORGOT}`);
  };
  const renderTitle = () => {
    return (
      <View>
        {/* TITLE */}
        <Text style={[{ ...FONTS.h2 }]} {...text_colors.title}>
          Forgot Password
        </Text>
        {/* Description */}
        <Text style={[{ ...FONTS.ps2 }]} {...text_colors.description}>
          Please enter your email address to get verification code
        </Text>
      </View>
    );
  };

  const renderFormInputs = () => (
    <>
      {/* Email */}
      <FormInputs
        ref={emailRef}
        rootContainerStyles={{ marginTop: SIZES_2.padding }}
        label="Email Address"
        placeholder="Enter your email address"
        value={email}
        onChangeText={(text) => setEmail(text)}
        prependComponent={
          <TabBarIcon
            fontProvider={Entypo}
            name="mail"
            color={"white"}
            size={24}
            styles={{ marginRight: SIZES_2.base }}
          />
        }
      />
    </>
  );

  const renderFooter = () => {
    return (
      <View>
        {/* Sign Up Label */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ ...FONTS.pr2 }} {...text_colors.signup_label}>
            Already have an account?
          </Text>
          <Button
            title="Login"
            style={{
              backgroundColor: null,
              height: null,
              marginLeft: SIZES_2.base,
            }}
            additionalTextStyles={{ color: COLORS.primary400 }}
            type="opacity"
            onPress={() => {
              setSelectedScreen(AUTH_MODALS.LOGIN);
            }}
          />
        </View>

        {/* Sign In button */}
        <Button
          additionalStyles={{
            borderRadius: SIZES_2.padding,
            marginTop: SIZES_2.padding,
            marginLeft: SIZES_2.base,
          }}
          additionalTextStyles={{
            ...FONTS.l2,
            color: COLORS.gray50,
          }}
          type="opacity"
          onPress={handleForgotPassword}
        >
          <RendererHOC loading={false} error={null} color={COLORS.gray50} pad>
            <Text style={{ ...FONTS.pr2 }} {...text_colors.title}>
              Submit
            </Text>
          </RendererHOC>
        </Button>
      </View>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps={"always"}
        extraScrollHeight={-300}
        contentContainerStyle={{
          flexGrow: 1,
          marginTop: SIZES_2.radius,
        }}
      >
        {/* Title and Description */}
        {renderTitle()}

        {/* Form Inputs */}
        {renderFormInputs()}
      </KeyboardAwareScrollView>
      {/* Footer */}
      {renderFooter()}
    </View>
  );
};

export default ForgotPassword;
