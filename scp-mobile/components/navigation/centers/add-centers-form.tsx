import FormInputs from "@/components/common/input-form";
import { ThemedView as View } from "@/components/common/ThemedView";
import { SHARED_COLORS } from "@/constants/Colors";
import { SIZES } from "@/constants/styles";
import useCustomSearchParams from "@/utils/hooks/use-search-params.hook";
import { FontAwesome } from "@expo/vector-icons";
import { useRef, useState } from "react";
import { TextInput } from "react-native";
import { TabBarIcon } from "../TabBarIcon";
import { useColorScheme } from "@/utils/hooks/useColorScheme";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Stepper, { StepperBtns } from "@/components/common/stepper";

interface _IForms {
  actionType: "add" | "update";
}

type FormDataType = {
  vehicle: Record<string, any>;
  insurance: Record<string, any>;
  registration: Record<string, any>;
};

type FormStep = "vehicle" | "insurance" | "registration";

const AddParkingCenterForm = ({ actionType }: _IForms) => {
  const colorScheme = useColorScheme() ?? "light";

  const { modalValue, handleSetParams } = useCustomSearchParams("FORM_STEP");
  const current = parseInt(modalValue) || 0;

  //REFS
  //Vehicle  Basic
  const makeRef = useRef<TextInput>(null);
  const modelRef = useRef<TextInput>(null);
  const yearRef = useRef<TextInput>(null);
  const vinRef = useRef<TextInput>(null);
  const colorRef = useRef<TextInput>(null);
  const typeRef = useRef<TextInput>(null);

  //Vehicle Insurance
  const policyNumberRef = useRef<TextInput>(null);
  const insurerRef = useRef<TextInput>(null);
  const startDateRef = useRef<TextInput>(null);
  const endDateRef = useRef<TextInput>(null);
  const premiumAmountRef = useRef<TextInput>(null);

  //Vehicle Registrations
  const registrationNumberRef = useRef<TextInput>(null);
  const registrationDateRef = useRef<TextInput>(null);
  const expiryDateRef = useRef<TextInput>(null);

  //use Forms
  // const loginSchema = AuthSchema.omit({ phone_number: true });
  const { control, handleSubmit } = useForm({
    defaultValues: {
      make: "",
      model: "",
      year: "",
      vin: "",
      color: "",
      type: "",
    },
    // resolver: zodResolver(loginSchema),
  });

  // Form data for all steps
  const [formData, setFormData] = useState<FormDataType>({
    vehicle: {},
    insurance: {},
    registration: {},
  });

  const steps = [
    "Vehicle Details",
    "Insurance Details",
    "Registration Details",
  ];
  const stepKeys: FormStep[] = ["vehicle", "insurance", "registration"];

  const label = actionType === "add" ? "Add" : "Update";
  const text = actionType === "add" ? "Adding" : "Updating";

  //Functions
  const handleNext = () => {
    if (current < steps.length - 1) {
      handleSetParams(true, (current + 1).toString());
    }
  };

  const handleBack = () => {
    if (current > 0) {
      handleSetParams(true, (current - 1).toString());
    }
  };

  const handleStepperSubmit = (data: any) => {
    if (current === steps.length - 1) {
      console.log(data);
      console.log("submitting forms");
    }
  };

  // Render basic vehicle details forms
  const renderVehicleForms = () => {
    return (
      <View>
        {/* Make */}
        <FormInputs
          ref={makeRef}
          control={control as any}
          name="make"
          rootContainerStyles={{ marginTop: SIZES.padding * 2 }}
          label="Make"
          placeholder="Enter Make"
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
        {/* Model */}
        <FormInputs
          ref={modelRef}
          control={control as any}
          name="model"
          rootContainerStyles={{ marginTop: SIZES.padding * 2 }}
          label="Model"
          placeholder="Enter Model"
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
        {/* Year */}
        <FormInputs
          ref={yearRef}
          control={control as any}
          name="year"
          rootContainerStyles={{ marginTop: SIZES.padding * 2 }}
          label="Year"
          placeholder="Enter Year"
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
        {/* Vin */}
        <FormInputs
          ref={vinRef}
          control={control as any}
          name="vin"
          rootContainerStyles={{ marginTop: SIZES.padding * 2 }}
          label="VIN"
          placeholder="Enter VIN"
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
        {/* Color */}
        <FormInputs
          ref={colorRef}
          control={control as any}
          name="color"
          rootContainerStyles={{ marginTop: SIZES.padding * 2 }}
          label="Color"
          placeholder="Enter Color"
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
        {/* Type */}
        <FormInputs
          ref={typeRef}
          control={control as any}
          name="type"
          rootContainerStyles={{ marginTop: SIZES.padding * 2 }}
          label="Vehicle Type"
          placeholder="Enter Vehicle Type"
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
      </View>
    );
  };

    const renderVehicleInsuranceForms = () => {
      return (
        <View>
          {/* Policy Number */}
          <FormInputs
            ref={policyNumberRef}
            control={control as any}
            name="policyNumber"
            rootContainerStyles={{ marginTop: SIZES.padding * 2 }}
            label="Policy Number"
            placeholder="Enter Policy Number"
            prependComponent={
              <TabBarIcon
                fontProvider={FontAwesome}
                name="mobile-phone"
                color={
                  colorScheme === "light" ? SHARED_COLORS.gray900 : "white"
                }
                size={34}
                style={{ marginRight: SIZES.base }}
              />
            }
          />
          {/* Insurer */}
          <FormInputs
            ref={insurerRef}
            control={control as any}
            name="insurer"
            rootContainerStyles={{ marginTop: SIZES.padding * 2 }}
            label="Insurer"
            placeholder="Enter Insurer Name"
            prependComponent={
              <TabBarIcon
                fontProvider={FontAwesome}
                name="mobile-phone"
                color={
                  colorScheme === "light" ? SHARED_COLORS.gray900 : "white"
                }
                size={34}
                style={{ marginRight: SIZES.base }}
              />
            }
          />
          {/* Start Date */}
          <FormInputs
            ref={startDateRef}
            control={control as any}
            name="startDate"
            rootContainerStyles={{ marginTop: SIZES.padding * 2 }}
            label="Start Date"
            placeholder="Select Start Date"
            prependComponent={
              <TabBarIcon
                fontProvider={FontAwesome}
                name="mobile-phone"
                color={
                  colorScheme === "light" ? SHARED_COLORS.gray900 : "white"
                }
                size={34}
                style={{ marginRight: SIZES.base }}
              />
            }
          />
          {/* End Daoe */}
          <FormInputs
            ref={endDateRef}
            control={control as any}
            name="endDate"
            rootContainerStyles={{ marginTop: SIZES.padding * 2 }}
            label="End Date"
            placeholder="Select End Date"
            prependComponent={
              <TabBarIcon
                fontProvider={FontAwesome}
                name="mobile-phone"
                color={
                  colorScheme === "light" ? SHARED_COLORS.gray900 : "white"
                }
                size={34}
                style={{ marginRight: SIZES.base }}
              />
            }
          />
          {/* Premium Account */}
          <FormInputs
            ref={premiumAmountRef}
            control={control as any}
            name="premiumAmount"
            rootContainerStyles={{ marginTop: SIZES.padding * 2 }}
            label="Premium Amount"
            placeholder="Enter Premium Amount"
            prependComponent={
              <TabBarIcon
                fontProvider={FontAwesome}
                name="mobile-phone"
                color={
                  colorScheme === "light" ? SHARED_COLORS.gray900 : "white"
                }
                size={34}
                style={{ marginRight: SIZES.base }}
              />
            }
          />
        </View>
      );
    };

  const renderFooter = () => {
    return (
      <View>
        {/* Stepper buttons */}
        <StepperBtns
          steps={steps}
          handleBack={handleBack}
          handleNext={handleNext}
          handleSubmit={handleStepperSubmit}
        />
      </View>
    );
  };

  return (
    <View style={{ flex: 1, paddingVertical: 40 }}>
      
      <Stepper steps={steps}/>
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps={"handled"}
        extraScrollHeight={250}
        contentContainerStyle={{
          flexGrow: 1,
          marginTop: SIZES.radius,
        }}
      >
        {renderVehicleForms()}

        {renderVehicleInsuranceForms()}
      </KeyboardAwareScrollView>

      {/* Footer */}
      {renderFooter()}
    </View>
  );
};

export default AddParkingCenterForm;
