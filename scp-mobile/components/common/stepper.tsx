import React, { Fragment } from "react";
import { Text, View, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useColorScheme } from "@/utils/hooks/useColorScheme";
import { LIGHT_THEME, SHARED_COLORS } from "@/constants/Colors";
import useCustomSearchParams from "@/utils/hooks/use-search-params.hook";
import { StepBtn } from "./action-buttons";

interface _IStepperBtns {
  steps: string[];
  handleSubmit?: (param: any) => void;
  handleNext?: () => void;
  handleBack?: () => void;
}

interface HRProps {
  height?: number;
}

export const HR = ({ height = 1 }: HRProps) => (
  <View style={[styles.hrContainer, { height }]}>
    <View style={styles.transparentPart} />
    <View style={styles.greenishPart} />
    <View style={styles.transparentPart} />
  </View>
);

export const StepperBtns = ({
  steps,
  handleBack,
  handleNext,
  handleSubmit,
}: _IStepperBtns) => {
  const { modalValue } = useCustomSearchParams("FORM_STEP");
  const current = parseInt(modalValue) || 0;

  return (
    <View style={styles.buttonContainer}>
      <StepBtn
        href={current === 0 ? "g" : undefined}
        type={current === 0 ? "cancel" : "back"}
        onPress={current === 0 ? undefined : handleBack}
      />
      <StepBtn
        type={current === steps.length - 1 ? "submit" : "next"}
        onPress={current === steps.length - 1 ? handleSubmit : handleNext}
        text={current === steps.length - 1 ? "Sending" : undefined}
      />
    </View>
  );
};

const Stepper = ({ steps }: { steps: string[] }) => {
  const { modalValue } = useCustomSearchParams("FORM_STEP");
  const current = parseInt(modalValue) || 1;
  const colorScheme = useColorScheme();

  const renderStepIcons = () => (
    <View style={styles.iconContainer}>
      {steps.map((step, index) => (
        <Fragment key={index}>
          <View
            style={[
              styles.stepIcon,
              current === index
                ? styles.activeStepIcon
                : styles.inactiveStepIcon,
            ]}
          >
            {current > index ? (
              <MaterialIcons
                name="check"
                style={styles.checkIcon}
                color={
                  colorScheme === "light" ? SHARED_COLORS.gray900 : "white"
                }
              />
            ) : (
              <Text style={styles.stepText}>{index + 1}</Text>
            )}
          </View>
          {index !== steps.length - 1 && <HR height={1.5} />}
        </Fragment>
      ))}
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {renderStepIcons()}
    </View>
  );
};

export default Stepper;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 16,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 16,
  },
  stepIcon: {
    width:24, // Increased width for better visibility
    height: 24, // Increased height for better visibility
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 8,
  },
  activeStepIcon: {
    backgroundColor: LIGHT_THEME.primary800,
    color: "white",
  },
  inactiveStepIcon: {
    borderWidth: 2,
    borderColor: LIGHT_THEME.primary400,
  },
  checkIcon: {
    fontSize: 24,
    color: "gray",
  },
  stepText: {
    fontSize: 18,
    color: "black",
  },
  hrContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
  },
  transparentPart: {
    flex: 1,
    backgroundColor: "transparent",
  },
  greenishPart: {
    flex: 1,
    backgroundColor: "green",
    opacity: 0.5,
  },
});
