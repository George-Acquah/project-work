import { testCenters } from "@/app/lib/dummy-data";
import CenterImagesForm from "@/app/ui/owner/images-form";

const AddParkingCenterImages = ({ params: { id } }: _IRSCParams) => {
  return <CenterImagesForm center={testCenters[9]}/>
}

export default AddParkingCenterImages;