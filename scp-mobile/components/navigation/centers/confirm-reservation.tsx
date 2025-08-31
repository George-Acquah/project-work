import { View, StyleSheet } from "react-native";
import React from "react";
import { router, useLocalSearchParams, usePathname } from "expo-router";
import { FontAwesome, Entypo, MaterialIcons } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/useRedux";
import Button from "@/components/common/button";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  selectReservationLoading,
  selectSelectedAvailableSlot,
  selectSelectedAvailableSlotString,
  slotReservation,
} from "@/features/reservations/reservations.slice";
import { ThemedView } from "@/components/common/ThemedView";
import { text_colors } from "@/components/auth/styles";
import { SIZES } from "@/constants/styles";
import { FONTS } from "@/constants/fonts";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { ThemedText } from "@/components/common/ThemedText";
import { useColorScheme } from "@/utils/hooks/useColorScheme";
import { LIGHT_THEME, SHARED_COLORS } from "@/constants/Colors";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  convertDateToString,
  convertDateToTime,
} from "@/utils/functions/shared";
import { removeSelectedVehicle, selectSelectedVehicle } from "@/features/vehicles/vehicles.slice";
import VehicleSelect from "./vehicle-select";
import RendererHOC from "@/components/common/renderer.hoc";

interface _ICenterParams {
  center_id?: string;
  slot_id?: string;
  duration?: string;
  start_time?: string;
  start_date?: string;
}

interface _IConfirmReservation {
  params: _ICenterParams;
}

const ConfirmReservation = ({ params }: _IConfirmReservation) => {
  const url = usePathname();
  const {
    center_id: centerId,
    duration,
    start_time,
    start_date,
    slot_id: slotid,
  } = params;

  const colorScheme = useColorScheme() ?? "light";
  const styles = generateStyles(colorScheme);

  const dispatch = useAppDispatch();

  const slotId = useAppSelector(selectSelectedAvailableSlotString);
  const selectedSlot = useAppSelector(
    selectSelectedAvailableSlot(slotId ?? "")
  );
  const selectedVehicle = useAppSelector(selectSelectedVehicle); // Get the selected vehicle
  const loading = useAppSelector(selectReservationLoading);

  const handleBookSlot = async () => {
    try {
          const startDate = new Date(start_date ?? "");
          const startTime = new Date(start_time ?? "");
          const reservation_duration = parseInt(duration ?? "");
          const vehicle_no = selectedVehicle ?? ""; // Use selectedVehicle instead of ids.VEHICLE
          const slot_id = slotId!;
          const center = centerId!;
          const result = unwrapResult(
            await dispatch(
              slotReservation({
                center_id: center,
                slot_id,
                start_time: startTime,
                start_date: startDate,
                reservation_duration,
                vehicle_no,
                callbackUrl: url,
              })
            )
          );

          if (result && result.statusCode === 200) {
            router.navigate("/initiate-payment");
          }
    } catch (error) {
      console.log(error);
    }
  };

  const renderDetailCard = (iconName: any, iconProvider: any, text: string) => (
    <View style={styles.card}>
      <TabBarIcon
        fontProvider={iconProvider}
        name={iconName}
        color={colorScheme === "light" ? SHARED_COLORS.gray900 : "white"}
        style={{ marginRight: 10 }}
      />
      <ThemedText style={{ ...FONTS.ps3 }} {...text_colors.title}>
        {text}
      </ThemedText>
    </View>
  );

  return (
    <ThemedView style={{ flex: 1 }}>
      <Entypo
        name="chevron-left"
        size={20}
        style={{
          padding: 10,
          color: colorScheme === "light" ? "black" : "white",
          width: 40,
          position: "absolute",
          left: 10,
          top: 35,
        }}
        onPress={() => {
          dispatch(removeSelectedVehicle());
          router.back();
        }}
      />
      <View style={{ paddingTop: 60, paddingHorizontal: 20, flexGrow: 1 }}>
        {!selectedVehicle ? ( // Render vehicle selection if no vehicle is selected
          <VehicleSelect />
        ) : (
          <>
            <ThemedText
              style={{
                marginVertical: SIZES.padding,
                ...FONTS.h3,
                textAlign: "center",
              }}
              {...text_colors.title}
            >
              Please confirm your details before proceeding
            </ThemedText>
            {selectedSlot ? (
              <KeyboardAwareScrollView
                enableOnAndroid={true}
                keyboardDismissMode="on-drag"
                keyboardShouldPersistTaps={"handled"}
                extraScrollHeight={20}
                contentContainerStyle={{
                  flexGrow: 1,
                  marginTop: SIZES.radius,
                }}
              >
                {renderDetailCard(
                  "local-parking",
                  MaterialIcons,
                  selectedSlot.slot_name
                )}
                {renderDetailCard(
                  "map-marker",
                  FontAwesome,
                  selectedSlot.location
                )}
                {renderDetailCard("car", FontAwesome, selectedSlot.slot_type)}
                {renderDetailCard(
                  "calendar",
                  FontAwesome,
                  convertDateToString(start_date ?? "")
                )}
                {renderDetailCard(
                  "clock-o",
                  FontAwesome,
                  convertDateToTime(start_time ?? "")
                )}
                {renderDetailCard(
                  "hourglass-1",
                  FontAwesome,
                  `${duration} minutes`
                )}
                {renderDetailCard(
                  "phone",
                  FontAwesome,
                  selectedSlot.owner_contact || "+233 551363571"
                )}
              </KeyboardAwareScrollView>
            ) : (
              <ThemedView>
                <ThemedText>Oops!!! A Problem Occured</ThemedText>
              </ThemedView>
            )}
          </>
        )}
      </View>
      {selectedSlot && selectedVehicle && (
        <View
          style={{
            flex: 1,
            bottom: 0,
            right: 0,
            width: "100%",
            position: "absolute",
          }}
        >
          <Button
            additionalStyles={{
              borderRadius: SIZES.radius * 1.8,
              marginTop: SIZES.padding,
              marginHorizontal: SIZES.radius,
            }}
            type="opacity"
            onPress={handleBookSlot}
          >
            <RendererHOC
              loading={loading}
              error={null}
              color={LIGHT_THEME.backgroundPrimary}
            >
              <ThemedText style={{ ...FONTS.pr1 }} {...text_colors.main_title}>
                Proceed To Reserve
              </ThemedText>
            </RendererHOC>
          </Button>
        </View>
      )}
    </ThemedView>
  );
};

const generateStyles = (colorScheme: "light" | "dark") => {
  return StyleSheet.create({
    card: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      padding: 10,
      backgroundColor:
        colorScheme === "light" ? SHARED_COLORS.gray200 : SHARED_COLORS.gray700,
      borderRadius: SIZES.radius,
      marginVertical: SIZES.padding * 0.3,
    },
  });
};

export default ConfirmReservation;
