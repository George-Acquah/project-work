import React, { useRef, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/useRedux";
import { setSelectedSlot } from "@/features/slots/parking-slots.slice";
import { useSlotFilter } from '@/utils/hooks/useFilter'

const SlotMap = () => {
  const dispatch = useAppDispatch();
  const { select_data, select_data_ids } = useSlotFilter();
  const mapRef = useRef<MapView>(null);
  const slots = useAppSelector(select_data);
  const slotIds = useAppSelector(select_data_ids);

  useEffect(() => {
    if (slots.length > 0) {
      const coordinates = slots.map((slot) => ({
        latitude: slot.location.location.lat,
        longitude: slot.location.location.lng,
      }));
      const edgePadding = { top: 100, right: 100, bottom: 100, left: 100 }; // Adjust padding as needed
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
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0432,
      }}
    >
      {/* Display markers for all parking centers */}
      {slots.map((slot, index) => (
        <Marker
          key={index}
          coordinate={{
            latitude: slot.location.location.lat,
            longitude: slot.location.location.lng,
          }}
          title={slot.slot_name}
          description={slot.description}
          onPress={() => {
            dispatch(setSelectedSlot(slot._id));
          }}
        />
      ))}
    </MapView>
  );
};

export default SlotMap;
