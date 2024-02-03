import { testCenters } from "@/app/lib/dummy-data";
import ParkingCenterForm from "@/app/ui/owner/center-form";

interface _INestedParams {
  params: {
    center_id: string;
    slot_id: string;
  }
}
const UpdateSlotPage = async ({ params: { center_id, slot_id} }: _INestedParams) => {
  console.log({ center_id, slot_id});
  //TODO fetch real and actual parking center to be updated with the id from the params
  return <ParkingCenterForm center={ testCenters[3]}/>;
};

export default UpdateSlotPage;
