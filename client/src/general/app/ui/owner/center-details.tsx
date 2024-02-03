import React from "react";
import { HeartIcon } from "@heroicons/react/24/outline";
import Button from "../shared/button";
import Link from "next/link";
import SlotCard from "../shared/cards/slot-cards";
import Pagination from "../shared/pagination";
import List from "../shared/lists";
import { getServerSideCookies } from "@/app/lib/actions";
import {
  clientCookiesKeys,
  listData,
  searchParamsKeys,
} from "@/app/lib/constants";
import SearchComp from "../shared/search";

interface ParkingCenterDetailsProps {
  parkingCenter: _IParkingCenter;
  owner: _IUser;
}

const TestSlot = ({
  slots,
  owner,
}: {
  slots: _ISlot[];
  owner: _IUser;
}) => {
  return (
    <div className="-mx-4 flex flex-wrap justify-center">
      {slots.map((slot) => (
        <div key={slot._id} className="w-full p-4 md:w-2/3 lg:w-1/2 xl:w-1/3">
          <SlotCard data={slot} owner={owner}/>
        </div>
      ))}
    </div>
  );
};

const ParkingCenterDetails: React.FC<ParkingCenterDetailsProps> = async ({
  parkingCenter,
  owner,
}) => {
  const def_lsv = await getServerSideCookies(clientCookiesKeys.LIST_VAL);

  const href = `/owner/parking-lots/${parkingCenter._id}/update`;
  const href2 = `/owner/parking-lots/${parkingCenter._id}/add-images`;
  const type = "test" as "test" | "owner";
  return (
    <div className="container">
      <>
        <h2 className="flex justify-between items-center text-3xl font-bold mb-4">
          {parkingCenter.center_name}{" "}
          <HeartIcon className="h-8 w-8 lg:hidden cursor-pointer" />
          <div className="flex items-center gap-x-2">
            <Button
              // onClick={onSaveFavorite}
              className="w-fit hidden lg:flex cursor-pointer"
            >
              <HeartIcon className="h-6 w-6" />
              <span className="ml-2">Save as Favorite</span>
            </Button>
            <Link
              href={`/parking-lots/${parkingCenter._id}/request-reservation`}
            >
              <Button className="hidden w-fit my-2 lg:flex cursor-pointer text-base lg:text-lg">
                Reserve Center
              </Button>
            </Link>
          </div>
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-400 mb-4">
          {parkingCenter.description}
        </p>
      </>

      <div className="">
        {/* Left Column: Basic Details */}
        <div>
          <p className="text-sm text-gray-500 mb-2">
            <span className="font-semibold">Type:</span> {parkingCenter.type}
          </p>
          <p className="text-sm text-gray-500 mb-2">
            <span className="font-semibold">Contact:</span>{" "}
            {parkingCenter.contact}
          </p>
          <p className="text-sm text-gray-500 mb-2">
            <span className="font-semibold">Location:</span>{" "}
            {parkingCenter.location}
          </p>
          <p className="text-sm text-gray-500 mb-2">
            <span className="font-semibold">Available:</span>{" "}
            {parkingCenter.isAvailable ? "Yes" : "No"}
          </p>
        </div>
      </div>

      <Link
        href={`/parking-lots/${parkingCenter._id}/request-reservation`}
      >
        <Button className="w-fit my-2 lg:hidden cursor-pointer text-base lg:text-lg">
          Reserve Center
        </Button>
      </Link>
      <h2 className="text-xl my-8">Slots in this center</h2>

      <div className="lg:flex gap-x-4 transition-all duration-300">
        <SearchComp entityType={searchParamsKeys.slots} />
        <List data={listData} def_data={{ name: def_lsv ?? "all" }} icon />
      </div>
      <TestSlot
        slots={parkingCenter.slots}
        owner={owner}
      />

      {/* //TODO BUTTONS */}
      <div className="">
        {type === "owner" && (
          <div className="flex w-full gap-x-4">
            <Link className="w-[50%]" href={href}>
              <Button variant="outline" className="w-full">
                Edit Center
              </Button>
            </Link>
            <Link className="w-[50%]" href={href2}>
              <Button variant="outline" className="w-full">
                Add Images
              </Button>
            </Link>
          </div>
        )}
      </div>
      <Pagination totalPages={parkingCenter.slots.length} />
    </div>
  );
};

export default ParkingCenterDetails;
