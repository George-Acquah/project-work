"use client";

import {
  ArrowLeftIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import { generatePagination } from "@/app/lib/utils";
import { usePathname, useSearchParams } from "next/navigation";

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams?.get("page")) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", pageNumber.toString());

    return `${pathname}?${params.toString()}`;
  };

  const allPages = generatePagination(currentPage, totalPages);

  return (
    <>
      <div className="w-full px-4">
        <div className="flex items-center justify-center pt-4">
          <PaginationArrow
            direction="left"
            href={createPageURL(currentPage - 1)}
            isDisabled={currentPage <= 1}
          />

          <div className="flex mx-1">
            {allPages.map((page, index) => {
              let position: "first" | "last" | "single" | "middle" | undefined;

              if (index === 0) position = "first";
              if (index === allPages.length - 1) position = "last";
              if (allPages.length === 1) position = "single";
              if (page === "...") position = "middle";

              return (
                <PaginationNumber
                  key={page}
                  href={createPageURL(page)}
                  page={page}
                  position={position}
                  isActive={currentPage === page}
                />
              );
            })}
          </div>

          <PaginationArrow
            direction="right"
            href={createPageURL(currentPage + 1)}
            isDisabled={currentPage >= totalPages}
          />
        </div>
      </div>
    </>
  );
}

function PaginationNumber({
  page,
  href,
  isActive,
  position,
}: {
  page: number | string;
  href: string;
  position?: "first" | "last" | "middle" | "single";
  isActive: boolean;
}) {
  const className = clsx(
    "flex h-9 min-w-[36px] items-center justify-center rounded-md  bg-opacity-[15%] px-4 text-sm text-body-color transition hover:bg-primary-btn hover:bg-opacity-100 hover:text-white mx-1",
    {
      "rounded-l-md bg-body-color": position === "single",
      "rounded-r-md bg-body-color": position === "single",
      "bg-primary-btn dark:bg-primary-btn text-white": isActive,
      "hover:bg-gray-100 bg-body-color": !isActive && position !== "middle",
      "text-gray-300 bg-body-color": position === "middle",
    }
  );

  return isActive || position === "middle" ? (
    <div className={className}>{page}</div>
  ) : (
    <Link href={href} className={className}>
      {page}
    </Link>
  );
}

function PaginationArrow({
  href,
  direction,
  isDisabled,
}: {
  href: string;
  direction: "left" | "right";
  isDisabled?: boolean;
}) {
  const className = clsx(
    "flex h-9 min-w-[36px] bg-body-color items-center justify-center rounded-md bg-opacity-[15%] px-4 text-sm text-body-color transition hover:bg-primary-btn hover:bg-opacity-100 hover:text-white gap-x-1",
    {
      "pointer-events-none bg-body-color/10 text-body-color/70": isDisabled,
      "hover:bg-gray-100": !isDisabled,
      "": direction === "left",
      "flex-row-reverse": direction === "right",
    }
  );

  const icon =
    direction === "left" ? (
      <ArrowLeftIcon className="w-4 h-12 sm:h-4" />
    ) : (
      <ArrowRightIcon className="w-4 h-12 sm:h-4" />
    );
  const text = direction === "left" ? "Prev" : "Next";

  return isDisabled ? (
    <div className={className}>
      {icon} {text}
    </div>
  ) : (
    <Link className={className} href={href}>
      {icon} {text}
    </Link>
  );
}
