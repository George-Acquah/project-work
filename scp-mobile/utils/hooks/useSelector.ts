import { selectAvailableCenters, selectMemoedAvailbleCenter, selectMemoedNearbyCenter, selectMemoedPopularCenter, selectNearbyCenters, selectPopularCenters } from "@/features/centers/centers.slice";
import { useMemo } from "react";
import { Center_Filter, Slot_Type } from "../enums/global.enum";
import { selectMemoedNearbySlot, selectMemoedPopularSlot, selectNearbySlots, selectPopularSlots } from "@/features/slots/parking-slots.slice";

const useCenterSelector = (center: Center_Filter) =>
  useMemo(() => {
    switch (center) {
      case Center_Filter.NEARBY:
        console.log();
        return selectNearbyCenters;
      case Center_Filter.POPULAR:
        return selectPopularCenters;
      case Center_Filter.AVAILABLE:
        return selectAvailableCenters;
      default:
        break;
    }
  }, [center]);

  const useSlotSelector = (slot: Slot_Type) =>
    useMemo(() => {
      switch (slot) {
        case Slot_Type.NEARBY:
          return selectNearbySlots;
        case Slot_Type.POPULAR:
          return selectPopularSlots;
        default:
          break;
      }
    }, [slot]);

  const useCenterIDSelector = (center: Center_Filter) =>
    useMemo(() => {
      switch (center) {
        case Center_Filter.NEARBY:
          return selectMemoedNearbyCenter;
        case Center_Filter.POPULAR:
          return selectMemoedPopularCenter;
        case Center_Filter.AVAILABLE:
          return selectMemoedAvailbleCenter;
        default:
          break;
      }
    }, [center]);

      const useSlotIDSelector = (slot: Slot_Type) =>
        useMemo(() => {
          switch (slot) {
            case Slot_Type.NEARBY:
              return selectMemoedNearbySlot;
            case Slot_Type.POPULAR:
              return selectMemoedPopularSlot;
            default:
              break;
          }
        }, [slot]);

export { useCenterSelector, useSlotSelector, useCenterIDSelector, useSlotIDSelector };
