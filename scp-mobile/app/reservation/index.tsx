import { View, Text } from "react-native";
import React from "react";
import { useAppSelector } from "@/utils/hooks/useRedux";
import { selectReservedSlot } from "@/features/reservations/reservations.slice";
import { router, useLocalSearchParams } from "expo-router";
import Button from "@/components/common/button";
import RendererHOC from "@/components/common/renderer.hoc";

interface _IReservationParams {
  [key: string]: string;
  reservation_id: string;
}
const ReservationScreen = () => {
  const { reservation_id } = useLocalSearchParams<_IReservationParams>();
  const reservedSlot = useAppSelector(selectReservedSlot);

  return (
    <RendererHOC
      loading={!reservedSlot}
      error={
        !reservation_id && !reservedSlot
          ? "An error occured while loading your reservation"
          : null
      }
    >
      <View>
        <Text>Reservation Screen</Text>
        <Text>Hurray</Text>
        <Button
          title="Go Home"
          size="lg"
          onPress={() => {
            router.push("/(navigations)/home/");
          }}
        />
      </View>
    </RendererHOC>
  );
};

export default ReservationScreen;
