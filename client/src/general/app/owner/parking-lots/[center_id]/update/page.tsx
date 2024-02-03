import { testCenters } from "@/app/lib/dummy-data";
import ParkingCenterForm from "@/app/ui/owner/center-form";

interface _ICenterParams {
  params: { center_id: string };
}
const UpdateParkingCenterPage = async ({ params: { center_id} }: _ICenterParams) => {
  console.log(center_id);
  //TODO fetch real and actual parking center to be updated with the id from the params
  return <ParkingCenterForm center={testCenters[3]} />;
};

export default UpdateParkingCenterPage;
