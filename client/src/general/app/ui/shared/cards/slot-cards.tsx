import React from "react";
import { cardsBg } from "../themes";
import Image from "next/image";
import Link from "next/link";
import { getServerSideCookies, reserveSlot } from "@/app/lib/actions";
import { clientCookiesKeys } from "@/app/lib/constants";
import { ISearchParams } from "@/app/parking-lots/[center_id]/request-reservation/page";

type _ISlotCards = {
  data: _ISlot;
  owner: _IUser;
  // searchParams: ISearchParams;
};

interface _IReservationButton {
  href: string;
  status: boolean;
  text: string;
  slot_id: string;
  center_id: string;
  vehicle_id: string;
  currentPage: number;
  size: number;
  start_time?: string;
  duration?: number;
}

const ReservationButton = ({
  href,
  status,
  text,
  slot_id,
  center_id,
  vehicle_id,
  currentPage,
  size,
  start_time,
  duration,
}: _IReservationButton) => (
  <span className="absolute right-6 top-6 z-20 inline-flex items-center justify-center rounded-full bg-primary-btn px-4 py-2 text-sm font-semibold capitalize text-white group-hover:bg-green-800 group-hover:transition-all duration-500 cursor-pointer">
    {status ? (
      <form action={reserveSlot}>
        <input type="hidden" name="slot_id" value={slot_id} />
        <input type="hidden" name="center_id" value={center_id} />
        <input type="hidden" name="vehicle_id" value={vehicle_id} />
        <input type="hidden" name="duration" value={duration} />
        <input type="hidden" name="start_time" value={start_time} />
        <input type="hidden" name="current_page" value={currentPage} />
        <input type="hidden" name="size" value={size} />
        <button>Reserve</button>
      </form>
    ) : (
      <Link href={href}>{text.slice(0, 8)}</Link>
    )}
  </span>
);

const SlotCard = async ({ data, owner, searchParams }: _ISlotCards & ISearchParams) => {
  const { _id, slot_name, center_id, slot_images, description, createdAt } =
    data;
  const [reservation_status, reservation_payload] = await Promise.all([
    getServerSideCookies(process.env.NEXT_PUBLIC_REQUEST_RESERVATION),
    getServerSideCookies(process.env.NEXT_PUBLIC_REQUEST_RESERVATION_PAYLOAD),
  ]);

  const res_payload =
    reservation_payload &&
    (JSON.parse(reservation_payload) as _IReservationPayload<string>);

  const currentPage = Number(searchParams?.page) || 1;
  const pageSize = Number(searchParams?.size) || 5;

  const href = !!reservation_status
    ? `#`
    : `/parking-lots/${center_id}/slots/${_id}/update`;

  return (
    <>
      <div
        className={`wow fadeInUp hover:shadow dark:hover:shadow-gray-dark group relative overflow-hidden rounded-sm shadow-one duration-300 ${cardsBg}`}
        data-wow-delay=".1s"
      >
        <div className="relative block aspect-[37/22] w-full group">
          <ReservationButton
            href={href}
            status={!!reservation_status}
            slot_id={_id}
            center_id={center_id}
            vehicle_id="656117b8bc100d9f24baed06"
            text={owner?._id ?? ""}
            currentPage={currentPage}
            size={pageSize}
            duration={res_payload ? res_payload.reservation_duration : 5}
            start_time={
              res_payload ? res_payload.start_time : new Date().toDateString()
            }
          />
          <Link href={href}>
            <Image
              src="https://images.unsplash.com/photo-1613314188851-2c04697535ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGNhciUyMHBhcmt8ZW58MHx8MHx8fDA%3D"
              className="object-cover w-full h-full hover:opacity-80 hover:transition hover:duration-500"
              width={500}
              height={300}
              alt="image"
            />
          </Link>
        </div>
        <div className="p-6 sm:p-8 md:px-6 md:py-8 lg:p-8 xl:px-5 xl:py-8 2xl:p-8">
          <h3>
            <Link
              href={href}
              className="mb-4 block text-xl font-bold text-black hover:text-primary-btn dark:text-white dark:hover:text-primary-btn sm:text-2xl"
            >
              {slot_name}
            </Link>
          </h3>
          <p className="mb-6 border-b border-body-color border-opacity-10 pb-6 text-base font-medium text-body-color dark:border-white dark:border-opacity-10">
            {description}
          </p>
          <div className="flex items-center">
            <div className="mr-5 flex items-center border-r border-body-color border-opacity-10 pr-5 dark:border-white dark:border-opacity-10 xl:mr-3 xl:pr-3 2xl:mr-5 2xl:pr-5">
              <div className="mr-4">
                <div className="relative h-10 w-10 overflow-hidden rounded-full">
                  <Image
                    src="https://images.unsplash.com/photo-1474176857210-7287d38d27c6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTZ8fGJsYWNrJTIwb3duZXJ8ZW58MHx8MHx8fDA%3D"
                    alt="author"
                    className="object-cover w-full h-full"
                    width={500}
                    height={30}
                  />
                </div>
              </div>
              <div className="w-full">
                <h4 className="mb-1 text-sm font-medium text-dark dark:text-white">
                  By {owner?.profile.first_name ?? "Some Owner Name"}
                </h4>
                <p className="text-xs text-body-color">
                  {owner?.profile.area ?? `Owner's area`}
                </p>
              </div>
            </div>
            <div className="inline-block">
              <h4 className="mb-1 text-sm font-medium text-dark dark:text-white">
                Date
              </h4>
              <p className="text-xs text-body-color">
                {`${new Date().getMonth()},  ${new Date().getFullYear()}`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SlotCard;
