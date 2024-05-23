import { ThemedView as View } from "@/components/common/ThemedView";
import { ThemedText as Text } from "@/components/common/ThemedText";
import { FONTS } from "@/constants/fonts";
import { Alert, TextInput, TouchableOpacity } from "react-native";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import Button from "@/components/common/button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { router } from "expo-router";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/useRedux";
import { unwrapResult } from "@reduxjs/toolkit";
import { register, selectAuthLoading } from "@/features/auth/auth.slice";
import { AUTH_MODALS } from "@/constants/root";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { bg_colors, text_colors } from "@/components/auth/styles";
import { FormInputs } from "@/components/auth/helpers";
import { SIZES } from "@/constants/styles";
import { DARK_THEME, LIGHT_THEME, SHARED_COLORS } from "@/constants/Colors";
import RendererHOC from "@/components/common/renderer.hoc";
import { useColorScheme } from "@/hooks/useColorScheme"

const ResetPasswordScreen = () => {
  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const dispatch = useAppDispatch();
  const registerLoading = useAppSelector(selectAuthLoading);
  const colorScheme = useColorScheme() ?? 'light';

  const handleRegister = async () => {
    try {
      // const result = await dispatch(
      //   register({
      //     email: confirmPassword,
      //     password,
      //   })
      // );
      // const user = unwrapResult(result);
      // if (user && user.statusCode === 200) {
      //   hideModal();
      //   //Navigate to OTP
      //   router.navigate(
      //     `/success/?title=${"Your password was successfully changed"}&description=${"You can niw login with your new password"}&btnLabel=${"Login"}&route=${"/(auth)/welcome"}`
      //   );
      // }
      //Navigate to OTP
      router.navigate(
        `/success/?title=${"Your password was successfully changed"}&description=${"You can now login with your new password"}&btnLabel=${"Go Back To Login"}&route=${"/(auth)/welcome"}&action=${
          AUTH_MODALS.VEHICLES
        }`
      );
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  // renders
  const renderHeader = () => {
    return (
      <View style={{ marginTop: SIZES.padding }}>
        <View>
          <TouchableOpacity
            onPress={() => {
              router.back();
            }}
          >
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
      </View>
    );
  };

  const renderTitle = () => {
    return (
      <View>
        {/* TITLE */}
        <Text style={[{ ...FONTS.h2 }]} {...text_colors.title}>
          Reset your password
        </Text>
        {/* Description */}
        <Text style={[{ ...FONTS.ps2 }]} {...text_colors.description}>
          Passowrd must be eight characters long and contain a number
        </Text>
      </View>
    );
  };

  const renderFormInputs = () => (
    <>
      {/* Password */}
      <FormInputs
        ref={passwordRef}
        rootContainerStyles={{ marginTop: SIZES.padding * 2 }}
        label="Password"
        placeholder="Enter your password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={!isVisible}
        prependComponent={
          <TabBarIcon
            fontProvider={FontAwesome}
            name="lock"
            color={colorScheme === "light" ? SHARED_COLORS.gray900 : "white"}
            size={24}
            style={{ marginRight: SIZES.base }}
          />
        }
        appendComponent={
          <TouchableOpacity style={{ justifyContent: "center" }}>
            <TabBarIcon
              fontProvider={FontAwesome}
              name={isVisible ? "eye-slash" : "eye"}
              color={LIGHT_THEME.primary700}
              size={24}
              onPress={() => setIsVisible(!isVisible)}
            />
          </TouchableOpacity>
        }
      />

      {/* Confirm Password */}
      <FormInputs
        ref={confirmPasswordRef}
        rootContainerStyles={{ marginTop: SIZES.padding }}
        label="Confirm Password"
        placeholder="Confirm your password"
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
        secureTextEntry={!isConfirmVisible}
        prependComponent={
          <TabBarIcon
            fontProvider={FontAwesome}
            name="lock"
            color={colorScheme === "light" ? SHARED_COLORS.gray900 : "white"}
            size={24}
            style={{ marginRight: SIZES.base }}
          />
        }
        appendComponent={
          <TouchableOpacity style={{ justifyContent: "center" }}>
            <TabBarIcon
              fontProvider={FontAwesome}
              name={isConfirmVisible ? "eye-slash" : "eye"}
              color={LIGHT_THEME.primary700}
              size={24}
              onPress={() => setIsConfirmVisible(!isConfirmVisible)}
            />
          </TouchableOpacity>
        }
      />
    </>
  );

  const renderFooter = () => {
    return (
      <View style={{ marginBottom: SIZES.padding }}>
        {/* Sign In button */}
        <Button
          additionalStyles={{
            borderRadius: SIZES.radius,
            marginTop: SIZES.padding,
            marginLeft: SIZES.base,
          }}
          additionalTextStyles={{
            ...FONTS.l2,
            color: SHARED_COLORS.gray50,
          }}
          type="opacity"
          onPress={handleRegister}
        >
          <RendererHOC
            loading={registerLoading}
            error={null}
            color={SHARED_COLORS.gray50}
            pad
          >
            <Text style={{ ...FONTS.pr2 }} {...text_colors.main_title}>
              Confirm
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
        {/* Title And Descriptions */}
        {renderTitle()}

        {/* Form Inputs */}
        {renderFormInputs()}
      </KeyboardAwareScrollView>
      {/* Footer */}
      {renderFooter()}
    </View>
  );
};

export default ResetPasswordScreen;
