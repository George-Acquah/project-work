import { ScrollView } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
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
  
  const searchParams = useLocalSearchParams<_ISearchParams>();
  const data = useAppSelector(select_data);
  const loading = useAppSelector(select_loading);

  const dispatch = useAppDispatch();

  //TODO Avoiding making use effect run elsewhere when center_type is changed elsewhere

  const center = searchParams?.centers || "";
  const currentPage = Number(searchParams?.page) || 1;
  const pageSize = Number(searchParams?.size) || 5;
  const fetch_data = dispatch_data({ centers: center, currentPage, pageSize });

  useEffect(() => {
    dispatch(fetch_data);
  }, [center, pageSize, center_type]);

  return (
    <View>
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
      <>
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
      </>
      {/* //DATA */}
      <View
        style={{
          height: 0.4,
          marginVertical: 30,
        }}
        {...background_colors.data}
      />

      {data && (
        <>
          <View style={{ paddingBottom: data.length > 1 ? 450 : undefined }}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {data.length > 1 ? (
                data.map((center, i) => {
                  return (
                    <View key={center._id} style={{ marginHorizontal: 20 }}>
                      <ParkingCentersCard
                        center={center}
                        index={i}
                        width={350}
                      />
                    </View>
                  );
                })
              ) : (
                <View>
                  <Text> {`${center_type} Centers are empty`}</Text>
                </View>
              )}
              {data.length > 1 && <Pagination totalPages={data.length} />}
            </ScrollView>
          </View>
        </>
      )}
    </View>
  );
};

export default ParkingCentersScreen;
