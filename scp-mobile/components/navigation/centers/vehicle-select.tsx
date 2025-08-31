import React from "react";
import { View, FlatList, TouchableOpacity, Text } from "react-native";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/useRedux";
import {
  selectAllVehicles,
  setSelectedVehicle,
} from "@/features/vehicles/vehicles.slice";
import { ThemedText } from "@/components/common/ThemedText";

const VehicleSelect = () => {
  const dispatch = useAppDispatch();
  const vehicles = useAppSelector(selectAllVehicles);
  console.log(vehicles);

  const handleSelectVehicle = (vehicleId: string) => {
    dispatch(setSelectedVehicle(vehicleId));
  };

  const renderVehicle = ({ item }: { item: _IVehicle }) => (
    <TouchableOpacity
      onPress={() => handleSelectVehicle(item.vehicle_no)}
      style={{
        padding: 10,
        marginVertical: 5,
        backgroundColor: "#f0f0f0",
        borderRadius: 5,
      }}
    >
      <ThemedText>{item.vehicle_no}</ThemedText>
      <ThemedText>{item.registration_date}</ThemedText>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <ThemedText style={{ marginBottom: 10 }}>Select a Vehicle:</ThemedText>
      <FlatList
        data={vehicles}
        keyExtractor={(item) => item.vehicle_no}
        renderItem={renderVehicle}
      />
    </View>
  );
};

export default VehicleSelect;
