import React, { useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  View as RNView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet
} from "react-native";
import { Image } from 'expo-image'
import MapView, { Marker, Callout } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/useRedux";
import {
  getLocation,
  selectCurrentLocation,
  selectOriginDescription,
} from "@/features/permissions/permissions.slice";
import { LIGHT_THEME, SHARED_COLORS } from "@/constants/Colors";
import FiltersTab from "@/components/navigation/shared/filters-tab";
import SearchBox from "@/components/navigation/shared/search-box";
import { useColorScheme } from "@/utils/hooks/useColorScheme";
import RendererHOC from "@/components/common/renderer.hoc";
import { generateHomeStyles } from "./styles";
import HomeSearch from "./shared/home-search";
import useCenterFilter from "@/utils/hooks/useFilter";
import { router } from "expo-router";
import { BASE_URL } from "@/api/root";

export default function Home() {
  const colorScheme = useColorScheme() ?? "light";
  const styles = generateHomeStyles(colorScheme);
  const { select_data, select_loading } =
    useCenterFilter();
  const mapRef = useRef<MapView>(null);
  const [showFilters, setShowFilters] = useState(false);
  const currentLocation = useAppSelector(selectCurrentLocation);
  const centers = useAppSelector(select_data);
  const loading = useAppSelector(select_loading);

useEffect(() => {
  if (centers.length > 0) {
    const coordinates = centers.map((center) => {
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
}, [centers]);
  
    const blurhash =
      "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

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
              latitudeDelta: 0.7,
              longitudeDelta: 0.7,
            }}
          >
            {centers.map((center, index) => {
              return (
                <Marker
                  key={`${center._id}_${index}`}
                  coordinate={{
                    latitude: center?.address?.latitude ?? 0,
                    longitude: center?.address?.longitude ?? 0,
                  }}
                  onCalloutPress={() =>
                    router.push(`/parking-lots/${center._id}`)
                  }
                >
                  <Callout>
                    <View style={customStyles.calloutContainer}>
                      <Image
                        source={`${BASE_URL}images/${center.image}`}
                        key={`${center._id}-${index}`}
                        style={[customStyles.image, { width: 120 }]}
                        placeholder={{ blurhash }}
                        contentFit="cover"
                        transition={1000}
                      />
                      <Text style={customStyles.calloutTitle}>
                        {center.center_name}
                      </Text>
                      <Text style={customStyles.calloutDescription}>
                        {center?.location}
                      </Text>
                      <TouchableOpacity style={customStyles.calloutButton}>
                        <Text style={{ color: "white" }}>Request Slot</Text>
                      </TouchableOpacity>
                    </View>
                  </Callout>
                </Marker>
              );
            })}
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
    justifyContent: "center",
    // height: 180
  },
  calloutTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  image: {
    height: 70,
    resizeMode: "cover",
  },
  calloutDescription: {
    fontSize: 14,
    color: "gray",
    marginBottom: 10,
  },
  calloutButton: {
    backgroundColor: LIGHT_THEME.primary800,
    borderRadius: 50,
    padding: 10,
    alignItems: "center",
  },
});