import { View, FlatList, StyleSheet } from "react-native";
import React from "react";
import { useAppSelector } from "@/utils/hooks/useRedux";
import {
  selectReservationLoading,
  selectReservations,
} from "@/features/reservations/reservations.slice";
import Button from "@/components/common/button";
import RendererHOC from "@/components/common/renderer.hoc";
import useRoles from "@/utils/hooks/useRoles.hook";
import { UserType } from "@/utils/enums/global.enum";
import { SafeAreaView } from "react-native-safe-area-context";
import { LIGHT_THEME } from "@/constants/Colors";
import { SIZES } from "@/constants/styles";
import { useColorScheme } from "@/utils/hooks/useColorScheme";
import { ThemedText } from "@/components/common/ThemedText";
import { FONTS } from "@/constants/fonts";
import { text_colors } from "@/components/auth/styles";
import NoItemFound from "@/components/common/no-item";


const ReservationsScreen = () => {
  const { role, loading: role_loading } = useRoles();
  const reservations = useAppSelector(selectReservations);
  const loading = useAppSelector(selectReservationLoading);
  

  const isOwner = role === UserType.PARK_OWNER;

  const colorScheme = useColorScheme() ?? "light";

  const renderReservationItem = ({ item }: { item: _ISlotReservation }) => (
    <View style={styles.reservationCard}>
      <ThemedText style={styles.reservationText}>Slot ID: {item.slotId}</ThemedText>
      <ThemedText style={styles.reservationText}>Start Time: {item.start_time}</ThemedText>
      <ThemedText style={styles.reservationText}>End Time: {item.end_time}</ThemedText>
      <ThemedText style={styles.reservationText}>Cost: ${item.cost_of_reservation}</ThemedText>
      <ThemedText style={styles.reservationText}>Free Waiting Time: {item.free_waiting_time} mins</ThemedText>
      {isOwner && (
        <View style={styles.ownerOptions}>
          <Button title="Edit" onPress={() => handleEdit(item.reservationId)} />
          <Button title="Cancel" onPress={() => handleCancel(item.reservationId)} />
        </View>
      )}
    </View>
  );

  const handleEdit = (reservationId: string) => {
    // Logic to handle edit
  };

  const handleCancel = (reservationId: string) => {
    // Logic to handle cancellation
  };

  return (
    <RendererHOC loading={loading || role_loading} error={null}>
      {reservations && reservations.length > 0 ? (
        <SafeAreaView style={{ flexGrow: 1 }}>
          <ThemedText
            style={{ ...FONTS.h1, textAlign: "center" }}
            {...text_colors.title}
          >
            Reservations
          </ThemedText>
          <FlatList
            data={reservations}
            renderItem={renderReservationItem}
            keyExtractor={(item) => item.reservationId}
            style={styles.list}
          />
        </SafeAreaView>
      ) : (
        <NoItemFound
          title="You have no reservations"
          description="You must have deleted all your reservations or check again"
        />
      )}
    </RendererHOC>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  reservationCard: {
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 3,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  reservationText: {
    fontSize: 16,
    marginBottom: 4,
    color: 'red'
  },
  ownerOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
});

export default ReservationsScreen;