import { UsersTableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import { Metadata } from "next";
import { inter } from "@/app/ui/font";
import { NormalAddBtn } from "@/app/ui/users/buttons";
import Pagination from "@/app/ui/pagination";
import { fetchUsersPage } from "@/app/lib/requests";
import { SlotsTable } from "@/app/ui/users/tables";
import Search from "@/app/ui/shared/search";
import { dashboardRoutes } from "@/app/lib/routes";

export const metadata: Metadata = {
  title: "Slots",
};
interface ISearchParams {
  searchParams?: {
    slots?: string;
    page?: string;
    size?: string;
  };
}

export default async function SlotsPage({ searchParams }: ISearchParams) {
  const slot = searchParams?.slots || "";
  const currentPage = Number(searchParams?.page) || 1;
  const pageSize = Number(searchParams?.size) || 5;

  const totalPages = await fetchUsersPage(slot, pageSize, 'UserType.CUSTOMER');
  

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${inter.className} text-2xl`}>Slots</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search entityType="SLOTS" placeholder="Search by Slot Name" />
        <NormalAddBtn href={dashboardRoutes.SLOTS.ADD} label="Slot" />
      </div>
      <Suspense key={slot + currentPage} fallback={<UsersTableSkeleton />}>
        <SlotsTable
          query={slot}
          currentPage={currentPage}
          pageSize={pageSize}
        />
      </Suspense>
      <div className="mt-5 flex w-full justify-center flex-wrap gap-2 space-x-10">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
