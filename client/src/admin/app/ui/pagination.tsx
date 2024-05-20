'use client';

import { ArrowLeftIcon, ArrowRightIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Link from 'next/link';
import { generatePagination } from '@/app/lib/utils';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { Select, SelectItem, Icon } from '@tremor/react';
import { useEffect, useMemo, useState } from 'react';

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams?.get('page')) || 1;

  const currentPageSize = Number(searchParams?.get('size')) || 5;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", pageNumber.toString());

    return `${pathname}?${params.toString()}`;
  };

    const createPageSizeURL = (size: number | string) => {
      const params = new URLSearchParams(searchParams);

      params.set("size", size.toString());

      return `${pathname}?${params.toString()}`;
    };

  const allPages = generatePagination(currentPage, totalPages);

  return (
    <>
      <>
        <div className="inline-flex">
          <PaginationArrow
            direction="left"
            href={createPageURL(currentPage - 1)}
            isDisabled={currentPage <= 1}
          />

          <div className="flex -space-x-px">
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
      </>
      <PageSizeSelect
        currentPageSize={currentPageSize}
        createHref={createPageSizeURL}
      />
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
  position?: 'first' | 'last' | 'middle' | 'single';
  isActive: boolean;
}) {
  const className = clsx(
    'flex h-10 w-10 items-center justify-center text-sm border',
    {
      'rounded-l-md': position === 'first' || position === 'single',
      'rounded-r-md': position === 'last' || position === 'single',
      'z-10 bg-blue-600 border-blue-600 text-white': isActive,
      'hover:bg-gray-100': !isActive && position !== 'middle',
      'text-gray-300': position === 'middle',
    },
  );

  return isActive || position === 'middle' ? (
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
  direction: 'left' | 'right';
  isDisabled?: boolean;
}) {
  const className = clsx(
    'flex h-10 w-10 items-center justify-center rounded-md border',
    {
      'pointer-events-none text-gray-300': isDisabled,
      'hover:bg-gray-100': !isDisabled,
      'mr-2 md:mr-4': direction === 'left',
      'ml-2 md:ml-4': direction === 'right',
    },
  );

  const icon =
    direction === 'left' ? (
      <ArrowLeftIcon className="w-4" />
    ) : (
      <ArrowRightIcon className="w-4" />
    );

  return isDisabled ? (
    <div className={className}>{icon}</div>
  ) : (
    <Link className={className} href={href}>
      {icon}
    </Link>
  );
}


export function PageSizeSelect({
  createHref,
  currentPageSize,
}: {
  createHref: (size: string | number) => string;
  currentPageSize: number;
}) {
  const router = useRouter();
  const [pageSize, setPageSize] = useState(currentPageSize.toString());

  const handleChange = (event: string) => {
    setPageSize(event);
    router.push(createHref(event));
  };

  const selectOptions = useMemo(() => {
    return [5, 10, 20, 30, 40, 50].map((size) => (
      <SelectItem
        className={`cursor-pointer rounded dark:shadow-two text-base outline-none transition-all duration-300 bg-white/80 hover:bg-white dark:bg-[#2C303B]  dark:hover:bg-[#2C303B]/50 focus:outline-none  border-gray-600  dark:border-gray-600 `}
        key={size}
        value={`${size}`}
      >
        {size}
      </SelectItem>
    ));
  }, []); // Memoize the select options to prevent unnecessary renders

  return (
    <div className="space-x-0.5 flex">
      <Select
        className={`w-2/8 dark:shadow-two text-base transition-all duration-300 bg-white/80 hover:bg-white dark:bg-[#2C303B]  dark:hover:bg-[#2C303B]/50`}
        defaultValue={`${currentPageSize}`}
        value={`${currentPageSize}`}
        onValueChange={handleChange}
      >
        {selectOptions}
      </Select>

      <Icon
        icon={InformationCircleIcon}
        variant="simple"
        tooltip="Select Page Size"
        className='bg-transparent'
      />
    </div>
  );
}
