import { UsersTableSkeleton } from "@/app/ui/shared/skeletons";
import { Suspense } from "react";
import { Metadata } from "next";
import { inter } from "@/app/ui/font";
import Pagination from "@/app/ui/shared/pagination";
import { fetchReservationsPage, fetchUsersPage } from "@/app/lib/requests";
import { ReservationsTable, SlotsTable } from "@/app/ui/shared/tables";
import Search from "@/app/ui/shared/search";


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

export default async function ReservationsPage({ searchParams }: ISearchParams) {
  const reservations = searchParams?.reservations || "";
  const currentPage = Number(searchParams?.page) || 1;
  const pageSize = Number(searchParams?.size) || 5;

  const totalPages = await fetchReservationsPage(
    reservations,
    pageSize,
  );

  console.log(totalPages);
  

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${inter.className} text-2xl`}>Reservations</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search entityType="RESERVATIONS" placeholder="Search by Reservation Name" />
      </div>
      <Suspense
        key={reservations + currentPage}
        fallback={<UsersTableSkeleton />}
      >
        <ReservationsTable
          query={reservations}
          currentPage={currentPage}
          pageSize={pageSize}
        />
      </Suspense>
      <div className="mt-5 flex w-full justify-center flex-wrap gap-2 space-x-10">
        <Pagination totalPages={totalPages ?? 0} />
      </div>
    </div>
  );
}
