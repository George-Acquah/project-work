import { ScrollView, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { searchParamsKeys } from "@/constants/root";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/useRedux";
import useCenterFilter from "@/utils/hooks/useFilter";
import Pagination from "@/components/common/pagination";
import { SHARED_COLORS } from "@/constants/Colors";
import { ThemedView as View } from "@/components/common/ThemedView";
import { ThemedText as Text } from "@/components/common/ThemedText";
import FiltersTab from "@/components/navigation/shared/filters-tab";
import ParkingCentersCard from "@/components/navigation/centers/parking-center-card";
import { FONTS } from "@/constants/fonts";
import { text_colors } from "@/components/auth/styles";
import SearchComp from "@/components/common/search";
import useRoles from "@/utils/hooks/useRoles.hook";
import { FontAwesome } from "@expo/vector-icons";
import { useColorScheme } from "@/utils/hooks/useColorScheme";
import { UserType } from "@/utils/enums/global.enum";
import { SafeAreaView } from "react-native-safe-area-context";

interface _ISearchParams extends SearchParamsKeys {
  centers: string;
  page: string;
  size: string;
}
const background_colors = {
  data: {
    lightColor: SHARED_COLORS.gray900,
    darkColor: SHARED_COLORS.gray400,
  },
};

//TODO Implement additional filtering
const ParkingCentersScreen = () => {
  const { dispatch_data, select_loading, select_data, center_type } =
    useCenterFilter();
  const colorScheme = useColorScheme() ?? "light";
  const searchParams = useLocalSearchParams<_ISearchParams>();
  const data = useAppSelector(select_data);
  const loading = useAppSelector(select_loading);

  const dispatch = useAppDispatch();

  //TODO Avoiding making use effect run elsewhere when center_type is changed elsewhere

  const center = searchParams?.centers || "";
  const currentPage = Number(searchParams?.page) || 1;
  const pageSize = Number(searchParams?.size) || 5;
  const fetch_data = dispatch_data({ centers: center, currentPage, pageSize });
  const { role } = useRoles();

  useEffect(() => {
    dispatch(fetch_data);
  }, [center, pageSize, center_type]);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text
          style={{
            ...FONTS.h3,
            alignItems: "center",
            letterSpacing: 1.005,
          }}
          {...text_colors.title}
        >
          Parking Centers Screen
        </Text>
      </View>

      <View style={{ marginTop: 20 }}>
        <SearchComp
          entityType={searchParamsKeys.centers}
          searchLoading={loading}
          placeholder="Search For Centers"
        />
      </View>

      <View style={{ marginTop: 20 }}>
        <FiltersTab />
      </View>

      <View
        style={{
          height: 0.4,
          marginTop: 30,
        }}
        {...background_colors.data}
      />

      <View style={styles.scrollViewContainer}>
        <ScrollView
          // style={{ paddingTop: 20 }}
          showsVerticalScrollIndicator={false}
        >
          {data && (
            <>
              {data.length > 1 ? (
                data.map((center, i) => (
                  <View key={center._id} style={{ marginHorizontal: 20 }}>
                    <ParkingCentersCard center={center} index={i} width={350} />
                  </View>
                ))
              ) : (
                <View>
                  <Text>{`${center_type} Centers are empty`}</Text>
                </View>
              )}
              {data.length > 1 && <Pagination totalPages={data.length} />}
            </>
          )}
        </ScrollView>
      </View>

      {role === UserType.PARK_OWNER && (
        <FontAwesome
          name="plus"
          color={colorScheme === "light" ? SHARED_COLORS.gray900 : "white"}
          size={34}
          style={styles.plusIcon}
          onPress={() => router.navigate("/parking-lots/add")}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    // padding: 20, // Adjust the padding as necessary
  },
  scrollViewContainer: {
    flex: 1,
    // marginBottom: 50, // Add bottom margin to avoid overlap with the plus icon
    paddingVertical: 20,
  },
  plusIcon: {
    position: "absolute",
    bottom: 20, // Adjust to your preference
    right: 20, // Adjust to your preference
  },
});


export default ParkingCentersScreen;
