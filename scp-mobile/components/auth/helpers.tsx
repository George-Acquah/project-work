import { View, Text } from "@/components/Themed";
import TabBarIcon from "@/components/common/Icons";
import Button from "@/components/common/button";
import { COLORS } from "@/constants/Colors";
import { FONTS } from "@/constants/fonts";
import { IMAGES } from "@/constants/images";
import { AUTH_MODALS } from "@/constants/root";
import { SIZES_2 } from "@/constants/styles";
import { Image, TextInput, TextInputProps, TouchableOpacity, TouchableOpacityProps } from "react-native"
import {FontAwesome } from "@expo/vector-icons"
import React from "react";
import { bg_colors } from "./styles";

interface _ICheckbox extends TouchableOpacityProps {
  isSelected: boolean;
  label: string;
}

interface _IFormInputs extends TextInputProps {
  rootContainerStyles: object;
  label: string;
  containerStyles?: object;
  inputContainerStyles?: object;
  inputStyles?: object;
  prependComponent?: React.ReactNode;
  appendComponent?: React.ReactNode;
}
type TextInputRef = TextInput;


const text_colors = {
  title: {
    lightColor: COLORS.gray50,
    darkColor: COLORS.gray400,
  },
  sub_container: {
    lightColor: COLORS.gray900,
    darkColor: COLORS.gray900,
  },
};

const background_colors = {
  container: {
    lightColor: COLORS.gray400,
    darkColor: COLORS.gray400,
  },
  sub_container: {
    lightColor: COLORS.gray900,
    darkColor: COLORS.gray900,
  },
};

const FormInputs = React.forwardRef<TextInputRef, _IFormInputs>(
  (
    {
      rootContainerStyles,
      containerStyles,
      inputContainerStyles,
      label,
      prependComponent,
      appendComponent,
      ...props
    },
    ref
  ) => {
    const {
      style,
      placeholder,
      value,
      onChangeText,
      secureTextEntry,
      keyboardType,
      autoComplete,
      maxLength,
      onPressIn,
      editable,
    } = props;
    return (
      <View style={[{ ...rootContainerStyles }]}>
        {/* Label */}
        {label !== "" && (
          <Text style={[{ ...FONTS.l3 }]} {...text_colors.title}>
            {label}
          </Text>
        )}

        {/* Inputs */}
        <View style={[{ marginTop: SIZES_2.base, ...containerStyles }]}>
          <View
            style={[
              {
                flexDirection: "row",
                height: 50,
                borderRadius: SIZES_2.radius,
                paddingHorizontal: SIZES_2.radius,
                alignItems: "center",
                ...inputContainerStyles,
              },
            ]}
            {...bg_colors.input_container}
          >
            {prependComponent}
            <TextInput
              ref={ref}
              style={[
                {
                  flex: 1,
                  paddingVertical: 0,
                  color: COLORS.contentPrimary,
                  ...FONTS.pr2,
                },
                style,
              ]}
              placeholderTextColor={COLORS.contentInverseSecondary}
              placeholder={placeholder}
              value={value}
              onChangeText={onChangeText}
              secureTextEntry={secureTextEntry}
              keyboardType={keyboardType}
              autoComplete={autoComplete}
              maxLength={maxLength}
              onPressIn={onPressIn}
              editable={editable}
            />
            {appendComponent}
          </View>
        </View>
      </View>
    );
  }
);

const Checkbox = ({ isSelected, label, onPress, style }: _ICheckbox) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[{ flexDirection: "row", alignItems: "center" }, style]}
    >
      <TabBarIcon
        fontProvider={FontAwesome}
        name={isSelected ? "check-square" : "square"}
        color={"white"}
        size={24}
        // styles={{ marginRight: SIZES_2.base }}
      />
      {label && (
        <Text
          style={{ ...FONTS.ps2, marginLeft: SIZES_2.base }}
          {...text_colors.title}
        >
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};



const renderImage = () => {
  return (
    <View>
      <Image
        source={{ uri: IMAGES.first }}
        height={250}
        width={SIZES_2.width}
      />
    </View>
  );
};

const renderLoginDetails = (showModal: (screen: string) => void, animationState: any) => {
  return (
    <View
      style={{
        flex: 1,
        padding: SIZES_2.padding,
        justifyContent: "space-between",
      }}
    >
      {/* Title And Description */}
      <View>
        <Text style={[{ ...FONTS.h2 }]} {...text_colors.title}>
          Log In
        </Text>
        <Text style={[{ ...FONTS.ps3 }]} {...text_colors.title}>
          Please choose how you would like to log in
        </Text>
      </View>

      {/* Buttons */}
      <View>
        {/* Phone */}
        <Button
          additionalStyles={{
            borderRadius: 30,
          }}
          additionalTextStyles={{
            ...FONTS.l2,
            marginLeft: SIZES_2.radius,
            color: COLORS.gray50,
          }}
          icon="mobile-phone"
          iconSize={30}
          iconColor={COLORS.gray50}
          title="Continue With Phone Number"
          type="opacity"
          onPress={() => {
            setTimeout(() => {
              animationState.transitionTo("scaleDown");
            }, 100);
            showModal(AUTH_MODALS.LOGIN);
          }}
        />
        {/* Google */}
        <Button
          additionalStyles={{
            borderRadius: 30,
            backgroundColor: COLORS.gray900,
            borderColor: COLORS.gray500,
            marginTop: SIZES_2.padding,
          }}
          additionalTextStyles={{
            ...FONTS.l2,
            marginLeft: SIZES_2.radius,
            color: COLORS.gray50,
          }}
          icon="google"
          iconColor={COLORS.gray50}
          title="Continue With Google"
          type="opacity"
          onPress={() => {
            showModal(AUTH_MODALS.ADDRESS);
          }}
        />
        {/* Github */}
        <Button
          additionalStyles={{
            borderRadius: 30,
            backgroundColor: COLORS.gray900,
            borderColor: COLORS.gray500,
            marginTop: SIZES_2.padding,
          }}
          additionalTextStyles={{
            ...FONTS.l2,
            marginLeft: SIZES_2.radius,
            color: COLORS.gray50,
          }}
          icon="github"
          iconColor={COLORS.gray50}
          title="Continue With Github"
          type="opacity"
          onPress={() => {
            showModal(AUTH_MODALS.VEHICLES);
          }}
        />
      </View>

      {/* Sign Up */}
      <View>
        <Text
          style={[{ ...FONTS.l3 }, { textAlign: "center" }]}
          {...background_colors.container}
        >
          Don't have an account?
        </Text>
        <Button
          additionalStyles={{
            borderRadius: 30,

            marginTop: SIZES_2.padding,
          }}
          additionalTextStyles={{
            ...FONTS.l2,
            color: COLORS.gray50,
          }}
          title="Create An Account"
          type="opacity"
          onPress={() => {
            showModal(AUTH_MODALS.SIGNUP);
          }}
        />
      </View>
    </View>
  );
};


export {
  renderImage,
  renderLoginDetails,
  background_colors,
  Checkbox,
  FormInputs
}
