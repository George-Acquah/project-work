import { selectCentersFilter, selectSlotsFilter } from "@/features/root.slice";
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
import { fetchAvailableSlots, fetchNearbySlot, fetchPopularSlots, selectMemoedNearbySlot, selectMemoedPopularSlot, selectNearbySlotError, selectNearbySlotLoading, selectNearbySlots, selectPopularSlots, selectSlotError, selectSlotLoading } from "@/features/slots/parking-slots.slice";
import { selectAvailableSlots, selectAvailableSlotsLoading, selectIsAvailableSlotsError, selectMemoedAvailableSlots } from "@/features/reservations/reservations.slice";


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
          throw new Error(`Unexpected center_type: ${center_type}`);
      }
    }, [center_type])
  );

  const select_data = useMemo(() => {
    console.log(center_type);
  switch (center_type) {
    case Center_Filter.AVAILABLE:
      return selectAvailableCenters;
    case Center_Filter.POPULAR:
      return selectPopularCenters;
    case Center_Filter.NEARBY:
      return selectNearbyCenters;
    default:
      // Handle unexpected center_type, for example:
      throw new Error(`Unexpected center_type: ${center_type}`);
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
        throw new Error(`Unexpected center_type: ${center_type}`);
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
        throw new Error(`Unexpected center_type: ${center_type}`);
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
        throw new Error(`Unexpected center_type: ${center_type}`);
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

export const useSlotFilter = () => {
  const slot_type = useAppSelector(selectSlotsFilter);
  console.log(slot_type);

  const dispatch_data = (data: _ISlotParams) =>
    useMemo(() => {
      switch (slot_type) {
        case Center_Filter.AVAILABLE:
          return fetchAvailableSlots(data);
        case Center_Filter.POPULAR:
          return fetchPopularSlots(data);
        case Center_Filter.NEARBY:
          return fetchNearbySlot(data);
        default:
          throw new Error(`Unexpected slot_type: ${slot_type}`);
      }
    }, [slot_type]);

  const select_data = useMemo(() => {
    switch (slot_type) {
      case Center_Filter.AVAILABLE:
        return selectNearbySlots;
      case Center_Filter.POPULAR:
        return selectPopularSlots;
      case Center_Filter.NEARBY:
        return selectNearbySlots;
      default:
        // Handle unexpected center_type, for example:
        throw new Error(`Unexpected slot_type: ${slot_type}`);
    }
  }, [slot_type]);

  const select_data_ids = useMemo(() => {
    switch (slot_type) {
      case Center_Filter.AVAILABLE:
        return selectMemoedNearbySlot;
      case Center_Filter.POPULAR:
        return selectMemoedPopularSlot;
      case Center_Filter.NEARBY:
        return selectMemoedNearbySlot;
      default:
        throw new Error(`Unexpected center_type: ${slot_type}`);
    }
  }, [slot_type]);

  const select_loading = useMemo(() => {
    switch (slot_type) {
      case Center_Filter.AVAILABLE:
        return selectAvailableSlotsLoading;
      case Center_Filter.POPULAR:
        return selectSlotLoading;
      case Center_Filter.NEARBY:
        return selectNearbySlotLoading;
      default:
        throw new Error(`Unexpected slot_type: ${slot_type}`);
    }
  }, [slot_type]);

  const select_error = useMemo(() => {
    switch (slot_type) {
      case Center_Filter.AVAILABLE:
        return selectIsAvailableSlotsError;
      case Center_Filter.POPULAR:
        return selectSlotError;
      case Center_Filter.NEARBY:
        return selectNearbySlotError;
      default:
        throw new Error(`Unexpected slot_type: ${slot_type}`);
    }
  }, [slot_type]);

  return {
    select_data_ids,
    slot_type,
    dispatch_data,
    select_data,
    select_loading,
    select_error,
  };
};

export default useCenterFilter;
