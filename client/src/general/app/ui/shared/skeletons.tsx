import { bodyBg, cardsBg, textColor } from "./themes";

// Loading animation
const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export function CardSkeleton() {
  return (
    <div
      className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-100 p-2 shadow-sm`}
    >
      <div className="flex p-4">
        <div className="h-5 w-5 rounded-md bg-gray-200" />
        <div className="ml-2 h-6 w-16 rounded-md bg-gray-200 text-sm font-medium" />
      </div>
      <div className="flex items-center justify-center truncate rounded-xl bg-white px-4 py-8">
        <div className="h-7 w-20 rounded-md bg-gray-200" />
      </div>
    </div>
  );
}

export function CardsSkeleton() {
  return (
    <>
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </>
  );
}

export function RevenueChartSkeleton() {
  return (
    <div className={`${shimmer} relative w-full overflow-hidden md:col-span-4`}>
      <div className="mb-4 h-8 w-36 rounded-md bg-gray-100" />
      <div className="rounded-xl bg-gray-100 p-4">
        <div className="sm:grid-cols-13 mt-0 grid h-[410px] grid-cols-12 items-end gap-2 rounded-md  bg-white p-4 md:gap-4" />
        <div className="flex items-center pb-2 pt-6">
          <div className="h-5 w-5 rounded-full bg-gray-200" />
          <div className="ml-2 h-4 w-20 rounded-md bg-gray-200" />
        </div>
      </div>
    </div>
  );
}

export function InvoiceSkeleton() {
  return (
    <div className="flex flex-row items-center justify-between border-b border-gray-100 py-4">
      <div className="flex items-center">
        <div className="mr-2 h-8 w-8 rounded-full bg-gray-200" />
        <div className="min-w-0">
          <div className="h-5 w-40 rounded-md bg-gray-200" />
          <div className="mt-2 h-4 w-12 rounded-md bg-gray-200" />
        </div>
      </div>
      <div className="mt-2 h-4 w-12 rounded-md bg-gray-200" />
    </div>
  );
}

export function LatestInvoicesSkeleton() {
  return (
    <div
      className={`${shimmer} relative flex w-full flex-col overflow-hidden md:col-span-4 lg:col-span-4`}
    >
      <div className="mb-4 h-8 w-36 rounded-md bg-gray-100" />
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-100 p-4">
        <div className="bg-white px-6">
          <InvoiceSkeleton />
          <InvoiceSkeleton />
          <InvoiceSkeleton />
          <InvoiceSkeleton />
          <InvoiceSkeleton />
          <div className="flex items-center pb-2 pt-6">
            <div className="h-5 w-5 rounded-full bg-gray-200" />
            <div className="ml-2 h-4 w-20 rounded-md bg-gray-200" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DashboardSkeleton() {
  return (
    <>
      <div
        className={`${shimmer} relative mb-4 h-8 w-36 overflow-hidden rounded-md bg-gray-100`}
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <RevenueChartSkeleton />
        <LatestInvoicesSkeleton />
      </div>
    </>
  );
}

export function TableRowSkeleton() {
  return (
    <tr
      className={`w-full border-b border-gray-100 last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg`}
    >
      {/* Customer Name and Image */}
      <td className="relative overflow-hidden whitespace-nowrap py-3 pl-6 pr-3">
        <div className={`h-8 w-8 rounded-full ${bodyBg}`}></div>
      </td>
      <td className="relative overflow-hidden whitespace-nowrap py-3 pl-6 pr-3">
        <div className={`h-6 w-24 rounded ${bodyBg}`}></div>
      </td>

      {/* Email */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className={`h-6 w-32 rounded ${bodyBg}`}></div>
      </td>
      {/* Amount */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className={`h-6 w-16 rounded ${bodyBg}`}></div>
      </td>
      {/* Date */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className={`h-6 w-36 rounded ${bodyBg}`}></div>
      </td>
      {/* Date */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className={`h-6 w-36 rounded ${bodyBg}`}></div>
      </td>
      {/* Status */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className={`h-6 w-16 rounded-2xl ${bodyBg}`}></div>
      </td>
      {/* Actions */}
      <td className="whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex justify-end gap-3">
          <div className={`h-[38px] w-[38px] rounded ${bodyBg}`}></div>
          <div className={`h-[38px] w-[38px] rounded ${bodyBg}`}></div>
        </div>
      </td>
    </tr>
  );
}

export function InvoicesMobileSkeleton() {
  return (
    <div className="mb-2 w-full rounded-md bg-white p-4">
      <div className="flex items-center justify-between border-b border-gray-100 pb-8">
        <div className="flex items-center">
          <div className="mr-2 h-8 w-8 rounded-full bg-gray-100"></div>
          <div className="h-6 w-16 rounded bg-gray-100"></div>
        </div>
        <div className="h-6 w-16 rounded bg-gray-100"></div>
      </div>
      <div className="flex w-full items-center justify-between pt-4">
        <div>
          <div className="h-6 w-16 rounded bg-gray-100"></div>
          <div className="mt-2 h-6 w-24 rounded bg-gray-100"></div>
        </div>
        <div className="flex justify-end gap-2">
          <div className="h-10 w-10 rounded bg-gray-100"></div>
          <div className="h-10 w-10 rounded bg-gray-100"></div>
        </div>
      </div>
    </div>
  );
}

export function UsersTableSkeleton() {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className={`rounded-lg ${cardsBg} ${textColor} p-2 md:pt-0`}>
          <table className="min-w-full  table">
            <thead className="rounded-lg text-left text-sm font-normal uppercase">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Image
                </th>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Username
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Email Address
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Role
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date Registered
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Last Updated
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Active
                </th>
                <th scope="col" className="relative pb-4 pl-3 pr-6 pt-2">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className={`${cardsBg} `}>
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function EditApplicantsForm() {
  return (
    <div className="mb-4 lg:mr-4">
      <label className="mb-2 block text-sm font-medium"></label>
      <div className="relative">
        <div className="w-full rounded-md border border-gray-200 h-10 outline-2 bg-white" />
        <div className="absolute h-7 w-7 rounded-full bg-gray-100 left-3 top-1/2 -translate-y-1/2" />
      </div>
    </div>
  );
}

export function EditApplicantsFormSkeleton() {
  return (
    <div className={shimmer}>
      <div className="h-8 w-40 rounded bg-gray-200" />
      <div className="space-y-4">
        {/* TITLE */}
        <>
          <div className="h-7 my-2 w-28 rounded bg-gray-200" />

          <div className="rounded-md bg-gray-50 p-4 md:p-6 ">
            <div className="lg:grid lg:grid-cols-2">
              <EditApplicantsForm />
              <EditApplicantsForm />
            </div>
          </div>
        </>
        <>
          <div className="h-7 my-2 w-28 rounded bg-gray-200" />

          <div className="rounded-md bg-gray-50 p-4 md:p-6 ">
            <div className="lg:grid lg:grid-cols-2">
              <EditApplicantsForm />
              <EditApplicantsForm />
            </div>
          </div>
        </>
        <>
          <div className="h-7 my-2 w-28 rounded bg-gray-200" />

          <div className="rounded-md bg-gray-50 p-4 md:p-6 ">
            <div className="lg:grid lg:grid-cols-2">
              <EditApplicantsForm />
              <EditApplicantsForm />
              <EditApplicantsForm />
              <EditApplicantsForm />
              <EditApplicantsForm />
            </div>
          </div>
        </>
        <>
          <div className="h-7 my-2 w-28 rounded bg-gray-200" />

          <div className="rounded-md bg-gray-50 p-4 md:p-6 ">
            <div className="lg:grid lg:grid-cols-2">
              <EditApplicantsForm />
              <EditApplicantsForm />
            </div>
          </div>
        </>
      </div>
      <div className="flex justify-end gap-x-4 mt-6 ">
        <div className="bg-gray-100 h-8 w-24 rounded-tremor-default" />
        <div className="bg-tremor-brand h-8 w-24 rounded-tremor-default" />
      </div>
    </div>
  );
}
