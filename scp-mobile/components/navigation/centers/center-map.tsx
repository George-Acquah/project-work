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
      const coordinates = parkingCenters.map((center) => ({
        latitude: center.location.location.lat,
        longitude: center.location.location.lng,
      }));
      const edgePadding = { top: 100, right: 100, bottom: 100, left: 100 }; // Adjust padding as needed
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
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0432,
      }}
    >
      {/* Display markers for all parking centers */}
      {parkingCenters.map((center, index) => (
        <Marker
          key={index}
          coordinate={{
            latitude: center.location.location.lat,
            longitude: center.location.location.lng,
          }}
          title={center.center_name}
          description={center.description}
        />
      ))}
    </MapView>
  );
};

export default CenterMap;
