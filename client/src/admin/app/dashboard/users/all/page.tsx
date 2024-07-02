import { UsersTableSkeleton, FilterSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import { Metadata } from "next";
import { inter } from "@/app/ui/font";
import { NormalAddBtn } from "@/app/ui/users/buttons";
import Pagination from "@/app/ui/pagination";
import { fetchUsersPage } from "@/app/lib/requests";
import { UserType } from "@/app/lib/constants";
import UsersTable from "@/app/ui/users/tables";
import Filters from "@/app/ui/shared/filters";
import AllUsersFilter from "@/app/ui/users/all-users.filter";
import Search from "@/app/ui/shared/search";
import { dashboardRoutes } from "@/app/lib/routes";

export const metadata: Metadata = {
  title: "Users",
};

interface ISearchParams {
  searchParams?: {
    users?: string;
    page?: string;
    size?: string;
  };
}

export default async function AllUsersPage({ searchParams }: ISearchParams) {
  const user = searchParams?.users || "";
  const currentPage = Number(searchParams?.page) || 1;
  const pageSize = Number(searchParams?.size) || 5;

  const totalPages = await fetchUsersPage(user, pageSize, UserType.CUSTOMER);

  return (
    <main>
      <div className="flex items-center justify-between">
        <h1 className={`${inter.className} text-2xl`}>Users</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search entityType="USERS" />
        <Filters>
          <Suspense key={user} fallback={<FilterSkeleton />}>
            <AllUsersFilter />
          </Suspense>
        </Filters>
        <NormalAddBtn
          href={dashboardRoutes.USERS.ALL.ADD}
          label="User"
        />
      </div>
      <Suspense
        // Ensure this key only changes when fetching new data
        key={`${user}-${currentPage}-${pageSize}`}
        fallback={<UsersTableSkeleton />}
      >
        <UsersTable
          query={user}
          currentPage={currentPage}
          pageSize={pageSize}
          type={UserType.ALL}
        />
      </Suspense>
      <div className="mt-5 flex justify-center flex-wrap gap-2 space-x-10">
        <Pagination totalPages={totalPages} />
      </div>
    </main>
  );
}
