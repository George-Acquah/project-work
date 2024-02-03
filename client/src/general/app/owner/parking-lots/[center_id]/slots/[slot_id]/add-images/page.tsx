import { testCenters } from "@/app/lib/dummy-data";
import CenterImagesForm from "@/app/ui/owner/images-form";
interface _INestedParams {
  params: {
    center_id: string;
    slot_id: string;
  };
}
const AddParkingCenterImages = ({ params: { center_id, slot_id } }: _INestedParams) => {
  return <CenterImagesForm center={testCenters[9]}/>
}

export default AddParkingCenterImages;