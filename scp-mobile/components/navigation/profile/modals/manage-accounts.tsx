import { ThemedView as View } from "@/components/common/ThemedView";
import { ThemedText as Text } from "@/components/common/ThemedText";
import { FONTS } from "@/constants/fonts";
import { Alert, TextInput, TouchableOpacity } from "react-native";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import Button from "@/components/common/button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AUTH_MODALS } from "@/constants/root";
import { selectAuthLoading, login } from "@/features/auth/auth.slice";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/useRedux";
import { unwrapResult } from "@reduxjs/toolkit";
import { router } from "expo-router";
import { SIZES } from "@/constants/styles";
import { useColorScheme } from "@/utils/hooks/useColorScheme";
import { LIGHT_THEME, SHARED_COLORS } from "@/constants/Colors";

import AuthSchema from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginParams } from "@/api/auth";
import { text_colors } from "@/components/auth/styles";
import RendererHOC from "@/components/common/renderer.hoc";
import FormInputs from "@/components/common/input-form";
import { TabBarIcon } from "../../TabBarIcon";

interface _IManageAccount {
  setSelectedScreen: Dispatch<SetStateAction<string>>;
}
const ManageAccount = ({ setSelectedScreen }: _IManageAccount) => {
  const phoneNumberRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const ManageAccountSchema = AuthSchema.omit({ phone_number: true });
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(ManageAccountSchema),
  });
  const [isVisible, setIsVisible] = useState(false);
  const colorScheme = useColorScheme();
  const dispatch = useAppDispatch();
  const ManageAccountLoading = useAppSelector(selectAuthLoading);

  const handleManageAccount = async (data: LoginParams) => {
    try {
      const { email, password } = data;
      // const result = await dispatch(
      //   login({
      //     email,
      //     password,
      //   })
      // );
      // const user = unwrapResult(result);
      // if (user && user.data.tokens) {
      //   router.replace("/");
      // }
      alert("Changes saved!");
    } catch (error: any) {
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
          Enter your phone number or email to ManageAccount
        </Text>
      </View>
    );
  };

  const renderFooter = () => {
    return (
      <View>
        {/* Sign In button */}
        <Button
          additionalStyles={{
            borderRadius: 10,
            marginTop: SIZES.padding,
          }}
          additionalTextStyles={{
            ...FONTS.l2,
            color: SHARED_COLORS.gray50,
          }}
          type="opacity"
          onPress={handleSubmit(handleManageAccount)}
        >
          <RendererHOC
            loading={ManageAccountLoading}
            error={null}
            color={SHARED_COLORS.gray50}
            pad
          >
            <Text style={{ ...FONTS.pr2 }} {...text_colors.main_title}>
              Save Changes
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
        extraScrollHeight={150}
        contentContainerStyle={{
          flexGrow: 1,
          marginTop: SIZES.radius,
        }}
      >
        {/* Title And Descriptions */}
        {renderTitle()}

        {/* Form Inputs */}
        {/* Phone Number */}
        <FormInputs
          ref={phoneNumberRef}
          control={control as any}
          name="email"
          rootContainerStyles={{ marginTop: SIZES.padding * 2 }}
          label="Phone Number / Email"
          placeholder="Enter phone number or email"
          prependComponent={
            <TabBarIcon
              fontProvider={FontAwesome}
              name="mobile-phone"
              color={colorScheme === "light" ? SHARED_COLORS.gray900 : "white"}
              size={34}
              style={{ marginRight: SIZES.base }}
            />
          }
        />

        {/* Password */}
        <FormInputs
          ref={passwordRef}
          control={control as any}
          name="password"
          rootContainerStyles={{ marginTop: SIZES.padding }}
          label="Password"
          placeholder="Enter your password"
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
      </KeyboardAwareScrollView>

      {/* Footer */}
      {renderFooter()}
    </View>
  );
};

export default ManageAccount;
