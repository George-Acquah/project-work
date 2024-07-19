import { View, Text, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { router, useLocalSearchParams, usePathname } from "expo-router";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/useRedux";
import {
  selectNearbySlotError,
  selectNearbySlotLoading,
  selectSelectedSlot,
  selectSelectedSlotString,
  testSlots,
} from "@/features/slots/parking-slots.slice";
import Button from "@/components/common/button";
import { unwrapResult } from "@reduxjs/toolkit";
import { slotReservation } from "@/features/reservations/reservations.slice";
import { ids } from "@/constants/root";
import RendererHOC from "@/components/common/renderer.hoc";
import SlotMap from "@/components/navigation/centers/slot-map";
import { ThemedView } from "@/components/common/ThemedView";
import { bg_colors, text_colors } from "@/components/auth/styles";
import { SIZES } from "@/constants/styles";
import { FONTS } from "@/constants/fonts";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { ThemedText } from "@/components/common/ThemedText";
import { useColorScheme } from "@/utils/hooks/useColorScheme";
import { SHARED_COLORS } from "@/constants/Colors";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import NoItemFound from "@/components/common/no-item";
import { useSlotFilter } from "@/utils/hooks/useFilter";

interface _ICenterParams {
  [key: string]: string;
  center_id: string;
  duration: string;
  start_time: string;
}
const ReserveSlotScreen = () => {
  const url = usePathname();
  //Get Params
  const params = useLocalSearchParams<_ICenterParams>();
  const { center_id, duration, start_time } = params;

  //Define Color Scheme
  const colorScheme = useColorScheme() ?? 'light';

  //Get select_data from useSlotFilter
  const { select_data } = useSlotFilter();

  const dispatch = useAppDispatch();

  //Selectors
  const loading = useAppSelector(selectNearbySlotLoading);
  const error = useAppSelector(selectNearbySlotError);
  const slotId = useAppSelector(selectSelectedSlotString);
  const selectedSlot = useAppSelector(selectSelectedSlot(slotId ?? ""));
  const slots = useAppSelector(select_data);

  useEffect(() => {
    dispatch(testSlots());
  }, []);

  const handleBookSlot = async (id_for_slot: string) => {
    const start_date = new Date(start_time ?? "");
    const reservation_duration = parseInt(duration ?? "");
    const vehicle_id = ids.VEHICLE;
    const slot_id = ids.SLOT;
    const center = ids.CENTER;
    // const result = unwrapResult(
    //   await dispatch(
    //     slotReservation({
    //       center_id: center,
    //       slot_id,
    //       start_time: start_date,
    //       reservation_duration,
    //       vehicle_id,
    //       callbackUrl: url
    //     })
    //   )
    // );

    // if (result && result.statusCode === 200) {
    //   router.navigate(
    //     `/success/?title=${"Your reservation was successful"}&description=${"You have successfully booked your slot. We look forward to having you"}&btnLabel=${"Go to home"}&route=${"/(navigations)/home"}&secBtnLabel=${"View your reservations"}&secRoute=${"/reservations"}`
    //   );
    // }
    router.navigate(
      `/parking-lots/${center_id}/slots/reserve-slot/confirm-reservation?start_time=${start_time}&duration=${duration}`
    );
  };

  return (
    <RendererHOC loading={loading} error={error}>
      {slots && slots.length > 0 ? (
        <ThemedView style={{ height: "100%" }}>
          <View style={{ height: "50%", position: "relative" }}>
            <SlotMap />
            <Entypo
              name="chevron-left"
              size={20}
              style={{
                padding: 10,
                backgroundColor: "white",
                width: 40,
                position: "absolute",
                left: 10,
                top: 35,
                borderRadius: 30,
              }}
              onPress={() => router.back()}
            />
          </View>
          <View
            style={{ height: "50%", paddingTop: 20, paddingHorizontal: 20 }}
          >
            <ThemedText
              style={{
                marginVertical: SIZES.padding,
                ...FONTS.h3,
                textAlign: "center",
              }}
              {...text_colors.title}
            >
              Details of your selected slot
            </ThemedText>
            {selectedSlot && (
              <View style={{ position: "relative", flex: 1 }}>
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
                  <View
                    style={[
                      styles.details_content,
                      { marginVertical: SIZES.padding * 0.3 },
                    ]}
                  >
                    <TabBarIcon
                      fontProvider={FontAwesome}
                      name="phone"
                      color={
                        colorScheme === "light"
                          ? SHARED_COLORS.gray900
                          : "white"
                      }
                      style={{ marginRight: 10 }}
                    />
                    <ThemedText
                      style={{
                        ...FONTS.ps3,
                      }} //TODO
                      {...text_colors.title}
                    >
                      {selectedSlot.slot_name}
                    </ThemedText>
                  </View>
                  <View
                    style={[
                      styles.details_content,
                      { marginVertical: SIZES.padding * 0.3 },
                    ]}
                  >
                    <TabBarIcon
                      fontProvider={FontAwesome}
                      name="phone"
                      color={
                        colorScheme === "light"
                          ? SHARED_COLORS.gray900
                          : "white"
                      }
                      style={{ marginRight: 10 }}
                    />
                    <ThemedText
                      style={{
                        ...FONTS.ps3,
                      }} //TODO
                      {...text_colors.title}
                    >
                      {selectedSlot.type}
                    </ThemedText>
                  </View>
                  <View
                    style={[
                      styles.details_content,
                      { marginVertical: SIZES.padding * 0.3 },
                    ]}
                  >
                    <TabBarIcon
                      fontProvider={FontAwesome}
                      name="id-badge"
                      color={
                        colorScheme === "light"
                          ? SHARED_COLORS.gray900
                          : "white"
                      }
                      style={{ marginRight: 10 }}
                    />
                    <ThemedText
                      style={{
                        ...FONTS.ps3,
                      }} //TODO
                      {...text_colors.title}
                    >
                      {selectedSlot.slot_data?.total_bookings || 0}
                    </ThemedText>
                  </View>
                  <View
                    style={[
                      styles.details_content,
                      { marginVertical: SIZES.padding * 0.3 },
                    ]}
                  >
                    <TabBarIcon
                      fontProvider={FontAwesome}
                      name="phone"
                      color={
                        colorScheme === "light"
                          ? SHARED_COLORS.gray900
                          : "white"
                      }
                      style={{ marginRight: 10 }}
                    />
                    <ThemedText
                      style={{
                        ...FONTS.ps3,
                      }} //TODO
                      {...text_colors.title}
                    >
                      {selectedSlot.contact || "+233 551363571"}
                    </ThemedText>
                  </View>
                </KeyboardAwareScrollView>

                <View
                  style={{
                    bottom: 0,
                    right: 0,
                    width: "100%",
                    position: "absolute",
                  }}
                >
                  <Button
                    title="Book Slot"
                    size="lg"
                    onPress={() => {
                      handleBookSlot(selectedSlot._id);
                    }}
                  />
                </View>
              </View>
            )}
          </View>
        </ThemedView>
      ) : (
        <NoItemFound description="Please go back and request for different time" />
      )}
    </RendererHOC>
  );
};

const styles = StyleSheet.create({
  header: {
    left: 0,
    right: 0,
    height: "50%",
  },
  imageContainer: {
    flex: 1,
    borderTopLeftRadius: 12, // Top-left corner rounded
    borderTopRightRadius: 12, // Top-right corner rounded
    position: "relative",
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  details_content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  details_content_text: {
    fontSize: 28,
  },
});

export default ReserveSlotScreen;
