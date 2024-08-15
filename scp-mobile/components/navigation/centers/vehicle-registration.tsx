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
import { useAppDispatch, useAppSelector } from "@/utils/hooks/useRedux";
import { _IVehicle } from "@/features/types";
import { selectVehcilesFormData, selectVehcilesInsuranceFormData, setVehiclesDetails } from "@/features/forms/forms.slice";
import { router } from "expo-router";
import useCustomSearchParams from "@/utils/hooks/use-search-params.hook";
import { text_colors } from "@/components/auth/styles";

const VehicleRegistration = () => {
  const colorScheme = useColorScheme() ?? "light";
  const dispatch = useAppDispatch();
  const vehicleDetails = useAppSelector(selectVehcilesFormData);
  const vehicleInsurance = useAppSelector(selectVehcilesInsuranceFormData);
  const { handleSetParams } = useCustomSearchParams("FORM_STEP");
  const steps = [
    "Vehicle Details",
    "Insurance Details",
    "Registration Details",
  ];

  // Refs for TextInput
  const registrationNumberRef = useRef<TextInput>(null);
  const registrationDateRef = useRef<TextInput>(null);
  const expiryDateRef = useRef<TextInput>(null);

  // State for form fields
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [registrationDate, setRegistrationDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  // Handle form submission
  const handleSubmit = () => {
    const data = { registrationNumber, registrationDate, expiryDate };
    console.log(data);
    console.log(vehicleDetails);
    console.log(vehicleInsurance);
  };

  const handleBack = () => {
      handleSetParams(true, "1");
    };

  // Render the form fields
  const renderVehicleRegistration = () => {
    return (
      <View>
        {/* Registration Number */}
        <View style={{ marginTop: SIZES.padding }}>
          <ThemedText style={{ marginBottom: SIZES.base }}>
            Registration Number
          </ThemedText>
          <TextInput
            ref={registrationNumberRef}
            value={registrationNumber}
            onChangeText={setRegistrationNumber}
            placeholder="Enter Registration Number"
            style={{
              borderColor: SHARED_COLORS.gray900,
              borderWidth: 1,
              padding: SIZES.base,
            }}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        {/* Registration Date */}
        <View style={{ marginTop: SIZES.padding }}>
          <ThemedText style={{ marginBottom: SIZES.base }}>
            Registration Date
          </ThemedText>
          <TextInput
            ref={registrationDateRef}
            value={registrationDate}
            onChangeText={setRegistrationDate}
            placeholder="Enter Registration Date"
            style={{
              borderColor: SHARED_COLORS.gray900,
              borderWidth: 1,
              padding: SIZES.base,
            }}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        {/* Expiry Date */}
        <View style={{ marginTop: SIZES.padding }}>
          <ThemedText style={{ marginBottom: SIZES.base }}>
            Expiry Date
          </ThemedText>
          <TextInput
            ref={expiryDateRef}
            value={expiryDate}
            onChangeText={setExpiryDate}
            placeholder="Enter Expiry Date"
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
            paddingHorizontal: 40,
            backgroundColor: SHARED_COLORS.gray400,
            justifyContent: "center",
            paddingVertical: 10,
            marginRight: 10,
          }}
          onPress={handleBack}
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
              Back
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
          onPress={handleSubmit}
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
              Submit
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
        {renderVehicleRegistration()}
      </KeyboardAwareScrollView>

      {/* Footer */}
      {renderFooter()}
    </View>
  );
};

export default VehicleRegistration;
