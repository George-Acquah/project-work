import { centers } from "@/app/lib/dummy-data";
import ParkingCenterDetails from "@/app/ui/owner/center-details";

interface _ICenterParams {
  params: { center_id: string };
}
const ParkingLotPage = async ({ params: { center_id } }: _ICenterParams) => {
  //TODO fetch single parking center with the center_id. dw Ill do this later
  return <section className="">
    <ParkingCenterDetails parkingCenter={centers[0]} />
  </section>;
};

export default ParkingLotPage;
