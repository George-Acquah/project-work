import { View, Text, FlatList, Pressable } from "react-native";
import BookingCard from "./booking-cards";
import { useRef, useEffect } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { SIZES } from "@/constants/styles";
import TopTabs from "./top-tab";
import { tabData } from "@/constants/root";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/useRedux";
import {
  selectBookingsHistory,
  selectSelctedTab,
  selectUpcomingBookings,
  selectFavoriteCenters,
  selectShowDetailsModal,
  selectOpenMap,
  selectSelectedBooking,
  handleShowDetailsModal,
  handleCloseMap,
  handleOpenMap,
  handleCloseDetailsModal,
  selectBookingLoading,
} from "@/features/bookings/bookings.slice";
import { useColorScheme } from '@/hooks/useColorScheme'
import { generateBookingStyles } from "./styles";
import RendererHOC from "@/components/common/renderer.hoc";
import { FONTS } from "@/constants/fonts";
import { DARK_THEME, LIGHT_THEME, SHARED_COLORS } from "@/constants/Colors";
import { TabBarIcon } from "../TabBarIcon";
import Button from "@/components/common/button";
import CustomBottomSheetModal from "@/components/common/custom-bottom-sheet-modal";
import { ThemedText } from "@/components/common/ThemedText";
import { text_colors } from "@/components/auth/styles";

// import CustomBottomSheetModal from "../CustomBottomSheetModal";

const tabs = {
  upcoming: "Upcoming",
  history: "History",
  favourite: "Favourite",
  test: "Test",
};

