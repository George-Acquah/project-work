import { UsersTableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import { Metadata } from "next";
import { lusitana } from "@/app/ui/font";
import SearchApplicants from "@/app/ui/users/search";
import Pagination from "@/app/ui/pagination";
import { fetchUsersPage } from "@/app/lib/requests";
import { UserType } from "@/app/lib/constants";
import UsersTable from "@/app/ui/users/tables";

export const metadata: Metadata = {
  title: "Admins",
};

interface ISearchParams {
  searchParams?: {
    applicant?: string;
    page?: string;
    size?: string;
  };
}

export default async function ApplicantsPage({ searchParams }: ISearchParams) {
  const user = searchParams?.applicant || "";
  const currentPage = Number(searchParams?.page) || 1;
  const pageSize = Number(searchParams?.size) || 5;

  const totalPages = await fetchUsersPage(user, pageSize, UserType.ADMIN);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Admins</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <SearchApplicants />
      </div>
      <Suspense key={user + currentPage} fallback={<UsersTableSkeleton />}>
        <UsersTable
          applicant={user}
          currentPage={currentPage}
          pageSize={pageSize}
          type={UserType.ADMIN}
        />
      </Suspense>
      <div className="mt-5 flex w-full justify-center flex-wrap gap-2 space-x-10">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
