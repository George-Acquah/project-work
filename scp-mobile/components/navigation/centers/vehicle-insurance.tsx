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
import {
  setVehiclesDetails,
  setVehiclesInsuranceDetails,
} from "@/features/forms/forms.slice";
import { router } from "expo-router";
import useCustomSearchParams from "@/utils/hooks/use-search-params.hook";
import { text_colors } from "@/components/auth/styles";

const VehicleInsurance = () => {
  const colorScheme = useColorScheme() ?? "light";
  const dispatch = useAppDispatch();
  const { handleSetParams } = useCustomSearchParams("FORM_STEP");
  const steps = [
    "Vehicle Details",
    "Insurance Details",
    "Registration Details",
  ];

  // Refs for TextInput
  const policyNumberRef = useRef<TextInput>(null);
  const insurerRef = useRef<TextInput>(null);
  const startDateRef = useRef<TextInput>(null);
  const endDateRef = useRef<TextInput>(null);
  const premiumAmountRef = useRef<TextInput>(null);

  // State for form fields
  const [policyNumber, setPolicyNumber] = useState("");
  const [insurer, setInsurer] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [premiumAmount, setPremiumAmount] = useState("");

  // Handle form submission
  const handleNext = () => {
    const data = { policyNumber, insurer, startDate, endDate, premiumAmount };
    console.log(data);
    dispatch(setVehiclesInsuranceDetails(data));
    handleSetParams(true, "2");
  };

  const handleBack = () => {
    handleSetParams(true, "0");
  };

  // Render the form fields
  const renderVehicleInsurance = () => {
    return (
      <View>
        {/* Policy Number */}
        <View style={{ marginTop: SIZES.padding }}>
          <ThemedText style={{ marginBottom: SIZES.base }}>
            Policy Number
          </ThemedText>
          <TextInput
            ref={policyNumberRef}
            value={policyNumber}
            onChangeText={setPolicyNumber}
            placeholder="Enter Policy Number"
            style={{
              borderColor: SHARED_COLORS.gray900,
              borderWidth: 1,
              padding: SIZES.base,
            }}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        {/* Insurer */}
        <View style={{ marginTop: SIZES.padding }}>
          <ThemedText style={{ marginBottom: SIZES.base }}>Insurer</ThemedText>
          <TextInput
            ref={insurerRef}
            value={insurer}
            onChangeText={setInsurer}
            placeholder="Enter Insurer"
            style={{
              borderColor: SHARED_COLORS.gray900,
              borderWidth: 1,
              padding: SIZES.base,
            }}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        {/* Start Date */}
        <View style={{ marginTop: SIZES.padding }}>
          <ThemedText style={{ marginBottom: SIZES.base }}>
            Start Date
          </ThemedText>
          <TextInput
            ref={startDateRef}
            value={startDate}
            onChangeText={setStartDate}
            placeholder="Enter Start Date"
            style={{
              borderColor: SHARED_COLORS.gray900,
              borderWidth: 1,
              padding: SIZES.base,
            }}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        {/* End Date */}
        <View style={{ marginTop: SIZES.padding }}>
          <ThemedText style={{ marginBottom: SIZES.base }}>End Date</ThemedText>
          <TextInput
            ref={endDateRef}
            value={endDate}
            onChangeText={setEndDate}
            placeholder="Enter End Date"
            style={{
              borderColor: SHARED_COLORS.gray900,
              borderWidth: 1,
              padding: SIZES.base,
            }}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        {/* Premium Amount */}
        <View style={{ marginTop: SIZES.padding }}>
          <ThemedText style={{ marginBottom: SIZES.base }}>
            Premium Amount
          </ThemedText>
          <TextInput
            ref={premiumAmountRef}
            value={premiumAmount}
            onChangeText={setPremiumAmount}
            placeholder="Enter Premium Amount"
            style={{
              borderColor: SHARED_COLORS.gray900,
              borderWidth: 1,
              padding: SIZES.base,
            }}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="numeric"
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
            marginRight: 10
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
        {renderVehicleInsurance()}
      </KeyboardAwareScrollView>

      {/* Footer */}
      {renderFooter()}
    </View>
  );
};

export default VehicleInsurance;
