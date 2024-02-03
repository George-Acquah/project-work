import React, { Suspense } from "react";
import ParkingCenters from "@/app/ui/owner/parking-center";
import MapComp from "@/app/ui/shared/map";
import List from "@/app/ui/shared/lists";
import { testCenters } from "@/app/lib/dummy-data";
import { CardsSkeleton } from "@/app/ui/shared/skeletons";

const ParkingCentersPage = async () => {
  return (
    <section className="space-y-8">
      {/* <List /> */}
      <Suspense fallback={<CardsSkeleton />}>
        <MapComp centers={testCenters} highlighted_id="" />
      </Suspense>
      <ParkingCenters />
    </section>
  );
};

export default ParkingCentersPage;
