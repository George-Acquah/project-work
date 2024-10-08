import { ThemedView as View } from "@/components/common/ThemedView";
import { ThemedText as Text } from "@/components/common/ThemedText";
import { FONTS } from "@/constants/fonts";
import { Alert, TextInput, TouchableOpacity } from "react-native";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import Button from "@/components/common/button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { text_colors } from "./styles";
import { AUTH_MODALS } from "@/constants/root";
import { router } from "expo-router";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/useRedux";
import { unwrapResult } from "@reduxjs/toolkit";
import { register, selectAuthLoading } from "@/features/auth/auth.slice";
import { SIZES } from "@/constants/styles";
import { TabBarIcon } from "../navigation/TabBarIcon";
import { LIGHT_THEME, SHARED_COLORS } from "@/constants/Colors";
import RendererHOC from "../common/renderer.hoc";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthSchema from "@/schemas/auth.schema";
import FormInputs from "../common/input-form";

interface _IRegister {
  setSelectedScreen: Dispatch<SetStateAction<string>>;
  hideModal: () => void;
}

const AddVehicle = ({ setSelectedScreen, hideModal }: _IRegister) => {

  const registerSchema = AuthSchema;
  const { control, handleSubmit } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      phone_number: "",
      password: "",
    },
    resolver: zodResolver(registerSchema),
  });

  const vehicleNumberRef = useRef<TextInput>(null);
  const driverRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useAppDispatch();
  const registerLoading = useAppSelector(selectAuthLoading);

  // const handleAddVehicle = async () => {
  //   try {
  //     const result = await dispatch(
  //       register({
  //         email,
  //         password,
  //       })
  //     );
  //     const user = unwrapResult(result);
  //     if (user && user.statusCode === 200) {
  //       // hideModal();
  //       // //Navigate to OTP
  //       // router.navigate(`otp?from=${AUTH_MODALS.SIGNUP}`);
  //       setSelectedScreen(AUTH_MODALS.LOGIN);
  //     }
  //   } catch (error: any) {
  //     Alert.alert(error.message);
  //   }
  // };

  const onSubmit = (data: any) => {
    Alert.alert("Successful", JSON.stringify(data));
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
        ref={vehicleNumberRef}
        control={control}
        name="phone_number"
        rootContainerStyles={{ marginTop: SIZES.padding }}
        label="Phone Number"
        placeholder="Enter your phone number"
        prependComponent={
          <TabBarIcon
            fontProvider={FontAwesome}
            name="mobile-phone"
            color={"white"}
            size={34}
            style={{ marginRight: SIZES.base }}
          />
        }
      />
      {/* Email */}
      <FormInputs
        ref={emailRef}
        control={control}
        name="email"
        rootContainerStyles={{ marginTop: SIZES.padding }}
        label="Email Address"
        placeholder="Enter your email address"
        prependComponent={
          <TabBarIcon
            fontProvider={Entypo}
            name="mail"
            color={"white"}
            size={24}
            style={{ marginRight: SIZES.base }}
          />
        }
      />
      {/* Password */}
      <FormInputs
        ref={driverRef}
        control={control}
        name="password"
        rootContainerStyles={{ marginTop: SIZES.padding }}
        label="Password"
        placeholder="Enter your password"
        secureTextEntry={!isVisible}
        prependComponent={
          <TabBarIcon
            fontProvider={FontAwesome}
            name="lock"
            color={"white"}
            size={24}
            style={{ marginRight: SIZES.base }}
          />
        }
        appendComponent={
          <TouchableOpacity style={{ justifyContent: "center" }}>
            <TabBarIcon
              fontProvider={FontAwesome}
              name={isVisible ? "eye-slash" : "eye"}
              color={LIGHT_THEME.backgroundPrimary}
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
      <View style={{ marginTop: SIZES.padding, alignItems: "center" }}>
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
              backgroundColor: undefined,
              height: null,
              marginLeft: SIZES.base,
            }}
            additionalTextStyles={{ color: LIGHT_THEME.primary400 }}
            type="opacity"
            onPress={() => {
              setSelectedScreen(AUTH_MODALS.LOGIN);
            }}
          />
        </View>

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
          onPress={handleSubmit(onSubmit)}
        >
          <RendererHOC
            loading={registerLoading}
            error={null}
            color={SHARED_COLORS.gray50}
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
          marginTop: SIZES.radius,
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

export default AddVehicle;
