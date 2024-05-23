import { StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { ThemedView as View } from "@/components/common/ThemedView";
import { ThemedText as Text } from "@/components/common/ThemedText";
import { router, useLocalSearchParams } from "expo-router";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/useRedux";
import {
  selectNearbySlotError,
  selectNearbySlotLoading,
  selectSelectedSlot,
  selectSelectedSlotString,
  testSlots,
} from "@/features/slots/parking-slots.slice";
import { Slot_Type } from "@/utils/enums/global.enum";
import Button from "@/components/common/button";
import { unwrapResult } from "@reduxjs/toolkit";
import { slotReservation } from "@/features/reservations/reservations.slice";
import { ids } from "@/constants/root";
import RendererHOC from "@/components/common/renderer.hoc";
import { bg_colors, text_colors } from "@/components/auth/styles";
import { FONTS } from "@/constants/fonts";
import { SIZES } from "@/constants/styles";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import SlotMap from "@/components/navigation/centers/slot-map";

interface _ICenterParams {
  [key: string]: string;
  center_id: string;
  duration: string;
  start_time: string;
}
const ParkingCenterDetails = () => {
  const params = useLocalSearchParams<_ICenterParams>();
  console.log(params);
  const { center_id, duration, start_time } = params;

  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectNearbySlotLoading);
  const error = useAppSelector(selectNearbySlotError);
  const slotId = useAppSelector(selectSelectedSlotString);
  const selectedSlot = useAppSelector(selectSelectedSlot(slotId ?? ""));

  useEffect(() => {
    dispatch(testSlots());
  }, []);

  const handleBookSlot = async (id_for_slot: string) => {
    const start_date = new Date(start_time ?? "");
    const reservation_duration = parseInt(duration ?? "0");
    const vehicle_id = ids.VEHICLE;
    const slot_id = ids.SLOT;
    const center = ids.CENTER;
    const result = unwrapResult(
      await dispatch(
        slotReservation({
          center_id: center,
          slot_id,
          start_time: start_date,
          reservation_duration,
          vehicle_id,
        })
      )
    );

    if (result && result.statusCode === 200) {
      const req_href = `/reservation/?reservation_id=${result?.data?.reservationId}`;
      router.push(req_href as any);
    }
  };

  return (
    <RendererHOC loading={loading} error={error}>
      <View style={{ height: "100%" }} {...bg_colors.main}>
        <View style={{ height: "50%", position: "relative" }}>
          <SlotMap />
          <Entypo
            name="chevron-left"
            size={20}
            className="rounded-full"
            style={{
              padding: 10,
              backgroundColor: "white",
              width: 40,
              position: "absolute",
              left: 10,
              top: 35,
            }}
            onPress={() => router.back()}
          />
        </View>
        <View style={{ height: "50%", paddingTop: 20, paddingHorizontal: 20 }}>
          <Text
            style={{
              ...FONTS.h3,
              textAlign: "center",
              letterSpacing: 1.005,
              marginVertical: SIZES.base * 0.6,
            }}
            {...text_colors.title}
          >
            Details of your selected slot
          </Text>
          {selectedSlot && (
            <View style={{ position: "relative" }}>
              <View
                style={[
                  styles.details_content,
                  { marginVertical: SIZES.base * 0.6 },
                ]}
              >
                <TabBarIcon
                  fontProvider={FontAwesome}
                  name="phone"
                  color="black"
                  style={{ marginRight: 10 }}
                />
                <Text style={{ ...FONTS.b1 }}>{selectedSlot.slot_name}</Text>
              </View>
              <View
                style={[
                  styles.details_content,
                  { marginVertical: SIZES.base * 0.6 },
                ]}
              >
                <TabBarIcon
                  fontProvider={FontAwesome}
                  name="phone"
                  color="black"
                  style={{ marginRight: 10 }}
                />
                <Text style={{ ...FONTS.b1 }}>{selectedSlot.type}</Text>
              </View>
              <View
                style={[
                  styles.details_content,
                  { marginVertical: SIZES.base * 0.6 },
                ]}
              >
                <TabBarIcon
                  fontProvider={FontAwesome}
                  name="id-badge"
                  color="black"
                  style={{ marginRight: 10 }}
                />
                <Text style={{ ...FONTS.b1 }}>
                  {selectedSlot.slot_data?.total_bookings || 0}
                </Text>
              </View>
              <View
                style={[
                  styles.details_content,
                  { marginVertical: SIZES.base * 0.6 },
                ]}
              >
                <TabBarIcon
                  fontProvider={FontAwesome}
                  name="phone"
                  color="black"
                  style={{ marginRight: 10 }}
                />
                <Text style={{ ...FONTS.b1 }}>
                  {selectedSlot.contact || "+233 551363571"}
                </Text>
              </View>

              <View
                style={{
                  bottom: -80,
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
      </View>
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

export default ParkingCenterDetails;
