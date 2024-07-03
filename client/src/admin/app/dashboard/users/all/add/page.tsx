import { UsersTableSkeleton } from "@/app/ui/shared/skeletons";
import { Suspense } from "react";
import { Metadata } from "next";
import AddUser from "@/app/ui/users/add-user";
import { BREADCRUMBS } from "@/constants/users.constants";
import { dashboardRoutes } from "@/app/lib/routes";

export const metadata: Metadata = {
  title: "Add User",
};

export default async function AddUserPage() {

  return (
    <div className="w-full">
      <Suspense fallback={<UsersTableSkeleton />}>
        <AddUser
          breadcrumbs={BREADCRUMBS.ADD_UERS}
          route={dashboardRoutes.USERS.ALL.BASE}
          type="user"
          addFunction={undefined}
        />
      </Suspense>
    </div>
  );
}
