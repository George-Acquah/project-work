// components/formInput.jsx
import React from 'react'
import { ThemedView as View } from "@/components/common/ThemedView";
import { ThemedText as Text } from "@/components/common/ThemedText";
import { TextInput, TextInputProps } from 'react-native'
import { Control, Controller, FieldValues } from 'react-hook-form';
import { useColorScheme } from "@/utils/hooks/useColorScheme";
import { LIGHT_THEME, DARK_THEME, SHARED_COLORS } from '@/constants/Colors';
import { FONTS } from '@/constants/fonts';
import { SIZES } from '@/constants/styles';
import { text_colors, bg_colors } from '../auth/styles';

interface _IFormInput extends TextInputProps{
  control: Control<FieldValues, any> | undefined,
  name: any;
  rootContainerStyles: object;
  label: string;
  containerStyles?: object;
  inputContainerStyles?: object;
  inputStyles?: object;
  prependComponent?: React.ReactNode;
  appendComponent?: React.ReactNode;
}
type TextInputRef = TextInput;

const FormInputs = React.forwardRef<TextInputRef, _IFormInput>(
  (
    {
      control,
      name,
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
      secureTextEntry,
      keyboardType,
      autoComplete,
      maxLength,
      onPressIn,
      editable,
    } = props;
    const colorScheme = useColorScheme()
    return (
      <Controller control={control} name={name} render={({field: { value, onChange, onBlur}, fieldState: { error }}) => (
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
              onChangeText={onChange}
              secureTextEntry={secureTextEntry}
              keyboardType={keyboardType}
              autoComplete={autoComplete}
              maxLength={maxLength}
              onPressIn={onPressIn}
              editable={editable}
              onBlur={onBlur}
            />
            {appendComponent}
          </View>
        </View>

          {/* Error Renders */}
          {error && (
          <Text style={[{ ...FONTS.l3, marginTop: 10 }]} {...text_colors.error}>
            {error.message}
          </Text>
        )}
      </View>
      )} />
    );
  }
);
export default FormInputs;