const BookingsComponent = () => {
  const dispatch = useAppDispatch();
  const colorScheme = useColorScheme() ?? 'light';
  const bookingStyles = generateBookingStyles(colorScheme);
  const selectedTab = useAppSelector(selectSelctedTab);
  const upcomingBookings = useAppSelector(selectUpcomingBookings);
  const bookingHistory = useAppSelector(selectBookingsHistory);
  const favouriteParkingCenters = useAppSelector(selectFavoriteCenters);
  const showDetailsModal = useAppSelector(selectShowDetailsModal);
  const openMap = useAppSelector(selectOpenMap);
  const selectedBooking = useAppSelector(selectSelectedBooking);

  const bookingsLoading = useAppSelector(selectBookingLoading);

  const bookingModalRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    // Call present method when showDetailsModal becomes true
    if (showDetailsModal && bookingModalRef.current) {
      bookingModalRef.current.present();
    }
  }, [showDetailsModal]);

  const renderBookingCards = (bookings: _IBooking[] | null) => {
    return (
      <FlatList
        data={bookings}
        renderItem={({ item }) => (
          <BookingCard
            booking={item}
            onViewDetails={() => dispatch(handleShowDetailsModal(item))}
          />
        )}
        
        style={{ marginTop: SIZES.font }}
        keyExtractor={(item) => item.slotName}
        contentContainerStyle={{ columnGap: SIZES.medium }}
      />
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <ThemedText {...text_colors.title}>
        Bookings Component, {selectedTab}
      </ThemedText>
      <TopTabs tabData={tabData} />
      <RendererHOC loading={bookingsLoading} error={null}>
        <>
          <View style={{ marginVertical: SIZES.padding }}>
            {selectedTab === tabs.upcoming ? (
              <View>{renderBookingCards(upcomingBookings)}</View>
            ) : selectedTab === tabs.history ? (
              <View>{renderBookingCards(bookingHistory)}</View>
            ) : (
              <View style={{ marginTop: SIZES.font }}>
                <FlatList
                  data={favouriteParkingCenters}
                  renderItem={({ item }) => (
                    <BookingCard
                      booking={item}
                      onBookNow={() => {}}
                      onViewDetails={() =>
                        dispatch(handleShowDetailsModal(item))
                      }
                    />
                  )}
                />
              </View>
            )}
          </View>
          {showDetailsModal && (
            <View style={{ ...FONTS.pr2, alignItems: "center", flex: 1 }}>
              <CustomBottomSheetModal
                points={["50%", "75%", "85%"]}
                index={2}
                bg={
                  colorScheme === "light"
                    ? LIGHT_THEME.backgroundSecondary
                    : "#151518"
                }
                indicatorBg={
                  colorScheme === "light"
                    ? LIGHT_THEME.primary700
                    : DARK_THEME.primary700
                }
                ref={bookingModalRef}
              >
                <View style={{ flex: 1 }}>
                  <View style={{ flexGrow: 1 }}>
                    <View>
                      <ThemedText
                        style={{
                          ...FONTS.h3,
                          alignItems: "center",
                          letterSpacing: 1.005,
                        }}
                        {...text_colors.title}
                      >
                        Reservation Details
                      </ThemedText>
                    </View>
                    <View style={{ marginTop: SIZES.base }}>
                      <ThemedText
                        style={{ ...FONTS.ps3 }}
                        {...text_colors.title}
                      >
                        {`${
                          selectedTab === tabs.history
                            ? "Review the details of your reservation history."
                            : `Review the details of your ${selectedTab} reservation.`
                        }`}
                      </ThemedText>
                    </View>

                    <View style={{ marginTop: SIZES.base }}>
                      <View style={{ marginTop: SIZES.base }}>
                        {selectedBooking && (
                          <View>
                            <View
                              style={{
                                marginBottom: SIZES.base,
                                flexDirection: "row",
                                alignItems: "center",
                              }}
                            >
                              <ThemedText
                                style={{ ...FONTS.b1 }}
                                {...text_colors.title}
                              >
                                Parking Center:{" "}
                              </ThemedText>
                              <ThemedText {...text_colors.title}>
                                {selectedBooking.parkingCenterName}
                              </ThemedText>
                            </View>
                            <View
                              style={{
                                marginBottom: SIZES.base,
                                flexDirection: "row",
                                alignItems: "center",
                              }}
                            >
                              <ThemedText
                                style={{ ...FONTS.b1 }}
                                {...text_colors.title}
                              >
                                Loaction:{" "}
                              </ThemedText>
                              <ThemedText {...text_colors.title}>
                                {selectedBooking.location}
                              </ThemedText>
                            </View>
                            <View
                              style={{
                                marginBottom: SIZES.base,
                                flexDirection: "row",
                                alignItems: "center",
                              }}
                            >
                              <ThemedText
                                style={{ ...FONTS.b1 }}
                                {...text_colors.title}
                              >
                                Date and Time: {""}
                              </ThemedText>
                              <ThemedText {...text_colors.title}>
                                {selectedBooking.location}
                              </ThemedText>
                            </View>
                            <View
                              style={{
                                marginBottom: SIZES.base,
                              }}
                            >
                              {"dateTime" in selectedBooking &&
                                "status" in selectedBooking && (
                                  <View
                                    style={{
                                      justifyContent: "center",
                                    }}
                                  >
                                    <View
                                      style={[
                                        { marginLeft: 2 },
                                        bookingStyles.tabItemSubContainer,
                                      ]}
                                    >
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
                                      <ThemedText
                                        style={{
                                          ...FONTS.ps2,
                                          marginLeft: SIZES.base,
                                        }}
                                        {...text_colors.title}
                                      >
                                        {selectedBooking.dateTime}
                                      </ThemedText>
                                    </View>
                                    <View
                                      style={[
                                        bookingStyles.tabItemSubContainer,
                                      ]}
                                    >
                                      <TabBarIcon
                                        size={28}
                                        color={
                                          selectedBooking.status === "Pending"
                                            ? LIGHT_THEME.secondary700
                                            : LIGHT_THEME.primary800
                                        }
                                        fontProvider={MaterialIcons}
                                        name={
                                          selectedBooking.status === "Pending"
                                            ? "pending"
                                            : "check-circle"
                                        }
                                      />
                                      <Text
                                        style={{
                                          color:
                                            selectedBooking.status === "Pending"
                                              ? LIGHT_THEME.secondary700
                                              : LIGHT_THEME.primary800,
                                          ...FONTS.ps2,
                                          marginLeft: SIZES.base,
                                        }}
                                      >
                                        {selectedBooking.status}
                                      </Text>
                                    </View>
                                  </View>
                                )}
                            </View>

                            {/* MAP TOGGLERS */}
                            <View>
                              {openMap ? (
                                <Pressable
                                  style={{
                                    marginVertical: SIZES.font,
                                    flexDirection: "row",
                                    alignItems: 'center'
                                  }}
                                  onPress={() => dispatch(handleCloseMap())}
                                >
                                  <TabBarIcon
                                    fontProvider={MaterialIcons}
                                    name={"map"}
                                  />
                                  <Text
                                    style={{
                                      marginLeft: SIZES.base,
                                      color: LIGHT_THEME.primary600,
                                      cursor: "pointer",
                                    }}
                                  >
                                    Collapse Map
                                  </Text>
                                </Pressable>
                              ) : (
                                <Pressable
                                  style={{
                                    marginTop: SIZES.font,
                                      flexDirection: "row",
                                    alignItems: 'center'
                                  }}
                                  onPress={() => dispatch(handleOpenMap())}
                                >
                                  <TabBarIcon
                                    fontProvider={MaterialIcons}
                                    name={"map"}
                                    color={LIGHT_THEME.primary700}
                                  />
                                  <Text
                                    style={{
                                      color: LIGHT_THEME.primary900,
                                      marginLeft: SIZES.base,
                                      cursor: "pointer",
                                    }}
                                  >
                                    View Map
                                  </Text>
                                </Pressable>
                              )}
                            </View>

                            {/* MAP COMP */}
                          </View>
                        )}
                      </View>
                    </View>
                  </View>
                  {/* Additional content goes here */}
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: openMap ? SIZES.font : SIZES.base,
                      marginBottom: SIZES.padding,
                    }}
                  >
                    <Button
                      onPress={() => dispatch(handleCloseDetailsModal())}
                      additionalStyles={{
                        backgroundColor: undefined,
                        borderColor: undefined,
                        borderWidth: 0,
                      }}
                      additionalTextStyles={{
                        color:
                          colorScheme === "light"
                            ? LIGHT_THEME.contentPrimary
                            : DARK_THEME.contentPrimary,
                      }}
                      title="Cancel Booking"
                    />
                    <Button
                      additionalStyles={{
                        marginLeft: SIZES.base,
                      }}
                      title="Book Now"
                    />
                  </View>
                </View>
              </CustomBottomSheetModal>
            </View>
          )}
        </>
      </RendererHOC>
    </View>
  );
};

export default BookingsComponent;
