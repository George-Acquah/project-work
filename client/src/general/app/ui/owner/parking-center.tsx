import React from "react";
import ParkingCenterCard from "../shared/cards/center-cards";
import { centers } from "@/app/lib/dummy-data";
import Pagination from "../shared/pagination";
import { verifyUser } from "@/app/lib/requests";

//TODO might not show cards at all here, might probably show only the map with centers
const ParkingCenters = async () => {
  const user = await verifyUser();

  return (
    <section className="pb-[40px] pt-[60px]">
      <div className="container">
        <div className="-mx-4 flex flex-wrap justify-center">
          {centers.map((center) => (
            <div
              className="w-full p-4 md:w-2/3 lg:w-1/2 xl:w-1/3"
              key={center._id}
            >
              <ParkingCenterCard data={center} owner={user} />
            </div>
          ))}
        </div>
        <Pagination totalPages={centers.length} />
      </div>
    </section>
  );
};

export default ParkingCenters;
