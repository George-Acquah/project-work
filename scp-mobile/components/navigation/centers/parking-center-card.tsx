import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import { AntDesign, Entypo, MaterialIcons } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/useRedux";
import {
  saveFavoriteCenter,
  selectSavedCenter,
} from "@/features/centers/centers.slice";
import {
  selectStartTIme,
  fetchAvailableSlots,
  setDuration,
  selectStartDate,
} from "@/features/reservations/reservations.slice";
import { usePathname, useRouter } from "expo-router";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useRef } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import Button from "@/components/common/button";
import { TabBarIcon } from "../TabBarIcon";
import { LIGHT_THEME, SHARED_COLORS } from "@/constants/Colors";
import CustomBottomSheetModal from "@/components/common/custom-bottom-sheet-modal";
import { MotiView } from "moti";
import { useColorScheme } from "@/utils/hooks/useColorScheme";
import RequestReservationForm from "../bookings/request-reservation-form";
interface _ICenterCard {
  center: _IParkingCenter; //To be Changes later
  index: number;
  width?: number;
  height?: number;
}
const ParkingCentersCard = ({ center, index, width }: _ICenterCard) => {
  const url = usePathname();
  const colorScheme = useColorScheme() ?? "light";
  const { _id, center_name, slots } = center;
  const requestReservationModalRef = useRef<BottomSheetModal>(null);
  const startTime = useAppSelector(selectStartTIme);
  const startDate = useAppSelector(selectStartDate);
  const saved = useAppSelector(selectSavedCenter);
  const dispatch = useAppDispatch();

  const router = useRouter();

  const href = `/parking-lots/${_id}` as any;

  const handleReservation = async (data: any) => {
    const { duration } = data;
    const confirmReservationHref = ``
    const req_href = `/parking-lots/${_id}/slots/reserve-slot?start_date=${startDate}&start_time=${startTime}&duration=${duration}`;

    const result = unwrapResult(
      await dispatch(
        fetchAvailableSlots({
          center_id: _id,
          pageSize: 20,
          start_time: new Date(startTime),
          start_date: new Date(startDate),
          reservation_duration: duration,
          callbackUrl: url
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

  return (
    <TouchableOpacity style={styles.cardContainer}>
      <View style={styles.imageContainer}>
        <Button
          additionalStyles={{
            borderRadius: 30,
            position: "absolute",
            zIndex: 20,
            paddingHorizontal: 8,
            right: 12,
            top: 6,
          }}
          type="opacity"
          title="Reserve"
          onPress={() => requestReservationModalRef?.current?.present()}
        />
        <Image
          source={{ uri: "https://randomuser.me/api/portraits/men/1.jpg" }}
          style={[styles.image, { width: width ? width : 220 }]}
        />
      </View>
      <Pressable onPress={() => router.push(href)} style={styles.infoContainer}>
        <View style={styles.myJustify}>
          <Text style={styles.nameText}>{center_name}</Text>
          <TabBarIcon
            fontProvider={AntDesign}
            name="hearto"
            color={saved === index ? LIGHT_THEME.primary400 : "black"}
            onPress={() => dispatch(saveFavoriteCenter(_id))}
          />
        </View>
        <View style={styles.myJustify}>
          <View style={styles.detailsRow}>
            <TabBarIcon fontProvider={Entypo} name="location" size={16} />
            <Text style={styles.distanceText}>
              {center.center_address?.state ?? 20} mi
            </Text>
          </View>
          <View style={styles.detailsRow}>
            <TabBarIcon
              fontProvider={MaterialIcons}
              name="no-crash"
              size={16}
            />
            <Text style={styles.distanceText}>{slots.length}</Text>
          </View>
        </View>
      </Pressable>

      {/* Reservation Modal */}
      <CustomBottomSheetModal
        points={["85%", "90%"]}
        index={1}
        pressBehavior={'none'}
        bg={
          colorScheme === "light"
            ? SHARED_COLORS.gray300
            : SHARED_COLORS.gray700
        }
        indicatorBg={
          colorScheme === "light"
            ? SHARED_COLORS.gray700
            : SHARED_COLORS.gray200
        }
        ref={requestReservationModalRef}
      >
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={
            {
              type: "timing",
              duration: 50,
            } as any
          }
          style={{ width: "100%", flex: 1 }}
        >
          {/* Your modal content */}
          <RequestReservationForm handleReservation={handleReservation} />
        </MotiView>
      </CustomBottomSheetModal>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 16,
    flexDirection: "column",
    overflow: "hidden",
    borderTopEndRadius: 6,
    borderTopStartRadius: 6,
  },

  imageContainer: {
    flex: 1,
    borderTopLeftRadius: 12, // Top-left corner rounded
    borderTopRightRadius: 12, // Top-right corner rounded
    position: "relative",
  },
  image: {
    height: 150,
    resizeMode: "cover",
  },
  infoContainer: {
    flex: 2,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  nameText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  detailsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  distanceText: {
    fontSize: 14,

    color: "#aaa",
    marginLeft: 4,
  },
  rating: {},
  availabilityText: {
    fontSize: 14,
    color: "#333",
  },
  myJustify: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default ParkingCentersCard;
