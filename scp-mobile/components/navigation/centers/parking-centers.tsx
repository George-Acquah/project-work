import { SIZES } from "@/constants/styles";
import { TouchableOpacity, FlatList } from "react-native";
import { ThemedView as View } from "@/components/common/ThemedView";
import { ThemedText as Text } from "@/components/common/ThemedText";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/useRedux";
import {
  testCenters,
} from "@/features/centers/centers.slice";
import { collpaseMap, selectViewMap, showMap } from "@/features/root.slice";
import { useLocalSearchParams } from "expo-router";
import CenterMap from "./center-map";
import useCenterFilter from "@/utils/hooks/useFilter";
import ParkingCentersCard from "./parking-center-card";
import { FONTS } from "@/constants/fonts";
import RendererHOC from "@/components/common/renderer.hoc";
import Pagination from "@/components/common/pagination";

const ParkingCenters = () => {
  const searchParams = useLocalSearchParams<{ page?: string }>();
  const currentPage = Number(searchParams.page) || 1;
  const { center_type, select_data, select_error, select_loading } =
    useCenterFilter();
    const dispatch = useAppDispatch();
    const centers = useAppSelector(select_data); // Might be buggy
    const isLoading = useAppSelector(select_loading);
    const viewMap = useAppSelector(selectViewMap);
    const error = useAppSelector(select_error);

  useEffect(() => {
    dispatch(testCenters());
  }, [currentPage, center_type ]);

  const success = !isLoading && !error;
  console.log('cenb: ', centers);

  return (
    <View style={{ marginTop: SIZES.xLarge }}>
      <View
        style={{ marginBottom: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}
      >
        <Text
          style={{
            // fontSize: SIZES.large,
            textTransform: "capitalize",
            ...FONTS.ps3,
          }}
        >
          {`${center_type} Centers`}
        </Text>
        {success && centers && centers.length > 0 && (
          <TouchableOpacity
            onPress={() => {
              if (viewMap) {
                dispatch(collpaseMap());
              } else {
                dispatch(showMap());
              }
            }}
          >
            <Text style={{}}>{viewMap ? "Collapse Map" : "View On Map"}</Text>
          </TouchableOpacity>
        )}
      </View>
      <View>
        <RendererHOC loading={isLoading} error={error}>
          {viewMap ? (
            <View style={{ width: "100%", height: 420 }}>
              <CenterMap />
            </View>
          ) : (
            <>
              <FlatList
                data={centers}
                renderItem={({ item, index }) => (
                  <ParkingCentersCard
                    index={index}
                    center={item}
                  />
                )}
                keyExtractor={(item) => item._id}
                contentContainerStyle={{ columnGap: SIZES.medium }}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
              <Pagination totalPages={centers.length} />
            </>
          )}
        </RendererHOC>
      </View>
    </View>
  );
};

export default ParkingCenters;
