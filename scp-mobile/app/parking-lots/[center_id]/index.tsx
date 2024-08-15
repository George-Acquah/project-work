import React, { useEffect, useRef } from "react";
import { router, useLocalSearchParams, usePathname } from "expo-router";
import {
  FontAwesome,
  Entypo,
  MaterialIcons,
  Ionicons,
} from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/useRedux";
import Button from "@/components/common/button";
import { ids } from "@/constants/root";
import RendererHOC from "@/components/common/renderer.hoc";
import SlotMap from "@/components/navigation/centers/slot-map";
import { ThemedView } from "@/components/common/ThemedView";
import { bg_colors, text_colors } from "@/components/auth/styles";
import { SIZES } from "@/constants/styles";
import { FONTS } from "@/constants/fonts";
import { TabBarIcon, _IFont } from "@/components/navigation/TabBarIcon";
import {
  fetchSingleCenter,
  selectCenterError,
  selectCenterLoading,
  selectFetchedCenter,
} from "@/features/centers/centers.slice";
import { ThemedText } from "@/components/common/ThemedText";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import CenterDetailsHeaderImage from "@/components/parking/details-header-image";
import useRoles from "@/utils/hooks/useRoles.hook";
import { SHARED_COLORS } from "@/constants/Colors";
import { UserType } from "@/utils/enums/global.enum";
import { useColorScheme } from "@/utils/hooks/useColorScheme";
import { generateParkingCenterStyles } from "@/components/parking/style";
import BottomSheet, { BottomSheetModal } from "@gorhom/bottom-sheet";
import DetachedModal from "@/components/common/detached-modal";
import { ownerOptionsData } from "@/constants/owner";
import { TouchableOpacity } from "react-native";
import {
  fetchAvailableSlots,
  selectStartDate,
  selectStartTIme,
  setDuration,
} from "@/features/reservations/reservations.slice";
import { unwrapResult } from "@reduxjs/toolkit";
import CustomBottomSheetModal from "@/components/common/custom-bottom-sheet-modal";
import RequestReservationForm from "@/components/navigation/bookings/request-reservation-form";

