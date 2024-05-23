import { ThemedView as View } from "@/components/common/ThemedView";
import { ThemedText as Text } from "@/components/common/ThemedText";

import {
  getLocation,
  selectOriginDescription,
} from "@/features/permissions/permissions.slice";
import { EAutoComplete } from "@/utils/enums/auto-complete";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/useRedux";
import React, { useEffect } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Button from "@/components/common/button";
import { router } from "expo-router";
import { FONTS } from "@/constants/fonts";
import { SIZES } from "@/constants/styles";
import { LIGHT_THEME, SHARED_COLORS } from "@/constants/Colors";
import { text_colors } from "@/components/auth/styles";
import FiltersTab from "@/components/navigation/shared/filters-tab";
import { useColorScheme } from "@/hooks/useColorScheme"
import PlacesAutoComplete from "@/components/navigation/shared/auto-complete";
import RendererHOC from "@/components/common/renderer.hoc";
import ParkingCenters from "@/components/navigation/centers/parking-centers";

export default function HomeScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const loading = false;
  const dispatch = useAppDispatch();
  const desc = useAppSelector(selectOriginDescription);

  useEffect(() => {
    dispatch(getLocation());
  }, [desc]);
  const background_colors = {
    container: {
      lightColor: SHARED_COLORS.gray400,
      darkColor: SHARED_COLORS.gray900,
    },
  };

  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: SIZES.padding * 0.6 }}>
      {/* <Header /> */}
      <View style={{ marginBottom: SIZES.padding * 0.6 }}>
        <Text style={{ ...FONTS.h2 }} {...text_colors.title}>
          Hello from Home Screen
        </Text>
      </View>

      <RendererHOC loading={loading} error={null}>
        <View>
          <View style={{ marginTop: 20, position: "relative" }}>
            <PlacesAutoComplete
              placeholder="Change your Location"
              type={EAutoComplete.ORIGIN}
            />
            <Ionicons
              style={{ position: "absolute", top: "24%", right: 15 }}
              size={20}
              color={
                colorScheme === "light"
                  ? SHARED_COLORS.gray600
                  : SHARED_COLORS.gray700
              }
              name="location"
            />
          </View>

          <Button title="Search Bar" onPress={() => router.push("/search/")} />

          <View style={{ marginTop: 20 }}>
            <FiltersTab />
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <ParkingCenters />
            <View style={{ marginVertical: 10 }} />
          </ScrollView>
          {/* <Map /> */}
        </View>
       </RendererHOC>
    </SafeAreaView>
  );
}
