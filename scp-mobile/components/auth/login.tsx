import { View, Text } from "@/components/Themed";
import Colors, { COLORS } from "@/constants/Colors";
import { FONTS } from "@/constants/fonts";
import { SIZES_2 } from "@/constants/styles";
import {
  Alert,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import TabBarIcon from "@/components/common/Icons";
import { FontAwesome } from "@expo/vector-icons";
import Button from "@/components/common/button";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import { text_colors } from "./styles";
import { AUTH_MODALS } from "@/constants/root";
import { login, selectAuthLoading } from "@/features/auth/auth.slice";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/useRedux";
import { unwrapResult } from "@reduxjs/toolkit";
import { router } from "expo-router";
import RendererHOC from "@/components/Renderer.HOC";
import { Checkbox, FormInputs } from "./helpers";

interface _ILogin {
  setSelectedScreen: Dispatch<SetStateAction<string>>;
}
const Login = ({setSelectedScreen}: _ILogin) => {
  const phoneNumberRef = useRef<TextInput>();
  const passwordRef = useRef<TextInput>();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [selectRememberMe, setSelectRememberMe] = useState(false);

    const dispatch = useAppDispatch();
  const loginLoading = useAppSelector(selectAuthLoading);
  
    const handleLogin = async () => {
      try {
        const result = await dispatch(
          login({
            email: phoneNumber,
            password,
          })
        );
        const user = unwrapResult(result);
        if (user && user.data.tokens) {
          router.replace("/");
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
          Welcome Back
        </Text>
        {/* Description */}
        <Text style={[{ ...FONTS.ps2 }]} {...text_colors.description}>
          Enter your phone number or email to login
        </Text>
      </View>
    );
  };

  const renderRememberMeAndForgotPassword = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: SIZES_2.base * 2,
        }}
      >
        <Checkbox
          isSelected={selectRememberMe}
          label="Remember Me"
          onPress={() => setSelectRememberMe(!selectRememberMe)}
        />

        <Button
          title="Forgot Password"
          style={{ backgroundColor: null, height: 30 }}
          additionalTextStyles={{ color: Colors.light.primary }}
          type="opacity"
          onPress={() => setSelectedScreen(AUTH_MODALS.FORGOT)}
        />
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
            If you don't have an account?
          </Text>
          <Button
            title="Sign Up"
            style={{
              backgroundColor: null,
              height: null,
              marginLeft: SIZES_2.base,
            }}
            additionalTextStyles={{ color: Colors.light.primary }}
            type="opacity"
            onPress={() => {
              setSelectedScreen(AUTH_MODALS.SIGNUP);
            }}
          />
        </View>

        {/* Sign In button */}
        <Button
          additionalStyles={{
            borderRadius: 10,
            marginTop: SIZES_2.padding,
          }}
          additionalTextStyles={{
            ...FONTS.l2,
            color: COLORS.gray50,
          }}
          type="opacity"
          onPress={handleLogin}
        >
          <RendererHOC
            loading={loginLoading}
            error={null}
            color={COLORS.gray50}
            pad
          >
            <Text style={{ ...FONTS.pr2 }} {...text_colors.title}>
              Login
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
        extraScrollHeight= {-300}
        contentContainerStyle={{
          flexGrow: 1,
          marginTop: SIZES_2.radius,
        }}
      >
        {/* Title And Descriptions */}
        {renderTitle()}

        {/* Form Inputs */}
        {/* Phone Number */}
        <FormInputs
          ref={phoneNumberRef}
          rootContainerStyles={{ marginTop: SIZES_2.padding * 2 }}
          label="Phone Number / Email"
          placeholder="Enter phone number or email"
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

        {/* Password */}
        <FormInputs
          ref={passwordRef}
          rootContainerStyles={{ marginTop: SIZES_2.padding * 2 }}
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

        {/* Remember Me and Forgot Passwords */}
        {renderRememberMeAndForgotPassword()}

      </KeyboardAwareScrollView>

      {/* Footer */}
      {renderFooter()}
    </View>
  );
};

export default Login;
