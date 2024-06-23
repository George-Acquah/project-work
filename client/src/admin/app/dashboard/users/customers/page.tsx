import { UsersTableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import { Metadata } from "next";
import { lusitana } from "@/app/ui/font";
import { AddCustomer } from "@/app/ui/users/buttons";
import Pagination from "@/app/ui/pagination";
import { fetchUsersPage } from "@/app/lib/requests";
import { UserType } from "@/app/lib/constants";
import UsersTable from "@/app/ui/users/tables";
import Search from "@/app/ui/shared/search";

export const metadata: Metadata = {
  title: "Customers",
};

interface ISearchParams {
  searchParams?: {
    users?: string;
    page?: string;
    size?: string;
  };
}

export default async function ApplicantsPage({ searchParams }: ISearchParams) {
  const user = searchParams?.users || "";
  const currentPage = Number(searchParams?.page) || 1;
  const pageSize = Number(searchParams?.size) || 5;

  const totalPages = await fetchUsersPage(user, pageSize, UserType.CUSTOMER);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Customers</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search entityType="USERS" />
        <AddCustomer />
      </div>
      <Suspense
        key={user + currentPage}
        fallback={<UsersTableSkeleton />}
      >
        <UsersTable query={user} currentPage={currentPage} pageSize={pageSize} type={UserType.CUSTOMER} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center flex-wrap gap-2 space-x-10">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
