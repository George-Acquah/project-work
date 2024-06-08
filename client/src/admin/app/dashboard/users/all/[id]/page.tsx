import { UsersTableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import { Metadata } from "next";
import { lusitana } from "@/app/ui/font";
import SearchApplicants from "@/app/ui/users/search";
import { AddCustomer } from "@/app/ui/users/buttons";
import Pagination from "@/app/ui/pagination";
// import ApplicantsTable from "@/app/ui/users/applicants-table";
import { fetchUsersPage } from "@/app/lib/requests";
import { UserType } from "@/app/lib/constants";

export const metadata: Metadata = {
  title: "Applicants",
};

interface ISearchParams {
  searchParams?: {
    applicant?: string;
    page?: string;
  };
}

export default async function ApplicantsPage({ searchParams }: ISearchParams) {
  const applicant = searchParams?.applicant || "";
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchUsersPage(applicant, currentPage, UserType.CUSTOMER);

  console.log(totalPages);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Applicants</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <SearchApplicants entityType={""} />
        <AddCustomer />
      </div>
      <Suspense
        key={applicant + currentPage}
        fallback={<UsersTableSkeleton />}
      >
        {/* <ApplicantsTable applicant={applicant} currentPage={currentPage} /> */}
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
