import React, { useRef, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/useRedux";
import { useSlotFilter } from "@/utils/hooks/useFilter";
import { setSelectedAvailableSlot } from "@/features/reservations/reservations.slice";

const SlotMap = () => {
  const dispatch = useAppDispatch();
  const { select_data, select_data_ids } = useSlotFilter();
  const mapRef = useRef<MapView>(null);
  const slots = useAppSelector(select_data);
  const slotIds = useAppSelector(select_data_ids);

useEffect(() => {
  if (slots.length > 0) {
    const coordinates = slots.map((slot) => {
      return {
        latitude: slot?.address?.latitude ?? 0,
        longitude: slot?.address?.longitude ?? 0,
      };
    });

    const edgePadding = { top: 100, right: 90, bottom: 100, left: 90 };
    mapRef.current?.fitToCoordinates(coordinates, {
      edgePadding,
      animated: true,
    });
  }
}, [slotIds]);

  return (
    <MapView
      ref={mapRef}
      style={{ flex: 1 }}
      mapType="mutedStandard"
      initialRegion={{
        latitude: slots[0]?.address?.latitude ?? 0,
        longitude: slots[0]?.address?.longitude ?? 0,
        latitudeDelta: 0.7,
        longitudeDelta: 0.7,
      }}
    >
      {/* Display markers for all slots */}
      {slots.map((slot, index) => (
        <Marker
          key={index}
          coordinate={{
            latitude: slot?.address?.latitude ?? 0,
            longitude: slot?.address?.longitude ?? 0,
          }}
          title={slot.slot_name}
          description={slot.location}
          onPress={() => {
            dispatch(setSelectedAvailableSlot(slot._id));
          }}
        />
      ))}
    </MapView>
  );
};

export default SlotMap;
