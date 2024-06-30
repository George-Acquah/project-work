import { UsersTableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import { Metadata } from "next";
import AddCenter from "@/app/ui/centers/add-center";
import CENTERS_BREADCRUMBS from "@/constants/centers.constants";

export const metadata: Metadata = {
  title: "Add Center",
};

export default async function AddCenterPage() {
  return (
    <div className="w-full">
      <Suspense fallback={<UsersTableSkeleton />}>
        <AddCenter
          breadcrumbs={CENTERS_BREADCRUMBS().UPDATE_CENTER}
          addFunction={undefined}
        />
      </Suspense>
    </div>
  );
}
