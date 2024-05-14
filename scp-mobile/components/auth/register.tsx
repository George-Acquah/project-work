import { View, Text } from "@/components/Themed";
import Colors, { COLORS } from "@/constants/Colors";
import { FONTS } from "@/constants/fonts";
import { SIZES_2 } from "@/constants/styles";
import { Alert, TextInput, TouchableOpacity } from "react-native";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import TabBarIcon from "@/components/common/Icons";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import Button from "@/components/common/button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { text_colors } from "./styles";
import { AUTH_MODALS } from "@/constants/root";
import { router } from "expo-router";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/useRedux";
import { unwrapResult } from "@reduxjs/toolkit";
import { register, selectAuthLoading } from "@/features/auth/auth.slice";
import RendererHOC from "@/components/Renderer.HOC";
import { FormInputs } from "./helpers";

interface _IRegister {
  setSelectedScreen: Dispatch<SetStateAction<string>>;
  hideModal: () => void;
}
const Register = ({ setSelectedScreen, hideModal }: _IRegister) => {
  const phoneNumberRef = useRef<TextInput>();
  const passwordRef = useRef<TextInput>();
  const emailRef = useRef<TextInput>();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useAppDispatch();
  const registerLoading = useAppSelector(selectAuthLoading);

  const handleRegister = async () => {
    try {
      const result = await dispatch(
        register({
          email,
          password,
        })
      );
      const user = unwrapResult(result);
      if (user && user.statusCode === 200) {
        // hideModal();
        // //Navigate to OTP
        // router.navigate(`otp?from=${AUTH_MODALS.SIGNUP}`);
        setSelectedScreen(AUTH_MODALS.LOGIN);
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const renderTitle = () => {
    return (
      <View>
        {/* TITLE */}
        <Text style={[{ ...FONTS.h2 }]} {...text_colors.title}>
          Join Us
        </Text>
        {/* Description */}
        <Text style={[{ ...FONTS.ps2 }]} {...text_colors.description}>
          All the fields here are required unless otherwise stated
        </Text>
      </View>
    );
  };

  const renderFormInputs = () => (
    <>
      {/* Phone Number */}
      <FormInputs
        ref={phoneNumberRef}
        rootContainerStyles={{ marginTop: SIZES_2.padding }}
        label="Phone Number"
        placeholder="Enter your phone number"
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}
        prependComponent={
          <TabBarIcon
            fontProvider={FontAwesome}
            name="mobile-phone"
            color={"white"}
            size={34}
            styles={{ marginRight: SIZES_2.base }}
          />
        }
      />
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
      {/* Password */}
      <FormInputs
        ref={passwordRef}
        rootContainerStyles={{ marginTop: SIZES_2.padding }}
        label="Password"
        placeholder="Enter your password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={!isVisible}
        prependComponent={
          <TabBarIcon
            fontProvider={FontAwesome}
            name="lock"
            color={"white"}
            size={24}
            styles={{ marginRight: SIZES_2.base }}
          />
        }
        appendComponent={
          <TouchableOpacity style={{ justifyContent: "center" }}>
            <TabBarIcon
              fontProvider={FontAwesome}
              name={isVisible ? "eye-slash" : "eye"}
              color={Colors.light.lightPrimary}
              size={24}
              onPress={() => setIsVisible(!isVisible)}
            />
          </TouchableOpacity>
        }
      />
    </>
  );

  const renderTermsAndPolicies = () => {
    return (
      <View style={{ marginTop: SIZES_2.padding, alignItems: "center" }}>
        <Text style={{ ...FONTS.ps2 }} {...text_colors.signup_label}>
          By registering, you agree to our
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity>
            <Text style={{ ...FONTS.l2 }} {...text_colors.terms}>
              Terms
            </Text>
          </TouchableOpacity>
          <Text
            style={{ ...FONTS.ps2, marginHorizontal: 4 }}
            {...text_colors.signup_label}
          >
            and
          </Text>
          <TouchableOpacity>
            <Text style={{ ...FONTS.l2 }} {...text_colors.terms}>
              Privacy Policies
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

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
            borderRadius: SIZES_2.radius,
            marginTop: SIZES_2.padding,
            marginLeft: SIZES_2.base,
          }}
          additionalTextStyles={{
            ...FONTS.l2,
            color: COLORS.gray50,
          }}
          type="opacity"
          onPress={handleRegister}
        >
          <RendererHOC
            loading={registerLoading}
            error={null}
            color={COLORS.gray50}
            pad
          >
            <Text style={{ ...FONTS.pr2 }} {...text_colors.title}>
              Register
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
        keyboardShouldPersistTaps={"handled"}
        extraScrollHeight={-300}
        contentContainerStyle={{
          flexGrow: 1,
          marginTop: SIZES_2.radius,
        }}
      >
        {/* Title And Descriptions */}
        {renderTitle()}

        {/* Form Inputs */}
        {renderFormInputs()}

        {/* Terms and Conditions */}
        {renderTermsAndPolicies()}
      </KeyboardAwareScrollView>
      {/* Footer */}
      {renderFooter()}
    </View>
  );
};

export default Register;
