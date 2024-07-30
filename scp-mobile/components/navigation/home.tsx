import React, { useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  View as RNView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet
} from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/useRedux";
import {
  getLocation,
  selectCurrentLocation,
  selectOriginDescription,
} from "@/features/permissions/permissions.slice";
import { SHARED_COLORS } from "@/constants/Colors";
import FiltersTab from "@/components/navigation/shared/filters-tab";
import SearchBox from "@/components/navigation/shared/search-box";
import { useColorScheme } from "@/utils/hooks/useColorScheme";
import RendererHOC from "@/components/common/renderer.hoc";
import { generateHomeStyles } from "./styles";
import HomeSearch from "./shared/home-search";
import useCenterFilter from "@/utils/hooks/useFilter";
import { ThemedText } from "../common/ThemedText";
import Button from "../common/button";
import { SIZES } from "@/constants/styles";
import { router } from "expo-router";

export default function Home() {
  const colorScheme = useColorScheme() ?? "light";
  const styles = generateHomeStyles(colorScheme);
  const { select_data, select_data_ids, select_error, select_loading } =
    useCenterFilter();
  const dispatch = useAppDispatch();
  const desc = useAppSelector(selectOriginDescription);
  const mapRef = useRef<MapView>(null);
  const [showFilters, setShowFilters] = useState(false);
  const currentLocation = useAppSelector(selectCurrentLocation);
  const centers = useAppSelector(select_data);
  const loading = useAppSelector(select_loading);

  useEffect(() => {
    dispatch(getLocation());
  }, [desc, dispatch]);

  useEffect(() => {
    if (centers.length > 0) {
      const coordinates = centers.map((center) => ({
        latitude: center.center_address?.latitude ?? 0,
        longitude: center.center_address?.longitude ?? 0,
      }));

      const edgePadding = { top: 100, right: 100, bottom: 100, left: 100 };
      mapRef.current?.fitToCoordinates(coordinates, {
        edgePadding,
        animated: true,
      });
    }
  }, [centers]);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <RendererHOC loading={loading} error={null}>
        <View style={styles.container}>
          <MapView
            style={styles.map}
            ref={mapRef}
            initialRegion={{
              latitude: currentLocation?.location.lat ?? 6.2167,
              longitude: currentLocation?.location.lng ?? -2.5833,
              latitudeDelta: 0.9,
              longitudeDelta: 0.9,
            }}
          >
            {centers.map((center, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: center.center_address?.latitude ?? 0,
                  longitude: center.center_address?.longitude ?? 0,
                }}
                onCalloutPress={() =>
                  router.push(`/parking-lots/${center._id}`)
                }
              >
                <Callout>
                  <View style={customStyles.calloutContainer}>
                    <Text style={customStyles.calloutTitle}>
                      {center.center_name}
                    </Text>
                    <Text style={customStyles.calloutDescription}>
                      {center.center_address?.state}
                    </Text>
                    <TouchableOpacity
                      style={customStyles.calloutButton}
                    >
                      <Text style={{ color: "white" }}>See More</Text>
                    </TouchableOpacity>
                  </View>
                </Callout>
              </Marker>
            ))}
          </MapView>

          {showFilters ? (
            <RNView style={styles.overlay}>
              <View style={{ marginBottom: 10 }}>
                <SearchBox />
              </View>
              <FiltersTab
                py={3}
                px={16}
                textColor={{
                  darkColor: SHARED_COLORS.gray800,
                  lightColor: SHARED_COLORS.gray800,
                }}
              />
            </RNView>
          ) : (
            <View style={styles.searchButton}>
              <HomeSearch />
            </View>
          )}

          <TouchableOpacity
            style={styles.toggleButton}
            onPress={() => setShowFilters(!showFilters)}
          >
            <Ionicons
              name={showFilters ? "eye-off" : "eye"}
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </View>
      </RendererHOC>
    </SafeAreaView>
  );
}

const customStyles = StyleSheet.create({
  calloutContainer: {
    width: 120,
    // padding: 10,
    borderRadius: 10,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: 'center'
  },
  calloutTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  calloutDescription: {
    fontSize: 14,
    color: "gray",
    marginBottom: 10,
  },
  calloutButton: {
    backgroundColor: SHARED_COLORS.gray800,
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
  },
});