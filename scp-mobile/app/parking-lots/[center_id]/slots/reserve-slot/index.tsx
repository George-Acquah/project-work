import { View, StyleSheet } from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import { FontAwesome, Entypo, MaterialIcons } from "@expo/vector-icons";
import { useAppSelector } from "@/utils/hooks/useRedux";
import Button from "@/components/common/button";
import RendererHOC from "@/components/common/renderer.hoc";
import SlotMap from "@/components/navigation/centers/slot-map";
import { ThemedView } from "@/components/common/ThemedView";
import { text_colors } from "@/components/auth/styles";
import { SIZES } from "@/constants/styles";
import { FONTS } from "@/constants/fonts";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { ThemedText } from "@/components/common/ThemedText";
import { useColorScheme } from "@/utils/hooks/useColorScheme";
import { LIGHT_THEME, SHARED_COLORS } from "@/constants/Colors";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import NoItemFound from "@/components/common/no-item";
import {
  selectAvailableSlots,
  selectAvailableSlotsLoading,
  selectIsAvailableSlotsError,
  selectSelectedAvailableSlot,
  selectSelectedAvailableSlotString,
} from "@/features/reservations/reservations.slice";
import useScreenLoading from "@/utils/hooks/use-screen-loading";

interface _ICenterParams {
  [key: string]: string;
  center_id: string;
  duration: string;
  start_time: string;
  start_date: string;
}
const ReserveSlotScreen = () => {
  //Get Params
  const params = useLocalSearchParams<_ICenterParams>();
  const { center_id, duration, start_time, start_date } = params;

  //Define Color Scheme
  const colorScheme = useColorScheme() ?? "light";

  //Selectors
  const loading = useAppSelector(selectAvailableSlotsLoading);
  const { screenLoading } = useScreenLoading();
  const error = useAppSelector(selectIsAvailableSlotsError);
  const slotId = useAppSelector(selectSelectedAvailableSlotString);
  const selectedSlot = useAppSelector(
    selectSelectedAvailableSlot(slotId ?? "")
  );
  const slots = useAppSelector(selectAvailableSlots);

  const handleBookSlot = async (slot_id: string) => {
    router.navigate(
      `/parking-lots/${center_id}/slots/reserve-slot/confirm-reservation?slot_id=${slot_id}&start_date=${start_date}&start_time=${start_time}&duration=${duration}`
    );
  };

  return (
    <RendererHOC loading={loading || screenLoading} error={error}>
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
          <View style={{ height: "50%", paddingHorizontal: 20 }}>
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
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{
                    flexGrow: 1,
                    paddingBottom: SIZES.radius * 4.8,
                  }}
                >
                  <View
                    style={[
                      styles.details_content,
                      { marginVertical: SIZES.padding * 0.3 },
                    ]}
                  >
                    <TabBarIcon
                      fontProvider={MaterialIcons}
                      name="local-parking"
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
                      name="map-marker"
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
                      {selectedSlot.location}
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
                      name="car"
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
                      {selectedSlot.slot_type}
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
                      name="dollar"
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
                      {`GHc ${selectedSlot.price}`}
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
                      {0}
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
                      {selectedSlot.owner_contact || "+233 551363571"}
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
                      name="calendar"
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
                      {selectedSlot.createdAt}
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
                    additionalStyles={{
                      borderRadius: SIZES.radius * 1.8,
                      marginTop: SIZES.padding,
                    }}
                    type="opacity"
                    onPress={() => {
                      handleBookSlot(selectedSlot._id);
                    }}
                  >
                    <RendererHOC
                      loading={false}
                      error={null}
                      color={LIGHT_THEME.backgroundPrimary}
                    >
                      <ThemedText
                        style={{ ...FONTS.pr1 }}
                        {...text_colors.main_title}
                      >
                        Book Slot
                      </ThemedText>
                    </RendererHOC>
                  </Button>
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