const ParkingCenterDetails = () => {
  const url = usePathname();
  //Params
  const params = useLocalSearchParams<_ICenterDetailsParams>();
  const { center_id } = params;

  //color Schemes
  const colorScheme = useColorScheme() ?? "light";

  //Styles
  const styles = generateParkingCenterStyles(colorScheme);

  //fetch user role using useRoles hook
  const { role, loading: role_loading } = useRoles();
  console.log("role: ", role);
  console.log(role_loading);

  //Refs
  const addOptionsRef = useRef<BottomSheet>(null);
  const requestReservationModalRef = useRef<BottomSheetModal>(null);

  //Dispatch and Selectors
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectCenterLoading);
  const error = useAppSelector(selectCenterError);
  const center = useAppSelector(selectFetchedCenter);
  const startTime = useAppSelector(selectStartTIme);
  const startDate = useAppSelector(selectStartDate);

  const handleReservation = async (data: any) => {
    const { duration } = data;
    const req_href = `/parking-lots/${center_id}/slots/reserve-slot?start_date=${startDate}&start_time=${startTime}&duration=${duration}`;

    const result = unwrapResult(
      await dispatch(
        fetchAvailableSlots({
          center_id: center_id ?? "",
          pageSize: 20,
          start_time: new Date(startTime),
          start_date: new Date(startDate),
          reservation_duration: duration,
          callbackUrl: url,
        })
      )
    );

    if (result && result.statusCode === 200) {
      if (requestReservationModalRef.current) {
        dispatch(setDuration(duration));
        requestReservationModalRef.current.dismiss();
      }
      if (req_href) {
        router.push(req_href);
      }
    }
  };

  //Fetch Center using center_id in useEffect
  useEffect(() => {
    console.log(center_id);
    dispatch(fetchSingleCenter(center_id!));
  }, []);

  // Helper function to count available slots
  const countAvailableSlots = (slots: _ISlot[]) => {
    return slots.filter((slot) => slot.isAvailable).length;
  };

  const renderCenterDetails = () => (
    <ThemedView style={styles.centerDetailsContainer}>
      <ThemedText style={styles.centerName} {...text_colors.title}>
        {center?.center_name}
      </ThemedText>
      <ThemedText style={styles.centerDescription} {...text_colors.description}>
        {center?.description}
      </ThemedText>
      <ThemedView style={styles.slotAvailabilityContainer}>
        <MaterialIcons name="local-parking" size={24} color="green" />
        <ThemedText
          style={styles.slotAvailabilityText}
          {...text_colors.description}
        >
          {countAvailableSlots(center?.slots ?? [])} slots available
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );

  // Render options for all users
  const renderUserOptions = () => (
    <Button
      additionalStyles={
        role === UserType.PARK_OWNER
          ? [styles.userOptionsButtonOwner]
          : [styles.userOptionsButton]
      }
      type="opacity"
      title="Reserve Slot"
      onPress={() => {
        // Implement the navigation or action to reserve a slot
        requestReservationModalRef?.current?.present();
      }}
    />
  );

  const renderOwnerOptions = () => {
    return (
      <>
        <ThemedView style={[styles.ownerOptionsContainer]}>
          {ownerOptionsData.map(({ option, icon, fontProvider, route }) => {
            return (
              <TouchableOpacity
                key={icon}
                style={[styles.ownerOptionsSubContainer]}
                onPress={() => {
                  console.log(`pressed ${icon}`);
                  router.navigate(`/parking-lots/${center?._id}/${route}`);
                  addOptionsRef.current?.close(); // Close the bottom sheet modal
                }}
              >
                <TabBarIcon
                  fontProvider={fontProvider}
                  name={icon}
                  size={24}
                  // color={[styles.ownerIcon]}
                  style={[styles.ownerIcon]}
                />
                <ThemedView style={{ marginLeft: SIZES.padding * 0.7 }}>
                  <ThemedText style={{ ...FONTS.ps3 }} {...text_colors.title}>
                    {option}
                  </ThemedText>
                </ThemedView>
              </TouchableOpacity>
            );
          })}
        </ThemedView>
        <Button
          additionalStyles={[styles.ownerOptionsButton]}
          type="opacity"
          title="Manage Slots"
          onPress={() => {
            // Implement the navigation or action to manage slots
            router.navigate(`/parking-lots/${center?._id}/slots`);
          }}
        />
      </>
    );
  };

  const renderAddButton = () => (
    <Button additionalStyles={[styles.plusButton]} type="opacity">
      <Ionicons
        name="options"
        color={"white"}
        size={24}
        style={styles.plusIcon}
        onPress={() => addOptionsRef.current?.expand()}
      />
    </Button>
  );

  const renderDetachedModal = () => (
    <DetachedModal
      ref={addOptionsRef}
      height={SIZES.padding * 4.5}
      style={[styles.detachedModal]}
      backgroundStyle={[styles.detachedBackground]}
    >
      {renderOwnerOptions()}
    </DetachedModal>
  );

  const renderRequestReservationModal = () => (
    <CustomBottomSheetModal
      points={["80%"]}
      index={0}
      bg={
        colorScheme === "light" ? SHARED_COLORS.gray300 : SHARED_COLORS.gray800
      }
      indicatorBg={
        colorScheme === "light" ? SHARED_COLORS.gray700 : SHARED_COLORS.gray200
      }
      pressBehavior={'close'}
      ref={requestReservationModalRef}
    >
      {/* Your modal content */}
      <RequestReservationForm handleReservation={handleReservation} />
    </CustomBottomSheetModal>
  );

  return (
    <RendererHOC loading={loading} error={error}>
      <>
        <ParallaxScrollView
          headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
          headerContent={
            <CenterDetailsHeaderImage
              center_images={center?.center_images?.map(
                (image) => image.file_id
              )}
            />
          }
          style={{ position: "relative" }}
          header_height={250}
          scroll_ratio={0.27}
        >
          {/* Render Title */}
          {renderCenterDetails()}
        </ParallaxScrollView>
        {/* Render options for all users */}
        {renderUserOptions()}
        {renderRequestReservationModal()}

        {/* Render Add button and Detached modal for owners */}
        {role === UserType.PARK_OWNER && renderAddButton()}
        {role === UserType.PARK_OWNER && renderDetachedModal()}
      </>
    </RendererHOC>
  );
};

export default ParkingCenterDetails;
