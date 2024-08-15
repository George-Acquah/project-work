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
import VehicleForms from "./vehicle-forms";
import VehicleInsurance from "./vehicle-insurance";
import VehicleRegistration from "./vehicle-registration";

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

  return (
    <>
      {current === 0 ? (
        <VehicleForms />
      ) : current === 1 ? (
        <VehicleInsurance />
      ) : (
        <VehicleRegistration />
      )}
    </>
  );
};

export default AddParkingCenterForm;
