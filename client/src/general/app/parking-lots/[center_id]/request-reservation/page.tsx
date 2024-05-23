import {
  deleteServerSideCookies,
  getServerSideCookies,
} from "@/app/lib/actions";
import { slotsResData, searchParamsKeys } from "@/app/lib/constants";
import RequestReservationForm from "@/app/ui/driver/request-reservation-form";
import Button from "@/app/ui/shared/button";
import SlotCard from "@/app/ui/shared/cards/slot-cards";
import List from "@/app/ui/shared/lists";
import Pagination from "@/app/ui/shared/pagination";
import SearchComp from "@/app/ui/shared/search";
import { auth } from "@/auth";
export interface ISearchParams {
  searchParams?: {
    page?: string;
    size?: string;
  };
}

interface _ICenterParams {
  params: { center_id: string };
  // searchParams: ISearchParams;
}
const RequestReservationPage = async ({
  params: { center_id },  searchParams,
}: _ICenterParams & ISearchParams) => {
  const [reservation_status, reservation_payload, def_data, pages, def_lsv, session] =
    await Promise.all([
      getServerSideCookies(process.env.NEXT_PUBLIC_REQUEST_RESERVATION),
      getServerSideCookies(process.env.NEXT_PUBLIC_REQUEST_RESERVATION_PAYLOAD),
      getServerSideCookies(process.env.NEXT_PUBLIC_REQUEST_RESERVATION_DATA),
      getServerSideCookies(process.env.NEXT_PUBLIC_AVAILABLE_SLOTS),
      getServerSideCookies(process.env.NEXT_PUBLIC_LIST_VAL),
      auth(),
    ]);

  const slots = def_data && JSON.parse(def_data) as _ISlot[];
  if (!!reservation_status && slots && slots.length === 0) {
    return (
      <form
        action={async () => {
          "use server";
          await Promise.all([
            deleteServerSideCookies(process.env.NEXT_PUBLIC_REQUEST_RESERVATION),
            deleteServerSideCookies(process.env.NEXT_PUBLIC_REQUEST_RESERVATION_DATA),
            deleteServerSideCookies(process.env.NEXT_PUBLIC_AVAILABLE_SLOTS),
            deleteServerSideCookies(process.env.NEXT_PUBLIC_REQUEST_RESERVATION_PAYLOAD),
          ]);
        }}
        className="max-w-[40rem] mx-auto text-center"
      >
        {" "}
        <h1>No Available Slots Within the selected time</h1>
        <Button size="md" className="mt-8">
          Reserve For Different Time
        </Button>
      </form>
    );
  }
  return (
    <section className="">
      <h1 className="text-2xl lg:text-3xl">
        {!!reservation_status ? "Book Reservation" : "Request Reservation"}
      </h1>
      <RequestReservationForm
        center_id={center_id}
        checker={!!reservation_status}
      />
      {!!reservation_status && slots && (
        <>
          <h3 className="my-8">Available Slots for Your Reservation</h3>
          <div className="lg:flex gap-x-4 transition-all duration-300">
            <SearchComp entityType={searchParamsKeys.slots} />
            <List data={slotsResData} def_data={{ name: def_lsv ?? "all" }} icon />
          </div>
          <div className="-mx-4 flex flex-wrap justify-center">
            {slots.map((slot) => (
              <div
                key={slot._id}
                className="w-full p-4 md:w-2/3 lg:w-1/2 xl:w-1/3"
              >
                <SlotCard data={slot} owner={session?.user!} searchParams={searchParams} />
              </div>
            ))}
          </div>
          <Pagination totalPages={parseInt(pages ?? "3")} />
        </>
      )}
    </section>
  );
};

export default RequestReservationPage;
