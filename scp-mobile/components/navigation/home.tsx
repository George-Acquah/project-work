import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View as RNView,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/useRedux";
import {
  getLocation,
  selectOriginDescription,
} from "@/features/permissions/permissions.slice";
import { SHARED_COLORS } from "@/constants/Colors";
import FiltersTab from "@/components/navigation/shared/filters-tab";
import SearchBox from "@/components/navigation/shared/search-box";
import ParkingCenters from "@/components/navigation/centers/parking-centers";
import { useColorScheme } from "@/utils/hooks/useColorScheme";
import RendererHOC from "@/components/common/renderer.hoc";
import { generateHomeStyles } from "./styles";
import HomeSearch from "./shared/home-search";

export default function Home() {
  const colorScheme = useColorScheme() ?? "light";
  const styles = generateHomeStyles(colorScheme);
  const loading = false;
  const dispatch = useAppDispatch();
  const desc = useAppSelector(selectOriginDescription);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    dispatch(getLocation());
  }, [desc]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <RendererHOC loading={loading} error={null}>
        <View style={styles.container}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            {/* Replace the Marker with actual parking spot data */}
            <Marker
              coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
              title="Parking Spot"
              description="Description of the parking spot"
            />
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
