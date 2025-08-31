import { View, Text, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { router, useLocalSearchParams, usePathname } from "expo-router";
import { FontAwesome, Entypo, MaterialIcons } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/useRedux";
import Button from "@/components/common/button";
import { unwrapResult } from "@reduxjs/toolkit";
import { selectSelectedAvailableSlot, selectSelectedAvailableSlotString, slotReservation } from "@/features/reservations/reservations.slice";
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
import RendererHOC from "@/components/common/renderer.hoc";
import { fetchUsersVehicles, selectSelectedVehicle, selectVehiclesLoading } from "@/features/vehicles/vehicles.slice";
import useScreenLoading from "@/utils/hooks/use-screen-loading";
import ConfirmReservation from "@/components/navigation/centers/confirm-reservation";

interface _ICenterParams {
  [key: string]: string;
  center_id: string;
  slot_id: string;
  duration: string;
  start_time: string;
  start_date: string;
}

const ConfirmReservationPage = () => {
  const params = useLocalSearchParams<_ICenterParams>();

  const dispatch = useAppDispatch();
  const vehicle = useAppSelector(selectSelectedVehicle);

  useEffect(() => {
    if (!vehicle) {
      dispatch(fetchUsersVehicles());
    }
  }, [])

  const loading = useAppSelector(selectVehiclesLoading);
  const {screenLoading } = useScreenLoading();

  return (
    <RendererHOC loading={screenLoading || loading} error={null}>
      <ConfirmReservation params={params}/>
    </RendererHOC>
  );
};

export default ConfirmReservationPage;