import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/useRedux";
import {
  getLocation,
  selectOriginDescription,
} from "@/features/permissions/permissions.slice";
import RendererHOC from "@/components/common/renderer.hoc";
import Home from "@/components/navigation/home";
import useScreenLoading from "@/utils/hooks/use-screen-loading";
import useCenterFilter from "@/utils/hooks/useFilter";

export default function HomeScreen() {
  const { screenLoading } = useScreenLoading();
  const dispatch = useAppDispatch();
  const { select_loading, dispatch_data, center_type } =
    useCenterFilter();
  const fetch_data = dispatch_data({
    centers: "",
    currentPage: 1,
    pageSize: 5,
  });
  const loading = useAppSelector(select_loading);
  const desc = useAppSelector(selectOriginDescription);

  useEffect(() => {
    dispatch(getLocation());
    dispatch(fetch_data);
  }, [desc, center_type]);

  return (
    <RendererHOC loading={screenLoading || loading} error={null}>
      <Home />
    </RendererHOC>
  );
}
