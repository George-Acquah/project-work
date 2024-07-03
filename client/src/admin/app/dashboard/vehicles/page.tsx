import { UsersTableSkeleton } from "@/app/ui/shared/skeletons";
import { Suspense } from "react";
import { Metadata } from "next";
import { inter } from "@/app/ui/font";
import Pagination from "@/app/ui/shared/pagination";
import { fetchUsersPage } from "@/app/lib/requests";
import { VehiclesTable } from "@/app/ui/shared/tables";
import Search from "@/app/ui/shared/search";
import { NormalAddBtn } from "@/app/ui/users/buttons";
import { dashboardRoutes } from "@/app/lib/routes";

export const metadata: Metadata = {
  title: "Vehicles",
};
interface ISearchParams {
  searchParams?: {
    vehicles?: string;
    page?: string;
    size?: string;
  };
}

export default async function VehiclesPage({ searchParams }: ISearchParams) {
  const vehicles = searchParams?.vehicles || "";
  const currentPage = Number(searchParams?.page) || 1;
  const pageSize = Number(searchParams?.size) || 5;

  const totalPages = await fetchUsersPage(
    vehicles,
    pageSize,
    "UserType.CUSTOMER"
  );
  

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${inter.className} text-2xl`}>Vehicles</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search entityType="VEHICLES" placeholder="Search by Vehicle Number" />
        <NormalAddBtn href={dashboardRoutes.VEHICLES.ADD} label="Vehicle" />
      </div>
      <Suspense key={vehicles + currentPage} fallback={<UsersTableSkeleton />}>
        <VehiclesTable
          query={vehicles}
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
