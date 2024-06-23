import { UsersTableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import { Metadata } from "next";
import AddUser from "@/app/ui/users/add-user";
import { BREADCRUMBS } from "@/constants/users.constants";
import { dashboardRoutes } from "@/app/lib/routes";

export const metadata: Metadata = {
  title: "Add Owner",
};

export default async function AddUserPage() {

  return (
    <div className="w-full">
      <Suspense fallback={<UsersTableSkeleton />}>
        <AddUser
          breadcrumbs={BREADCRUMBS.ADD_OWNERS}
          route={dashboardRoutes.USERS.OWNERS.BASE}
          type="owner"
          addFunction={undefined}
        />
      </Suspense>
    </div>
  );
}
