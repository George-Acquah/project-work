import React, { useRef, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import { useAppSelector } from "@/utils/hooks/useRedux";
import useCenterFilter from "@/utils/hooks/useFilter";

const CenterMap = () => {
  const mapRef = useRef<MapView>(null);
  const { select_data, select_data_ids} = useCenterFilter();
  const parkingCenters = useAppSelector(select_data);
  const centerIds = useAppSelector(select_data_ids);

useEffect(() => {
  if (parkingCenters.length > 0) {
    const coordinates = parkingCenters.map((center) => {
      return {
        latitude: center?.address?.latitude ?? 0,
        longitude: center?.address?.longitude ?? 0,
      };
    });

    const edgePadding = { top: 100, right: 90, bottom: 100, left: 90 };
    mapRef.current?.fitToCoordinates(coordinates, {
      edgePadding,
      animated: true,
    });
  }
}, [centerIds]);

  return (
    <MapView
      ref={mapRef}
      style={{ flex: 1 }}
      mapType="mutedStandard"
      initialRegion={{
        latitude: parkingCenters[0]?.address?.latitude ?? 0,
        longitude: parkingCenters[0]?.address?.longitude ?? 0,
        latitudeDelta: 0.7,
        longitudeDelta: 0.7,
      }}
    >
      {/* Display markers for all parking centers */}
      {parkingCenters.map((center, index) => (
        <Marker
          key={index}
          coordinate={{
            latitude: center?.address?.latitude ?? 0,
            longitude: center?.address?.longitude ?? 0,
          }}
          title={center.center_name}
          description={center?.location}
        />
      ))}
    </MapView>
  );
};

export default CenterMap;
