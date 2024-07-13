import {
  bookingHistory,
  favoriteParkingCenters,
  upcomingBookings,
} from "@/constants/data";
import { SIZES } from "@/constants/styles";
import { fetchAllBookings } from "@/features/bookings/bookings.slice";
import { useAppDispatch } from "@/utils/hooks/useRedux";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "@/utils/hooks/useColorScheme";
import BookingsComponent from "@/components/navigation/bookings/bookings";
import { LIGHT_THEME, DARK_THEME } from "@/constants/Colors";
import RendererHOC from "@/components/common/renderer.hoc";
import useScreenLoading from "@/utils/hooks/use-screen-loading";

const BookingsTab = () => {
  const colorScheme = useColorScheme() ?? "light";
  const { screenLoading } = useScreenLoading();

  const dispatch = useAppDispatch();

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
          colorScheme === "light" ? LIGHT_THEME.backgroundPrimary : undefined,
        height: "100%",
      }}
    >
      <RendererHOC loading={screenLoading} error={null}>
        <BookingsComponent />
      </RendererHOC>
    </SafeAreaView>
  );
};

export default BookingsTab;
