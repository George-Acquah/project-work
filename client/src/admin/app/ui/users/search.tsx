'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { searchParamsKeys } from './constants';
import { SvgSpinner } from '@/app/lib/icons';

interface IProps {
  placeholder?: string;
  disabled?: boolean;
}

export default function SearchApplicants({ disabled, placeholder = 'Search by Name' }: IProps) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set(searchParamsKeys.APPLICANTS, term);
    } else {
      params.delete(searchParamsKeys.APPLICANTS);
    }

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  }, 300)

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        disabled= {disabled}
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get(searchParamsKeys.APPLICANTS)?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      {isPending && (
        <div className="absolute right-0 top-0 bottom-0 flex items-center justify-center">
          <SvgSpinner />
        </div>
      )}
    </div>
  );
}
