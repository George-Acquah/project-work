import { ThemedView as View } from "@/components/common/ThemedView";
import { ThemedText as Text } from "@/components/common/ThemedText";
import Button from "@/components/common/button";
import { FONTS } from "@/constants/fonts";
import { IMAGES } from "@/constants/images";
import { AUTH_MODALS } from "@/constants/root";
import {
  Image,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { bg_colors } from "./styles";
import { DARK_THEME, LIGHT_THEME, SHARED_COLORS } from "@/constants/Colors";
import { SIZES } from "@/constants/styles";
import { useColorScheme } from "@/hooks/useColorScheme";
import { TabBarIcon } from "../navigation/TabBarIcon";

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
    lightColor: SHARED_COLORS.gray700,
    darkColor: SHARED_COLORS.gray400,
  },
  main_title: {
    lightColor: SHARED_COLORS.gray300,
    darkColor: SHARED_COLORS.gray400,
  },
  sub_container: {
    lightColor: SHARED_COLORS.gray900,
    darkColor: SHARED_COLORS.gray900,
  },
};

const background_colors = {
  container: {
    lightColor: SHARED_COLORS.gray400,
    darkColor: SHARED_COLORS.gray400,
  },
  sub_container: {
    lightColor: SHARED_COLORS.gray900,
    darkColor: SHARED_COLORS.gray900,
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
    const colorScheme = useColorScheme()
    return (
      <View style={[{ ...rootContainerStyles }]}>
        {/* Label */}
        {label !== "" && (
          <Text style={[{ ...FONTS.l3 }]} {...text_colors.title}>
            {label}
          </Text>
        )}

        {/* Inputs */}
        <View style={[{ marginTop: SIZES.base, ...containerStyles }]}>
          <View
            style={[
              {
                flexDirection: "row",
                height: 50,
                borderRadius: SIZES.radius,
                paddingHorizontal: SIZES.radius,
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
                  color:
                    colorScheme === "light"
                      ? LIGHT_THEME.contentPrimary
                      : DARK_THEME.contentPrimary,
                  ...FONTS.pr2,
                },
                style,
              ]}
              placeholderTextColor={
                colorScheme === "light"
                  ? SHARED_COLORS.gray600
                  : DARK_THEME.contentInverseSecondary
              }
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
  const colorScheme = useColorScheme() ?? 'light';
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[{ flexDirection: "row", alignItems: "center" }, style]}
    >
      <TabBarIcon
        fontProvider={FontAwesome}
        name={isSelected ? "check-square" : "square"}
        color={colorScheme === "light" ? SHARED_COLORS.gray600 : "white"}
        size={24}
        // styles={{ marginRight: SIZES.base }}
      />
      {label && (
        <Text
          style={{ ...FONTS.ps2, marginLeft: SIZES.base }}
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
        width={SIZES.width}
      />
    </View>
  );
};

const renderLoginDetails = (
  showModal: (screen: string) => void,
  animationState: any
) => {
  return (
    <View
      style={{
        flex: 1,
        padding: SIZES.padding,
        justifyContent: "space-between",
      }}
    >
      {/* Title And Description */}
      <View>
        <Text style={[{ ...FONTS.h2 }]} {...text_colors.main_title}>
          Log In
        </Text>
        <Text style={[{ ...FONTS.ps3 }]} {...text_colors.main_title}>
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
            marginLeft: SIZES.radius,
            color: SHARED_COLORS.gray50,
          }}
          icon="mobile-phone"
          iconSize={30}
          iconColor={SHARED_COLORS.gray50}
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
            backgroundColor: SHARED_COLORS.gray900,
            borderColor: SHARED_COLORS.gray500,
            marginTop: SIZES.padding,
          }}
          additionalTextStyles={{
            ...FONTS.l2,
            marginLeft: SIZES.radius,
            color: SHARED_COLORS.gray50,
          }}
          icon="google"
          iconColor={SHARED_COLORS.gray50}
          title="Continue With Google"
          type="opacity"
          onPress={() => {
            setTimeout(() => {
              animationState.transitionTo("scaleDown");
            }, 100);
            showModal(AUTH_MODALS.ADDRESS);
          }}
        />
        {/* Github */}
        <Button
          additionalStyles={{
            borderRadius: 30,
            backgroundColor: SHARED_COLORS.gray900,
            borderColor: SHARED_COLORS.gray500,
            marginTop: SIZES.padding,
          }}
          additionalTextStyles={{
            ...FONTS.l2,
            marginLeft: SIZES.radius,
            color: SHARED_COLORS.gray50,
          }}
          icon="github"
          iconColor={SHARED_COLORS.gray50}
          title="Continue With Github"
          type="opacity"
          onPress={() => {
            setTimeout(() => {
              animationState.transitionTo("scaleDown");
            }, 100);
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

            marginTop: SIZES.padding,
          }}
          additionalTextStyles={{
            ...FONTS.l2,
            color: SHARED_COLORS.gray50,
          }}
          title="Create An Account"
          type="opacity"
          onPress={() => {
            setTimeout(() => {
              animationState.transitionTo("scaleDown");
            }, 100);
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
  FormInputs,
};
