import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { TableBody, TableCell, TableRow, Title } from "@tremor/react";
import { useRouter } from "next/navigation";
import { providerBtnClass } from "../themes";

const NoContentFound = ({ columnCount }: { columnCount: number }) => {
  const router = useRouter();

  return (
    <TableBody>
      <TableRow className="h-60">
        <TableCell colSpan={columnCount + 2} className="py-10 text-center">
          <div className="flex flex-col items-center justify-center space-y-6">
            {/* Title */}
            <Title className="text-center text-2xl font-semibold text-gray-600">
              No Content Found
            </Title>
            {/* Description */}
            <p className="text-gray-500">
              We couldn&apos;t find any data to display here. Try refreshing the
              page.
            </p>
            {/* Refresh Button */}
            <button
              onClick={() => router.refresh()}
              className={`border-stroke dark:text-white dark:shadow-two mb-6 flex bg-custom-primary dark:bg-custom-primary items-center justify-center rounded-sm border px-6 py-3 text-base text-white outline-none transition-all duration-300 hover:border-custom-primary hover:bg-custom-primary/20 hover:text-custom-primary dark:hover:border-custom-primary dark:hover:bg-custom-primary/20  dark:hover:shadow-none w-fit border-sky-500 dark:border-custom-primary/50 cursor-pointer`}
            >
              <ArrowPathIcon className="w-5 h-5 mr-2" />
              Retry
            </button>
          </div>
        </TableCell>
      </TableRow>
    </TableBody>
  );
};

export default NoContentFound;
