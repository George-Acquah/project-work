import React, { Suspense } from "react";
import ParkingCenters from "../../ui/owner/parking-center";
import MapComp from "../../ui/shared/map";
import { testCenters } from "../../lib/dummy-data";
import { CardsSkeleton } from "@/app/ui/shared/skeletons";

const OwnerPage = async () => {

  return (
    <section className="">
      <h2 className="text-2xl font-bold">Your Parking Centers</h2>

      {/* Display Parking Centers */}
      <ParkingCenters />
      {/* Display Map */}
      <div className="">
        <h2 className="text-2xl font-bold ">Map View</h2>
        <Suspense fallback={<CardsSkeleton />}>
          <MapComp centers={testCenters} highlighted_id="" />
        </Suspense>
      </div>
    </section>
  );
};

export default OwnerPage;
