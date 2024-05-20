import React from "react";
import { centers } from "@/app/lib/dummy-data";
import Pagination from "../shared/pagination";
import SlotCard from "../shared/cards/slot-cards";

//TODO might not show cards at all here, might probably show only the map with centers
const Slots = async ({ slots, owner }: { slots: _ISlot[], owner: _IUser }) => {
  return (
    <section className="pb-[40px] pt-[60px]">
      <div className="container">
        <div className="-mx-4 flex flex-wrap justify-center">
          {slots.map((slot) => (
            <div
              className="w-full p-4 md:w-2/3 lg:w-1/2 xl:w-1/3"
              key={slot._id}
            >
              <SlotCard data={slot} owner={owner} center_name={centers[0].center_name} />
            </div>
          ))}
        </div>
        <Pagination totalPages={slots.length} />
      </div>
    </section>
  );
};

export default Slots;
