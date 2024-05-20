import { fetchSingleReservation } from "@/app/lib/requests";
import { convertDateToString } from "@/app/lib/utils";
import Button from "@/app/ui/shared/button";
import Link from "next/link";

interface _INestedParams {
  params: {
    center_id: string;
    slot_id: string;
  };
}
interface _IQuery {
  searchParams: {
    code: string;
  };
}

const SuccessfulReservationPage = async ({
  params: { center_id, slot_id },
  searchParams: { code },
}: _INestedParams & _IQuery) => {
  const reservation_details = await fetchSingleReservation(
    center_id,
    slot_id,
    code
  );

  return (
    <div className="text-center mt-8">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-300 mb-4">
        Congratulations ✨✨!
        <p>Your reservation was successful!</p>
      </h2>
      <div className="p-6 rounded-md my-8">
        <p className="text-lg font-semibold mb-4">Reservation Details</p>
        <div className="grid gap-4 text-justify">
          <div>
            <span className="font-bold">Reservation ID:</span>{" "}
            {reservation_details.reservation_id}
          </div>
          <div>
            <span className="font-bold">Slot ID:</span>{" "}
            {reservation_details.slot_id}
          </div>
          <div>
            <span className="font-bold">Vehicle ID:</span>{" "}
            {reservation_details.vehicle_id}
          </div>
          <div>
            <span className="font-bold">Start Time:</span>{" "}
            {convertDateToString(
              reservation_details.start_time as unknown as string
            )}
          </div>
          <div>
            <span className="font-bold">End Time:</span>{" "}
            {convertDateToString(
              reservation_details.end_time as unknown as string
            )}
          </div>
          <div>
            <span className="font-bold">Duration:</span>{" "}
            {reservation_details.duration} minutes
          </div>
          <div>
            <span className="font-bold">Cost:</span> ${reservation_details.cost}
          </div>
          <div>
            <span className="font-bold">Status:</span>{" "}
            <span
              className={
                reservation_details.status
                  ? "text-green-600"
                  : "text-yellow-600"
              }
            >
              {reservation_details.status ? "Confirmed" : "Pending"}
            </span>
          </div>
        </div>
        <Button className="float-right my-4 ml-4">
          <Link href="/reservations">Go To Your Reservations</Link>
        </Button>
        <Button variant="outline" className="float-right my-4">
          <Link href={`/parking-lots/${center_id}/request-reservation`}>
            Go Back
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default SuccessfulReservationPage;
