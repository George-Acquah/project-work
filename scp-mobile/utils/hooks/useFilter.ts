import { selectCentersFilter } from "@/features/root.slice";
import { useAppSelector } from "./useRedux";
import { useMemo } from "react";
import { Center_Filter } from "../enums/global.enum";
import {
  fetchAvailableCenters,
  fetchNearbyCenters,
  fetchPopularCenters,
  selectAvailableCenterError,
  selectAvailableCenterLoading,
  selectAvailableCenters,
  selectCenterError,
  selectCenterLoading,
  selectMemoedAvailbleCenter,
  selectMemoedNearbyCenter,
  selectMemoedPopularCenter,
  selectNearbyCenterError,
  selectNearbyCenterLoading,
  selectNearbyCenters,
  selectPopularCenters,
} from "@/features/centers/centers.slice";


const useCenterFilter = () => {
  const center_type = useAppSelector(selectCentersFilter);

  const dispatch_data = (data: _ICenterParams) => (
      useMemo(() => {
        switch (center_type) {
          case Center_Filter.AVAILABLE:
            return fetchAvailableCenters(data);
          case Center_Filter.POPULAR:
            return fetchPopularCenters(data);
          case Center_Filter.NEARBY:
            return fetchNearbyCenters(data);
          default:
            break;
        }
      }, [center_type])
  )

  const select_data = useMemo(() => {
    switch (center_type) {
      case Center_Filter.AVAILABLE:
        return selectAvailableCenters;
      case Center_Filter.POPULAR:
        return selectPopularCenters;
      case Center_Filter.NEARBY:
        return selectNearbyCenters;
      default:
        break;
    }
  }, [center_type]);

  const select_data_ids = useMemo(() => {
    switch (center_type) {
      case Center_Filter.AVAILABLE:
        return selectMemoedAvailbleCenter;
      case Center_Filter.POPULAR:
        return selectMemoedPopularCenter;
      case Center_Filter.NEARBY:
        return selectMemoedNearbyCenter;
      default:
        break;
    }
  }, [center_type]);

  const select_loading = useMemo(() => {
    switch (center_type) {
      case Center_Filter.AVAILABLE:
        return selectAvailableCenterLoading;
      case Center_Filter.POPULAR:
        return selectCenterLoading;
      case Center_Filter.NEARBY:
        return selectNearbyCenterLoading;
      default:
        break;
    }
  }, [center_type]);

  const select_error = useMemo(() => {
    switch (center_type) {
      case Center_Filter.AVAILABLE:
        return selectAvailableCenterError;
      case Center_Filter.POPULAR:
        return selectCenterError;
      case Center_Filter.NEARBY:
        return selectNearbyCenterError;
      default:
        break;
    }
  }, [center_type]);

  return {
    select_data_ids,
    center_type,
    dispatch_data,
    select_data,
    select_loading,
    select_error,
  };
};

export default useCenterFilter;
