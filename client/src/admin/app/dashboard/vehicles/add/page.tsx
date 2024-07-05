import { UsersTableSkeleton } from "@/app/ui/shared/skeletons";
import { Suspense } from "react";
import { Metadata } from "next";
import CENTERS_BREADCRUMBS from "@/constants/centers.constants";
import AddVehicle from "@/app/ui/vehicles/add-vehicle";
import { VEHICLES_BREADCRUMBS } from "@/constants/vehicles.constants";
import { authenticate } from "@/app/lib/actions";

export const metadata: Metadata = {
  title: "Add Vehicle",
};

export default async function AddVehiclePage() {
  return (
    <div className="w-full">
      <Suspense fallback={<UsersTableSkeleton />}>
        <AddVehicle
          breadcrumbs={VEHICLES_BREADCRUMBS().ADD}
          addFunction={authenticate}
        />
      </Suspense>
    </div>
  );
}
