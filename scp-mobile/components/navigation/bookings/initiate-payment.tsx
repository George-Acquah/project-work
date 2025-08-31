import React, { useRef, useState } from "react";
import { router, usePathname } from "expo-router";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/useRedux";
import Button from "@/components/common/button";
import RendererHOC from "@/components/common/renderer.hoc";
import { ThemedView } from "@/components/common/ThemedView";
import { text_colors } from "@/components/auth/styles";
import { SIZES } from "@/constants/styles";
import { FONTS } from "@/constants/fonts";
import { TabBarIcon, _IFont } from "@/components/navigation/TabBarIcon";
import {
  selectCenterError,
  selectCenterLoading,
  selectFetchedCenter,
} from "@/features/centers/centers.slice";
import { ThemedText } from "@/components/common/ThemedText";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import CenterDetailsHeaderImage from "@/components/parking/details-header-image";
import { LIGHT_THEME, SHARED_COLORS } from "@/constants/Colors";
import { useColorScheme } from "@/utils/hooks/useColorScheme";
import { generateParkingCenterStyles } from "@/components/parking/style";
import { Alert, Modal, TouchableOpacity, View } from "react-native";

import { unwrapResult } from "@reduxjs/toolkit";
import { selectReservationLoading, selectReservedSlot } from "@/features/reservations/reservations.slice";
import axiosInstance, { BASE_URL } from "@/api/root";
import { keys } from "@/constants/root";
import { hideModal } from "@/features/session/session.slice";
import { load } from "@/utils/functions/storage";
import LoadingComponent from "@/components/skeletons/loading";
import { generateErrorModalStyles } from "@/components/styles";
import Callout from "@/components/common/callout";

const InitiatePaymentComp = () => {
  const url = usePathname();
  const [loading, setLoading] = useState(false);

  //color Schemes
  const colorScheme = useColorScheme() ?? "light";

  //Styles
  const styles = generateParkingCenterStyles(colorScheme);

  //Dispatch and Selectors
  const dispatch = useAppDispatch();
  const resLoading = useAppSelector(selectReservationLoading);
  const reservedSlot = useAppSelector(selectReservedSlot);

  const handlePayment = async () => {
    try {
      setLoading(true);

      const reservationToken = await load<string>(keys.RESERVATION, "string");

      if (!reservationToken) {
        throw new Error("Failed to initiate payment");
      }
      const response = await axiosInstance<{
        data: {
          checkoutDirectUrl: string;
          checkoutUrl: string;
        };
        message: string;
        ok: boolean;
      }>({
        url: `${BASE_URL}payments/initiate-payment`,
        method: "POST",
        withCredentials: true,
        headers: {
          Authorization: `Reservation ${reservationToken}`,
        },
      });

      if (!response.data) {
        throw new Error();
      }
      const requestData = response.data;
      console.log(requestData);

      if (!requestData || !requestData.ok) {
        dispatch(hideModal());
        throw new Error(requestData.message);
      }

      if (requestData && requestData.ok && requestData.data.checkoutUrl) {
        dispatch(hideModal());
        setLoading(false);
        router.replace(
          `/initiate-payment/hubtel-webview?checkoutUrl=${requestData.data.checkoutUrl}`
          // `/hubtel-webview?checkoutUrl=${requestData.data.checkoutUrl}`
        );
      }
    } catch (error: any) {
      Alert.alert("Payment failed", error.message);
      dispatch(hideModal());
      setLoading(false);
    } finally {
      dispatch(hideModal());
      setLoading(false);
    }
  };

  const renderReservationDetails = () => (
    <ThemedView style={styles.centerDetailsContainer}>
      <ThemedText
        style={{ ...FONTS.h4, lineHeight: 26, marginBottom: 10 }}
        {...text_colors.title}
      >
        You reservation has been created successfully with the vehicle below.
      </ThemedText>
      <ThemedText style={{ ...FONTS.pr2 }} {...text_colors.title}>
        Kindly make payment to complete it.
      </ThemedText>
      {/* <ThemedText style={styles.centerName} {...text_colors.title}>
        {reservedSlot?.numberPlate}
      </ThemedText> */}
      <Callout
        message={reservedSlot?.numberPlate ?? ""}
        textStyles={[styles.centerName, { color: 'white'}]}
        style={{ marginTop: 40 }}
      />
    </ThemedView>
  );

    const renderInitiatePaymentLoading = () => {
      const colorScheme = useColorScheme() ?? "light";
      const styles = generateErrorModalStyles(colorScheme);

      return (
        <Modal visible={loading} transparent animationType="fade">
          <View style={styles.modalContainer}>
            <View style={[styles.modalContent, { height: 120 }]}>
              <LoadingComponent pad color={LIGHT_THEME.primary800} />
            </View>
          </View>
        </Modal>
      );
    };

  return (
    <RendererHOC loading={resLoading} error={null}>
        <ParallaxScrollView
          headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
          headerContent={
            <CenterDetailsHeaderImage
              center_images={[reservedSlot?.image ?? ""]}
            />
          }
          style={{ position: "relative" }}
          header_height={250}
          scroll_ratio={0.27}
        >
          {/* Render Title */}
          {renderReservationDetails()}
        </ParallaxScrollView>
        <Button
          additionalStyles={{
            borderRadius: SIZES.radius * 1.8,
            marginTop: SIZES.padding,
            marginHorizontal: SIZES.base,
          }}
          additionalTextStyles={{
            ...FONTS.l1,
            color: SHARED_COLORS.gray50,
          }}
          type="opacity"
          onPress={handlePayment}
        >
          <ThemedText style={{ ...FONTS.pr2 }} {...text_colors.main_title}>
            Make Payment
          </ThemedText>
        </Button>
        {renderInitiatePaymentLoading()}
    </RendererHOC>
  );
};

export default InitiatePaymentComp;
