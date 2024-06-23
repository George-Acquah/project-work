import { UsersTableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import { Metadata } from "next";
import { lusitana } from "@/app/ui/font";
import { AddCenter } from "@/app/ui/users/buttons";
import Pagination from "@/app/ui/pagination";
import { fetchUsersPage } from "@/app/lib/requests";
import { CentersTable } from "@/app/ui/users/tables";
import Search from "@/app/ui/shared/search";

export const metadata: Metadata = {
  title: "Parking Centers",
};
interface ISearchParams {
  searchParams?: {
    centers?: string;
    page?: string;
    size?: string;
  };
}

export default async function ParkingCenterPage({ searchParams }: ISearchParams) {
  const center = searchParams?.centers || "";
  const currentPage = Number(searchParams?.page) || 1;
  const pageSize = Number(searchParams?.size) || 5;

  const totalPages = await fetchUsersPage(center, pageSize, 'UserType.CUSTOMER');
  

  return (
    <div className="">
      <div className="flex items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Parking Centers</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search entityType="centers" placeholder="Search by Center Name"/>
        <AddCenter />
      </div>
      <Suspense key={center + currentPage} fallback={<UsersTableSkeleton />}>
        <CentersTable
          query={center}
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
