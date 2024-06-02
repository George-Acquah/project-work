import RendererHOC from "@/components/common/renderer.hoc";
import { useAppDispatch } from "@/utils/hooks/useRedux";
import useRoles from "@/utils/hooks/useRoles.hook";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";

const UpdateSlotScreen = () => {
  //Get Params
  const params = useLocalSearchParams<_ISlotDetailsParams>();
  const { center_id, slot_id } = params;

  //Roles
  const { role, loading: role_loading } = useRoles();

  //Dispatch and Selectors
  const dispatch = useAppDispatch();
  useEffect(() => {}, []);
  return (
    <RendererHOC loading={role_loading} error={null}>
      <></>
    </RendererHOC>
  );
};

export default UpdateSlotScreen;
