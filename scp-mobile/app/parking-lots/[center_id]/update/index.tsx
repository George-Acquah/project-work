import RendererHOC from "@/components/common/renderer.hoc";
import ParkingCenterForm from "@/components/parking/center-forms";
import ParkingCenterFormSkeleton from "@/components/skeletons/centers/center-form.skeleton";
import { ids } from "@/constants/root";
import { fetchSingleCenter, selectCenterError, selectCenterLoading, selectFetchedCenter } from "@/features/centers/centers.slice";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/useRedux";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";

const UpdateParkingCenterScreen = () => {
  //Params
  const params = useLocalSearchParams<_ICenterDetailsParams>();
  const { center_id } = params;

  // Dispatch and selectors
  const dispatch = useAppDispatch();
    const loading = useAppSelector(selectCenterLoading);
    const error = useAppSelector(selectCenterError);
    const center = useAppSelector(selectFetchedCenter) ?? undefined;

  //Fetch Center using center_id in useEffect
  useEffect(() => {
    console.log(center_id);
    dispatch(fetchSingleCenter(ids.CENTER));
  }, []);
  return (
    <RendererHOC loading={loading} error={null} loadingComponent={<ParkingCenterFormSkeleton />}>
      <ParkingCenterForm center={center}/>
    </RendererHOC>
  );
}

export default UpdateParkingCenterScreen;