import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { router, useLocalSearchParams, usePathname } from "expo-router";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/useRedux";
import {
  selectSelectedSlot,
  selectSelectedSlotString,
} from "@/features/slots/parking-slots.slice";
import Button from "@/components/common/button";
import { unwrapResult } from "@reduxjs/toolkit";
import { slotReservation } from "@/features/reservations/reservations.slice";
import { ids } from "@/constants/root";
import { ThemedView } from "@/components/common/ThemedView";
import { text_colors } from "@/components/auth/styles";
import { SIZES } from "@/constants/styles";
import { FONTS } from "@/constants/fonts";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { ThemedText } from "@/components/common/ThemedText";
import { useColorScheme } from "@/utils/hooks/useColorScheme";
import { SHARED_COLORS } from "@/constants/Colors";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { convertDateToString, convertDateToTime } from "@/utils/functions/shared";

interface _ICenterParams {
  [key: string]: string;
  center_id: string;
  slot_id: string;
  duration: string;
  start_time: string;
  start_date: string;
}

const ConfirmReservationPage = () => {
  const url = usePathname();
  const params = useLocalSearchParams<_ICenterParams>();
  const { center_id, duration, start_time, start_date, slot_id } = params;

  
  const colorScheme = useColorScheme() ?? "light";
  const styles = generateStyles(colorScheme);

  const dispatch = useAppDispatch();

  const slotId = useAppSelector(selectSelectedSlotString);
  const selectedSlot = useAppSelector(selectSelectedSlot(slotId ?? ""));

  const handleBookSlot = async () => {
    const startDate = new Date(start_date ?? "");
    const startTime = new Date(start_time ?? '');
    const reservation_duration = parseInt(duration ?? "");
    const vehicle_id = ids.VEHICLE;
    const slot_id = ids.SLOT;
    const center = ids.CENTER;
    const result = unwrapResult(
      await dispatch(
        slotReservation({
          center_id: center,
          slot_id,
          start_time: startTime,
          start_date: startDate,
          reservation_duration,
          vehicle_id,
          callbackUrl: url,
        })
      )
    );

    if (result && result.statusCode === 200) {
      // router.navigate(
      //   `/success/?title=${"Your reservation was successful"}&description=${"You have successfully booked your slot. We look forward to having you"}&btnLabel=${"Go to home"}&route=${"/(navigations)/home"}&secBtnLabel=${"View your reservations"}&secRoute=${"/reservations"}`
      // );
      router.navigate('/make-payment')
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
        onPress={() => router.back()}
      />
      <View style={{ paddingTop: 60, paddingHorizontal: 20, flexGrow: 1 }}>
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
              "map-marker",
              FontAwesome,
              selectedSlot.slot_name
            )}
            {renderDetailCard("car", FontAwesome, selectedSlot.type)}
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
              selectedSlot.contact || "+233 551363571"
            )}
          </KeyboardAwareScrollView>
        ) : (
          <ThemedView>
            <ThemedText>Oops!!! A Problem Occured</ThemedText>
          </ThemedView>
        )}
      </View>
      {selectedSlot && (
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
            title="Proceed To Reserve"
            size="lg"
            additionalStyles={{
              borderRadius: SIZES.radius,
              marginBottom: SIZES.padding * 0.2,
              marginHorizontal: SIZES.radius,
            }}
            onPress={() => {
              handleBookSlot();
            }}
          />
        </View>
      )}
    </ThemedView>
  );
};

const generateStyles = (colorScheme: 'light' | 'dark') => {
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

export default ConfirmReservationPage;