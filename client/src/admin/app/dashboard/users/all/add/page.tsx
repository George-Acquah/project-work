import { UsersTableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import { Metadata } from "next";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import { dashboardRoutes } from "@/app/lib/routes";

export const metadata: Metadata = {
  title: "Add User",
};

export default async function AddUserPage() {

  return (
    <div className="w-full">
      <Breadcrumbs
        breadcrumbs={[
          {
            label: "All Users",
            href: `${dashboardRoutes.USERS.ALL.BASE}`,
          },
          {
            label: `Add User`,
            href: `${dashboardRoutes.USERS.ALL.ADD}`,
            active: true,
          },
        ]}
      />
      <Suspense fallback={<UsersTableSkeleton />}>
        {/* <ApplicantsTable applicant={applicant} currentPage={currentPage} /> */}
      </Suspense>
    </div>
  );
}
