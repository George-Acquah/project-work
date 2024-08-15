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
import { router } from "expo-router";
import useCustomSearchParams from "@/utils/hooks/use-search-params.hook";
import { text_colors } from "@/components/auth/styles";
import { showErrorModal } from "@/features/error/error.slice";
import { addCenterThunk, selectCenterError, selectCenterLoading } from "@/features/centers/centers.slice";
import { unwrapResult } from "@reduxjs/toolkit";

const ParkingCenterForm = () => {
  const colorScheme = useColorScheme() ?? "light";
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectCenterLoading);

  // Refs for TextInput
  const titleRef = useRef<TextInput>(null);
  const descriptionRef = useRef<TextInput>(null);

  // State for form fields
  const [center_name, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Handle form submission
  const handleSubmit = async () => {
    const data = { center_name, description };
    try {
     const result =  await dispatch(addCenterThunk(data));
      const center = unwrapResult(result);
      if (center && center.data) {
        console.log(center);
        router.back()
      }
    } catch (error: any) {
      throw error;
    }
    console.log(data);
  }

  // Render the form fields
  const renderParkingCemterInputs = () => {
    return (
      <View>
        {/* Title */}
        <View style={{ marginTop: SIZES.padding }}>
          <ThemedText style={{ marginBottom: SIZES.base }}>Title</ThemedText>
          <TextInput
            ref={titleRef}
            value={center_name}
            onChangeText={setTitle}
            placeholder="Enter Title"
            style={{
              borderColor: SHARED_COLORS.gray900,
              borderWidth: 1,
              padding: SIZES.base,
            }}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        {/* Description */}
        <View style={{ marginTop: SIZES.padding }}>
          <ThemedText style={{ marginBottom: SIZES.base }}>
            Description
          </ThemedText>
          <TextInput
            ref={descriptionRef}
            value={description}
            onChangeText={setDescription}
            placeholder="Enter Description"
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
        // style={{
        //   display: "flex",
        //   flexDirection: "row",
        //   justifyContent: "flex-end",
        // }}
      >
        <TouchableOpacity
          style={{
            borderRadius: 20,
            marginTop: SIZES.padding,
            paddingHorizontal: 40,
            backgroundColor: LIGHT_THEME.primary700,
            justifyContent: "center",
            paddingVertical: 10
          }}
          onPress={handleSubmit}
        >
          <RendererHOC
            loading={loading}
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
              Create Center
            </ThemedText>
          </RendererHOC>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={{ flex: 1, paddingVertical: 40, paddingHorizontal: 20 }}>
      {/* <Stepper steps={steps} /> */}
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
        {renderParkingCemterInputs()}
      </KeyboardAwareScrollView>

      {/* Footer */}
      {renderFooter()}
    </View>
  );
};

export default ParkingCenterForm;
