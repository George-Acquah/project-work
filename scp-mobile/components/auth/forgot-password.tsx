import { ThemedView as View } from "@/components/common/ThemedView";
import { ThemedText as Text } from "@/components/common/ThemedText";
import { FONTS } from "@/constants/fonts";
import Button from "@/components/common/button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { text_colors } from "./styles";
import { AUTH_MODALS } from "@/constants/root";
import { Entypo } from "@expo/vector-icons";
import { router } from "expo-router";
import { TextInput, Alert } from "react-native";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { TabBarIcon } from "../navigation/TabBarIcon";
import { SIZES } from "@/constants/styles";
import { LIGHT_THEME, SHARED_COLORS } from "@/constants/Colors";
import RendererHOC from "../common/renderer.hoc";
import { useColorScheme } from "@/utils/hooks/useColorScheme";
import AuthSchema from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormInputs from "../common/input-form";

interface _IForgotPassword {
  setSelectedScreen: Dispatch<SetStateAction<string>>;
  hideModal: () => void;
}
const ForgotPassword = ({ setSelectedScreen, hideModal }: _IForgotPassword) => {
  const [email, setEmail] = useState("");
  const emailRef = useRef<TextInput>(null);

  const forgotPasswordSchema = AuthSchema.omit({ phone_number: true, password: true });
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(forgotPasswordSchema),
  });

  const colorScheme = useColorScheme() ?? "light";

  const handleForgotPassword = (data: any) => {
    try {
      Alert.alert("Successful", JSON.stringify(data));
      const { email } = data;
      hideModal();
      //Navigate to OTP
      router.navigate(`otp?from=${AUTH_MODALS.FORGOT}`);
    } catch (error: any) {
      console.log("An error occured")
    }
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
        control={control as any}
        name='email'
        rootContainerStyles={{ marginTop: SIZES.padding }}
        label="Email Address"
        placeholder="Enter your email address"
        prependComponent={
          <TabBarIcon
            fontProvider={Entypo}
            name="mail"
            color={colorScheme === "light" ? SHARED_COLORS.gray900 : "white"}
            size={24}
            style={{ marginRight: SIZES.base }}
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
              backgroundColor: undefined,
              height: null,
              marginLeft: SIZES.base,
            }}
            additionalTextStyles={{ color: LIGHT_THEME.primary700 }}
            type="opacity"
            onPress={() => {
              setSelectedScreen(AUTH_MODALS.LOGIN);
            }}
          />
        </View>

        {/* Sign In button */}
        <Button
          additionalStyles={{
            borderRadius: SIZES.padding,
            marginTop: SIZES.padding,
            marginLeft: SIZES.base,
          }}
          additionalTextStyles={{
            ...FONTS.l2,
            color: SHARED_COLORS.gray50,
          }}
          type="opacity"
          onPress={handleSubmit(handleForgotPassword)}
        >
          <RendererHOC
            loading={false}
            error={null}
            color={SHARED_COLORS.gray50}
            pad
          >
            <Text style={{ ...FONTS.pr2 }} {...text_colors.main_title}>
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
          marginTop: SIZES.radius,
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
