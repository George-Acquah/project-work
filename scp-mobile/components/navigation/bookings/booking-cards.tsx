import React from "react";
import { View, Text } from "react-native";
import { ThemedText } from "@/components/common/ThemedText";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useColorScheme } from "@/hooks/useColorScheme";
import { generateBookingStyles } from "./styles";
import { FONTS } from "@/constants/fonts";
import { TabBarIcon } from "../TabBarIcon";
import { SIZES } from "@/constants/styles";
import { DARK_THEME, LIGHT_THEME } from "@/constants/Colors";
import Button from "@/components/common/button";
import { text_colors } from "@/components/auth/styles";

interface _IBookingCardProps {
  booking: _IBooking | _IFavoriteParkingCenter;
  onViewDetails: () => void;
  onBookNow?: () => void;
}
const BookingCard = ({
  booking,
  onViewDetails,
  onBookNow,
}: _IBookingCardProps) => {
  const colorScheme = useColorScheme() ?? "light";
  const bookingStyles = generateBookingStyles(colorScheme);

  return (
    <View style={[bookingStyles.tabItemContainer]}>
      <View
        style={[
          bookingStyles.tabItemSubContainer,
          { justifyContent: "space-between" },
        ]}
      >
        <ThemedText style={{ ...FONTS.ps1 }} {...text_colors.title}>
          {booking.parkingCenterName}
        </ThemedText>
        <ThemedText style={[{ ...FONTS.ps3 }]} {...text_colors.title}>
          {booking.location}
        </ThemedText>
      </View>

      {/* Render Date And Time Options */}
      {"dateTime" in booking && "status" in booking && (
        <View style={{ justifyContent: "center" }}>
          <View style={[bookingStyles.tabItemSubContainer, { marginLeft: 2 }]}>
            <TabBarIcon
              fontProvider={AntDesign}
              name={"clockcircle"}
              size={22}
              color={
                colorScheme === "light"
                  ? DARK_THEME.backgroundPrimary
                  : LIGHT_THEME.backgroundPrimary
              }
            />
            <ThemedText style={{ marginLeft: SIZES.base }} {...text_colors.title}>
              {booking.dateTime}
            </ThemedText>
          </View>
          <View style={[bookingStyles.tabItemSubContainer]}>
            <TabBarIcon
              size={28}
              color={
                booking.status === "Pending"
                  ? colorScheme === "light"
                    ? DARK_THEME.secondary500
                    : LIGHT_THEME.secondary500
                  : colorScheme === "light"
                  ? LIGHT_THEME.primary800
                  : LIGHT_THEME.primary800
              }
              fontProvider={MaterialIcons}
              name={booking.status === "Pending" ? "pending" : "check-circle"}
            />
            <Text
              style={{
                color:
                  booking.status === "Pending"
                    ? colorScheme === "light"
                      ? DARK_THEME.secondary700
                      : LIGHT_THEME.secondary500
                    : colorScheme === "light"
                    ? LIGHT_THEME.primary800
                    : LIGHT_THEME.primary800,
                marginLeft: SIZES.base,
              }}
            >
              {booking.status}
            </Text>
          </View>
        </View>
      )}

      {/* Move the button container to the bottom */}
      <View style={[bookingStyles.tabItemContainerButton]}>
        <Button
          variant="outline"
          onPress={onViewDetails}
          title="View Details"
        />

        {onBookNow && (
          <Button
            additionalStyles={{
              marginLeft: SIZES.base,
            }}
            title="Book Now"
            onPress={onBookNow}
          />
        )}
      </View>
    </View>
  );
};

export default BookingCard;
