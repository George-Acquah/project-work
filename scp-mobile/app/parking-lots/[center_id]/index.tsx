import React, { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/useRedux";
import RendererHOC from "@/components/common/renderer.hoc";
import {  _IFont } from "@/components/navigation/TabBarIcon";
import {
  fetchSingleCenter,
  selectCenterError,
  selectCenterLoading,
} from "@/features/centers/centers.slice";
import useRoles from "@/utils/hooks/useRoles.hook";
import { UserType } from "@/utils/enums/global.enum";
import ParkingCenterDetailsComponent from "@/components/navigation/centers/center-details";
import useScreenLoading from "@/utils/hooks/use-screen-loading";

const ParkingCenterDetails = () => {
  //Params
  const params = useLocalSearchParams<_ICenterDetailsParams>();
  const { center_id } = params;

  //fetch user role using useRoles hook
  const { role, loading: role_loading } = useRoles();

  //Dispatch and Selectors
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectCenterLoading);
  const error = useAppSelector(selectCenterError);
  const { screenLoading } = useScreenLoading();

  //Fetch Center using center_id in useEffect
  useEffect(() => {
    dispatch(fetchSingleCenter(center_id!));
  }, []);

  return (
    <RendererHOC loading={loading || role_loading || screenLoading} error={error}>
      <ParkingCenterDetailsComponent role={role ?? UserType.CUSTOMER} />
    </RendererHOC>
  );
};

export default ParkingCenterDetails;
