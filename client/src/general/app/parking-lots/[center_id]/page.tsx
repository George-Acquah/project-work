import { centers } from "@/app/lib/dummy-data";
import { fetchSingleParkingCenter, verifyUser } from "@/app/lib/requests";
import ParkingCenterDetails from "@/app/ui/owner/center-details";

interface _ICenterParams {
  params: { center_id: string };
}
const ParkingLotPage = async ({ params: { center_id } }: _ICenterParams) => {
  const [user, center] = await Promise.all([verifyUser(), fetchSingleParkingCenter(center_id)]);

  console.log(center);
  //TODO fetch single parking center with the center_id. dw Ill do this later
  // TODO might fetch the user from the server

  return (
    <section className="">
      <ParkingCenterDetails owner={user} parkingCenter={centers[0]} />
    </section>
  );
};

export default ParkingLotPage;
