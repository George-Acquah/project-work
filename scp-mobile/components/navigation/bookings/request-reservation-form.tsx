import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { View, TextInput, Text, StyleSheet } from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/useRedux";
import {
  selectAvailableSlotsLoading,
  selectIsAvailableSlotsError,
  selectStartTIme,
  selectDuration,
  setStartTime,
  setDuration,
} from "@/features/reservations/reservations.slice";
import { TabBarIcon } from "../TabBarIcon";
import { DARK_THEME, LIGHT_THEME, SHARED_COLORS } from "@/constants/Colors";
import Button from "@/components/common/button";
import RendererHOC from "@/components/common/renderer.hoc";
import { useColorScheme } from "@/utils/hooks/useColorScheme";
import { generateBookingStyles } from "./styles";
import { SIZES } from "@/constants/styles";
import { ThemedText } from "@/components/common/ThemedText";
import { text_colors } from "@/components/auth/styles";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import ReservationSchema from "@/schemas/reservation.schema";
import { FONTS } from "@/constants/fonts";

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
  const startTime = useAppSelector(selectStartTIme);
  const bookingLoading = useAppSelector(selectAvailableSlotsLoading);
  const bookingError = useAppSelector(selectIsAvailableSlotsError);

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
      dispatch(setStartTime(date.toDateString()));
    }
    if (event.type === "dismissed" || event.type === "set") {
    }
    setIsCalendar(false);
  };

  return (
    <View style={{ marginTop: 70, paddingHorizontal: 20 }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={styles.container}>
          <TabBarIcon
            fontProvider={FontAwesome}
            name="calendar"
            color={
              colorScheme === "light"
                ? DARK_THEME.backgroundPrimary
                : SHARED_COLORS.gray500
            }
            size={20}
            style={{ marginRight: SIZES.base }}
            auth
          />
          <View nativeID="start_time" style={styles.sub_container}>
            <ThemedText style={{}} {...text_colors.title}>
              {startTime}
            </ThemedText>
          </View>
        </View>
        <View>
          <FontAwesome
            onPress={() => setIsCalendar(true)}
            style={{ marginLeft: 10 }}
            name="calendar"
            color={
              colorScheme === "light"
                ? DARK_THEME.backgroundPrimary
                : SHARED_COLORS.gray900
            }
            size={32}
          />
          {isCalendar && (
            <DateTimePicker
              value={new Date(startTime)}
              onChange={handleDateChange}
            />
          )}
        </View>
      </View>
      <Controller
        control={control as any}
        name="duration"
        render={({
          field: { value, onChange, onBlur },
          fieldState: { error },
        }) => (
          <>
            <View style={styles.duration_container}>
              <TabBarIcon fontProvider={FontAwesome} name="hourglass-1" auth />
              <TextInput
                onChangeText={onChange}
                value={value}
                onBlur={onBlur}
                nativeID="duration"
                autoCapitalize="none"
                inputMode="numeric"
                style={styles.duration_input}
                placeholder="Enter the duration"
              />
            </View>

            {/* Error Renders */}
            {error && (
              <Text
                style={[{ ...FONTS.l3, marginTop: 10 }]}
                {...text_colors.error}
              >
                {error.message}
              </Text>
            )}
          </>
        )}
      />
      <View style={{ marginTop: 60 }} />
      <Button onPress={handleSubmit(handleReservation)}>
        <RendererHOC
          loading={bookingLoading}
          error={null}
          color={LIGHT_THEME.backgroundPrimary}
        >
          <Text style={styles.reserve_button}>Request Reservation</Text>
        </RendererHOC>
      </Button>
    </View>
  );
};

export default RequestReservationForm;
