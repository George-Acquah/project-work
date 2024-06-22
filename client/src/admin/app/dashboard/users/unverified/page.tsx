import { Suspense } from "react";
import { Metadata } from "next";
import { lusitana } from "@/app/ui/font";
import Search from "@/app/ui/shared/search";

export const metadata: Metadata = {
  title: "Unverified Applicants",
};

interface ISearchParams {
  searchParams?: {
    query?: string;
    page?: string;
  };
}

export default async function ApplicationsPage({
  searchParams,
}: ISearchParams) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  // const totalPages = await fetchInvoicesPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>
          Unverifed Applicants
        </h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search entityType={""} />
        {/* <CreateInvoice /> */}
      </div>
      {/* <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense> */}
      <div className="mt-5 flex w-full justify-center">
        {/* <Pagination totalPages={totalPages} /> */}
      </div>
    </div>
  );
}
