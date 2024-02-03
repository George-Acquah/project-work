import React from "react";
import ParkingCenters from "@/app/ui/owner/parking-center";
import List from "@/app/ui/shared/lists";
import { fetchFilteredParkingCenters } from "@/app/lib/requests";


const ParkingCentersPage = async () => {
  const [centers] = await Promise.all([
    (await fetchFilteredParkingCenters()).data,
  ]);

  const centerNames = centers.map((center) => {
    return { name: center.center_name, id: center._id };
  });
  return (
    <section className="space-y-8">
      <List
        data={centerNames}
        def_data={{ name: centerNames[0].name }}
        pure
        icon
      />
      {/* <Suspense fallback={<CardsSkeleton />}>
        <MapComp centers={testCenters} highlighted_id="" />
      </Suspense> */}
      <ParkingCenters />
    </section>
  );
};

export default ParkingCentersPage;
