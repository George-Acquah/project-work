import { UsersTableSkeleton } from "@/app/ui/shared/skeletons";
import { Suspense } from "react";
import { Metadata } from "next";
import { inter } from "@/app/ui/font";
import Pagination from "@/app/ui/shared/pagination";
import { fetchUsersPage } from "@/app/lib/requests";
import { SlotsTable } from "@/app/ui/shared/tables";
import Search from "@/app/ui/shared/search";
import { NormalAddBtn } from "@/app/ui/users/buttons";
import { dashboardRoutes } from "@/app/lib/routes";


export const metadata: Metadata = {
  title: "Reservations",
};
interface ISearchParams {
  searchParams?: {
    reservations?: string;
    page?: string;
    size?: string;
  };
}

export default async function SlotsPage({ searchParams }: ISearchParams) {
  const reservations = searchParams?.reservations || "";
  const currentPage = Number(searchParams?.page) || 1;
  const pageSize = Number(searchParams?.size) || 5;

  const totalPages = await fetchUsersPage(
    reservations,
    pageSize,
    "UserType.CUSTOMER"
  );
  

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${inter.className} text-2xl`}>Reservations</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search entityType="RESERVATIONS" placeholder="Search by Reservation Name" />
        <NormalAddBtn href={dashboardRoutes.RESERVATIONS.ADD} label="Reservation" />;
      </div>
      <Suspense
        key={reservations + currentPage}
        fallback={<UsersTableSkeleton />}
      >
        <SlotsTable
          query={reservations}
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
