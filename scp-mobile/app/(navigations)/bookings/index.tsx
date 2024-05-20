import {
  bookingHistory,
  favoriteParkingCenters,
  upcomingBookings,
} from "@/constants/data";
import { SIZES } from "@/constants/styles";
import {
  fetchAllBookings,
  selectBookingLoading,
} from "@/features/bookings/bookings.slice";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/useRedux";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "@/utils/hooks/useColorScheme";
import BookingsComponent from "@/components/navigation/bookings/bookings";
import { LIGHT_THEME, DARK_THEME } from "@/constants/Colors";

const BookingsTab = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const colorScheme = useColorScheme() ?? "light";

  const dispatch = useAppDispatch();
  const bookingsLoading = useAppSelector(selectBookingLoading);

  useEffect(() => {
    const data = {
      upcomingUrl: upcomingBookings,
      historyUrl: bookingHistory,
      favouriteUrl: favoriteParkingCenters,
    };
    dispatch(fetchAllBookings(data));
  }, []);

  return (
    <SafeAreaView
      style={{
        paddingHorizontal: SIZES.radius,
        backgroundColor:
          colorScheme === "light"
            ? LIGHT_THEME.backgroundPrimary
            : undefined,
        height: "100%",
      }}
    >
      <BookingsComponent />
    </SafeAreaView>
  );
};

export default BookingsTab;
