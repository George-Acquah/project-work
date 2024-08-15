import { useRef, useState } from "react";
import { TextInput, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ThemedView as View } from "@/components/common/ThemedView";
import { LIGHT_THEME, SHARED_COLORS } from "@/constants/Colors";
import { SIZES } from "@/constants/styles";
import Stepper from "@/components/common/stepper";
import RendererHOC from "@/components/common/renderer.hoc";
import Button from "@/components/common/button";
import { ThemedText } from "@/components/common/ThemedText";
import { useColorScheme } from "@/utils/hooks/useColorScheme";
import { useAppDispatch } from "@/utils/hooks/useRedux";
import { _IVehicle } from "@/features/types";
import { setVehiclesDetails } from "@/features/forms/forms.slice";
import { router } from "expo-router";
import useCustomSearchParams from "@/utils/hooks/use-search-params.hook";
import { text_colors } from "@/components/auth/styles";

const VehicleForms = () => {
  const colorScheme = useColorScheme() ?? "light";
  const dispatch = useAppDispatch();
  const { handleSetParams } = useCustomSearchParams("FORM_STEP");
  const steps = [
    "Vehicle Details",
    "Insurance Details",
    "Registration Details",
  ];

  // Refs for TextInput
  const makeRef = useRef<TextInput>(null);
  const modelRef = useRef<TextInput>(null);
  const yearRef = useRef<TextInput>(null);
  const vinRef = useRef<TextInput>(null);
  const colorRef = useRef<TextInput>(null);
  const typeRef = useRef<TextInput>(null);

  // State for form fields
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [vin, setVin] = useState("");
  const [color, setColor] = useState("");
  const [type, setType] = useState("");

  // Handle form submission
  const handleNext = () => {
    const data: _IVehicle = { make, model, year, vin, color, type };
    console.log(data);
    dispatch(setVehiclesDetails(data));
    handleSetParams(true, '1');
  };

  // Render the form fields
  const renderVehicleForms = () => {
    return (
      <View>
        {/* Vin */}
        <View style={{ marginTop: SIZES.padding }}>
          <ThemedText style={{ marginBottom: SIZES.base }}>VIN</ThemedText>
          <TextInput
            ref={vinRef}
            value={vin}
            onChangeText={setVin}
            placeholder="Enter VIN"
            style={{
              borderColor: SHARED_COLORS.gray900,
              borderWidth: 1,
              padding: SIZES.base,
            }}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
        {/* Make */}
        <View style={{ marginTop: SIZES.padding }}>
          <ThemedText style={{ marginBottom: SIZES.base }}>Make</ThemedText>
          <TextInput
            ref={makeRef}
            value={make}
            onChangeText={setMake}
            placeholder="Enter Make"
            style={{
              borderColor: SHARED_COLORS.gray900,
              borderWidth: 1,
              padding: SIZES.base,
            }}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        {/* Model */}
        <View style={{ marginTop: SIZES.padding }}>
          <ThemedText style={{ marginBottom: SIZES.base }}>Model</ThemedText>
          <TextInput
            ref={modelRef}
            value={model}
            onChangeText={setModel}
            placeholder="Enter Model"
            style={{
              borderColor: SHARED_COLORS.gray900,
              borderWidth: 1,
              padding: SIZES.base,
            }}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        {/* Year */}
        <View style={{ marginTop: SIZES.padding }}>
          <ThemedText style={{ marginBottom: SIZES.base }}>Year</ThemedText>
          <TextInput
            ref={yearRef}
            value={year}
            onChangeText={setYear}
            placeholder="Enter Year"
            keyboardType="numeric"
            style={{
              borderColor: SHARED_COLORS.gray900,
              borderWidth: 1,
              padding: SIZES.base,
            }}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        {/* Color */}
        <View style={{ marginTop: SIZES.padding }}>
          <ThemedText style={{ marginBottom: SIZES.base }}>Color</ThemedText>
          <TextInput
            ref={colorRef}
            value={color}
            onChangeText={setColor}
            placeholder="Enter Color"
            style={{
              borderColor: SHARED_COLORS.gray900,
              borderWidth: 1,
              padding: SIZES.base,
            }}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        {/* Type */}
        <View style={{ marginTop: SIZES.padding }}>
          <ThemedText style={{ marginBottom: SIZES.base }}>
            Vehicle Type
          </ThemedText>
          <TextInput
            ref={typeRef}
            value={type}
            onChangeText={setType}
            placeholder="Enter Vehicle Type"
            style={{
              borderColor: SHARED_COLORS.gray900,
              borderWidth: 1,
              padding: SIZES.base,
            }}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
      </View>
    );
  };

  // Render the footer with buttons
  const renderFooter = () => {
    return (
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <TouchableOpacity
          style={{
            borderRadius: 20,
            marginTop: SIZES.padding,
            paddingHorizontal: 10,
            backgroundColor: undefined,
            justifyContent: "center",
            paddingVertical: 10
          }}
          onPress={router.back}
        >
          <RendererHOC
            loading={false}
            error={null}
            color={SHARED_COLORS.gray50}
            pad
          >
            <ThemedText
              style={{
                fontFamily: "Roboto",
                fontSize: 16,
                textAlign: "center",
                color: "white",
              }}
              {...text_colors.title}
            >
              Cancel
            </ThemedText>
          </RendererHOC>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderRadius: 20,
            marginTop: SIZES.padding,
            paddingHorizontal: 40,
            backgroundColor: LIGHT_THEME.primary700,
            justifyContent: "center",
          }}
          onPress={handleNext}
        >
          <RendererHOC
            loading={false}
            error={null}
            color={SHARED_COLORS.gray50}
            pad
          >
            <ThemedText
              style={{
                fontFamily: "Roboto",
                fontSize: 16,
                textAlign: "center",
                color: "white",
              }}
              {...text_colors.main_title}
            >
              Next
            </ThemedText>
          </RendererHOC>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, paddingVertical: 40, paddingHorizontal: 20 }}>
      <Stepper steps={steps} />
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps={"handled"}
        showsVerticalScrollIndicator={false}
        extraScrollHeight={250}
        contentContainerStyle={{
          flexGrow: 1,
          marginTop: SIZES.radius,
        }}
      >
        {renderVehicleForms()}
      </KeyboardAwareScrollView>

      {/* Footer */}
      {renderFooter()}
    </View>
  );
};

export default VehicleForms;
