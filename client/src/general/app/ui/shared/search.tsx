'use client'
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { useDebouncedCallback } from "use-debounce";
import { searchParamsKeys } from "@/app/lib/constants";
import { SvgSpinner } from "@/app/ui/shared/icons";
import { inputClass } from "@/app/ui/shared/inputs";

interface IProps {
  entityType: string; // Add entityType prop
  placeholder?: string;
  disabled?: boolean;
}

export default function SearchComp({
  disabled,
  placeholder = "Search by Name",
  entityType,
}: IProps) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set(searchParamsKeys[entityType], term);
    } else {
      params.delete(searchParamsKeys[entityType]);
    }

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  }, 300);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className={`rounded-lg ${inputClass} px-6 py-3 bg-[#f8f8f8] dark:bg-gray-dark text-body-color rounded-sm`}
        placeholder={placeholder}
        disabled={disabled}
        id="search"
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams
          .get(searchParamsKeys[entityType])
          ?.toString()}
      />
      <MagnifyingGlassIcon
        className={`absolute left-3 top-1/2 w-5 h-5  -translate-y-1/2 peer-focus:text-gray-600 dark:peer-focus:text-gray-200  text-body-color transition-all duration-300`}
      />
      {isPending && (
        <div className="absolute right-0 top-0 bottom-0 flex items-center justify-center">
          <SvgSpinner className="dark:text-gray-400" />
        </div>
      )}
    </div>
  );
}
