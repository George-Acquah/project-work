import { testCenters } from "@/app/lib/dummy-data";
import ParkingCenterForm from "@/app/ui/owner/center-form";

const UpdateVehiclePage = async ({ params: { id } }: _IRSCParams) => {
  console.log(id);
  //TODO fetch real and actual parking center to be updated with the id from the params
  return <ParkingCenterForm center={ testCenters[3]}/>;
};

export default UpdateVehiclePage;
