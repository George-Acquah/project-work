import React, { useRef, useState } from "react";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { View, Text } from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/useRedux";
import {
  selectAvailableSlotsLoading,
  selectIsAvailableSlotsError,
  selectStartDate,
  selectStartTIme,
  setStartDate,
  setStartTime,
} from "@/features/reservations/reservations.slice";
import { TabBarIcon } from "../TabBarIcon";
import { DARK_THEME, LIGHT_THEME, SHARED_COLORS } from "@/constants/Colors";
import Button from "@/components/common/button";
import RendererHOC from "@/components/common/renderer.hoc";
import { useColorScheme } from "@/utils/hooks/useColorScheme";
import { generateBookingStyles, inputContainerBg } from "./styles";
import { SIZES } from "@/constants/styles";
import { ThemedText } from "@/components/common/ThemedText";
import { text_colors } from "@/components/auth/styles";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import ReservationSchema from "@/schemas/reservation.schema";
import { FONTS } from "@/constants/fonts";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import FormInputs from "@/components/common/input-form";
import { convertDateToString, convertDateToTime } from "@/utils/functions/shared";

interface _IReservationRequest {
  handleReservation: (data: any) => void;
}

const RequestReservationForm = ({
  handleReservation,
}: _IReservationRequest) => {
  const colorScheme = useColorScheme() ?? "light";
  const styles = generateBookingStyles(colorScheme);
  const dispatch = useAppDispatch();
  const [isCalendar, setIsCalendar] = useState(false);
  const [isStartTime, setIsStartTime] = useState(false);
  const startTime = useAppSelector(selectStartTIme);
  const startDate = useAppSelector(selectStartDate);
  const bookingLoading = useAppSelector(selectAvailableSlotsLoading);
  const bookingError = useAppSelector(selectIsAvailableSlotsError);

  // REFS
  const durationRef = useRef(null);

  const requestReservationSchema = ReservationSchema;
  const { control, handleSubmit } = useForm({
    defaultValues: {
      duration: 0,
    },
    resolver: zodResolver(requestReservationSchema),
  });

  const handleDateChange = (
    event: DateTimePickerEvent,
    date: Date | undefined
  ) => {
    if (date) {
      dispatch(setStartDate(date.toISOString()));
    }
    if (event.type === "dismissed" || event.type === "set") {
    }
    setIsCalendar(false);
  };

const handleTimeChange = (
  event: DateTimePickerEvent,
  date: Date | undefined
) => {
  if (date) {
    dispatch(setStartTime(date.toISOString())); // Store the full ISO string
  }
  if (event.type === "dismissed" || event.type === "set") {
  }
  setIsStartTime(false);
};


  const renderDuration = () => (
    <View style={{ marginTop: 20, marginHorizontal: SIZES.base * 0.6 }}>
      {/* Phone Number */}
      <FormInputs
        ref={durationRef}
        control={control as any}
        name="duration"
        rootContainerStyles={[{ marginTop: 30}]}
        inputContainerStyles={styles.duration_container}
        applyBg={inputContainerBg}
        style={styles.duration_input}
        autoCapitalize="none"
        inputMode="numeric"
        applyFonts={false}
        label="Reservation Duration"
        placeholder="Enter the duration"
        prependComponent={
          <TabBarIcon
            fontProvider={FontAwesome}
            name="hourglass-1"
            size={20}
            color={
              colorScheme === "light"
                ? DARK_THEME.backgroundPrimary
                : SHARED_COLORS.gray900
            }
            style={{ marginRight: SIZES.base }}
          />
        }
      />
    </View>
  );

  const renderDate = () => (
    <>
      <Text style={{ paddingHorizontal: SIZES.radius, color: colorScheme === 'dark' ? 'white' : 'black', }}>Start Day</Text>
      <View style={{ flexDirection: "row", alignItems: "center", marginTop: SIZES.base * 0.6 }}>
        <View style={styles.container}>
          <TabBarIcon
            fontProvider={FontAwesome}
            name="calendar"
            color={
              colorScheme === "light"
                ? DARK_THEME.backgroundPrimary
                : SHARED_COLORS.gray900
            }
            size={20}
            style={{ marginRight: SIZES.base }}
            auth
          />
          <View nativeID="start_date" style={styles.sub_container}>
            <Text style={{}}>{startDate}</Text>
          </View>
        </View>
        <FontAwesome
          onPress={() => setIsCalendar(true)}
          style={{ marginLeft: 10 }}
          name="calendar"
          color={
            colorScheme === "light"
              ? DARK_THEME.backgroundPrimary
              : SHARED_COLORS.gray300
          }
          size={32}
        />
        {isCalendar && (
          <DateTimePicker
            value={new Date(startDate)}
            mode="date"
            onChange={handleDateChange}
          />
        )}
      </View>
    </>
  );

  const renderTime = () => (
    <>
      <Text
        style={{
          paddingHorizontal: SIZES.radius,
          marginTop: 20,
          color: colorScheme === "dark" ? "white" : "black",
        }}
      >
        Start Time
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",

          marginTop: SIZES.base * 0.6,
        }}
      >
        <View style={styles.container}>
          <TabBarIcon
            fontProvider={AntDesign}
            name="clockcircle"
            color={
              colorScheme === "light"
                ? DARK_THEME.backgroundPrimary
                : SHARED_COLORS.gray900
            }
            size={20}
            style={{ marginRight: SIZES.base }}
            auth
          />
          <View nativeID="start_time" style={styles.sub_container}>
            <Text style={{}}>{convertDateToTime(startTime)}</Text>
          </View>
        </View>
        <AntDesign
          onPress={() => setIsStartTime(true)} // Change this to setIsStartTime
          style={{ marginLeft: 10 }}
          name="clockcircle"
          color={
            colorScheme === "light"
              ? DARK_THEME.backgroundPrimary
              : SHARED_COLORS.gray300
          }
          size={32}
        />
        {isStartTime && (
          <DateTimePicker
            value={new Date(startTime)}
            mode="time"
            display="default"
            onChange={handleTimeChange}
          />
        )}
      </View>
    </>
  );

  const renderFooter = () => (
    <View style={{ marginBottom: SIZES.padding, paddingHorizontal: 20 }}>
      <Button onPress={handleSubmit(handleReservation)}>
        <RendererHOC
          loading={bookingLoading}
          error={null}
          color={LIGHT_THEME.backgroundPrimary}
        >
          <ThemedText style={{ ...FONTS.ps1 }} {...text_colors.title}>
            Request Reservation
          </ThemedText>
        </RendererHOC>
      </Button>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps={"handled"}
        extraScrollHeight={-50}
        contentContainerStyle={{
          flexGrow: 1,
          marginTop: SIZES.padding,
          paddingHorizontal: 20,
        }}
      >
        {renderDate()}
        {renderTime()}
        {renderDuration()}
      </KeyboardAwareScrollView>
      {renderFooter()}
    </View>
  );
};

export default RequestReservationForm;
