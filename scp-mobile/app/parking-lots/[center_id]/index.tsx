import React, { useEffect } from "react";
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
import { fetchSingleCenter, selectCenterError, selectCenterLoading, selectFetchedCenter } from "@/features/centers/centers.slice";
import { ThemedText } from "@/components/common/ThemedText";

interface _ICenterDetailsParams {
  [key: string]: string;
  center_id: string;
}
const ParkingCenterDetails = () => {
  const params = useLocalSearchParams<_ICenterDetailsParams>();
  console.log(params);
  const { center_id } = params;

  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectCenterLoading);
  const error = useAppSelector(selectCenterError);
  const center = useAppSelector(selectFetchedCenter);
  

  useEffect(() => {
    console.log(center_id);
    dispatch(fetchSingleCenter(ids.CENTER));
  }, []);

  return (
    <RendererHOC loading={loading} error={error}>
      <ThemedView style={{ flex: 1}}>
        <ThemedText { ...text_colors.title}>
          {JSON.stringify(center)}
        </ThemedText>
      </ThemedView>
    </RendererHOC>
  );
};

export default ParkingCenterDetails;
