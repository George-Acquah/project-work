import { Fragment } from "react";
import { Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useColorScheme } from "@/utils/hooks/useColorScheme";
import { LIGHT_THEME, SHARED_COLORS } from "@/constants/Colors";
import useCustomSearchParams from "@/utils/hooks/use-search-params.hook";
import { StepBtn } from "./action-buttons";

export const HR = ({ height = 20 }: { height?: number }) => (
  <View style={[{ height: height, width: "100%", backgroundColor: "gray" }]} />
);

export const StepperBtns = ({ steps }: { steps: string[] }) => {
  
  const { handleSetParams, modalValue } = useCustomSearchParams("FORM_STEP");
  const current = parseInt(modalValue ?? "");

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

  return (
    <View
      style={[
        {
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          padding: 16,
        },
      ]}
      // className="transition-all duration-300 space-x-4  p-4"
    >
      <StepBtn
        href={current === 0 ? "g" : undefined}
        type={current === 0 ? "cancel" : "back"}
        onClick={current === 0 ? undefined : handleBack}
      />
      <StepBtn
        type={current === steps.length - 1 ? "submit" : "next"}
        onClick={current === steps.length - 1 ? undefined : handleNext}
        text={current === steps.length - 1 ? "Sending" : undefined}
      />
    </View>
  );
};

const Stepper = ({ steps }: { steps: string[] }) => {
  const { modalValue } = useCustomSearchParams("FORM_STEP");
  const current = parseInt(modalValue ?? "");
  const colorScheme = useColorScheme();

  const renderStepIcons = () => (
    <View
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        paddingHorizontal: 4,
        paddingVertical: 16,
      }}
    >
      {steps.map((step, index) => (
        <Fragment key={index}>
          <View
            style={[
              {
                width: 24,
                height: 24,
                padding: 4,
                borderRadius: 30,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              },
              current === index
                ? { backgroundColor: LIGHT_THEME.primary500 }
                : { borderWidth: 8, borderColor: LIGHT_THEME.primary700 },
            ]}
            // className={` transition-all duration-300 ${
            //   current === index
            //     ? "bg-blue-500 text-white "
            //     : "border-2 border-blue-700 dark:border-blue-500"
            // }`}
          >
            {current > index ? (
              <MaterialIcons
                name="check"
                style={[{ width: 24, height: 24 }]}
                color={colorScheme === 'light' ? SHARED_COLORS.gray900 : 'white'}
                // className="w-6 h-6 text-gray-900 dark:text-white font-extrabold"
              />
            ) : (
              <Text style={{ padding: 8, textAlign: 'center'}}>{index + 1}</Text>
            )}
          </View>
          {index !== steps.length - 1 && <HR height={16} />}
        </Fragment>
      ))}
    </View>
  );

  return (
    <View>
      {renderStepIcons()}
      {/* {renderStepBtns()} */}
    </View>
  );
};

export default Stepper;
