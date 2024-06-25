"use client";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { useDebouncedCallback } from "use-debounce";
import { SvgSpinner } from "@/app/lib/icons";
import { strongTextColor, textColor } from "../themes";
import { generateInputClass } from "@/utils/functions/styles.functions";
import { SEARCH_PARAMS } from "@/constants/search-params.constants";

interface IProps<T> {
  entityType: T; // Add entityType prop
  placeholder?: string;
  disabled?: boolean;
}

// Define the type for SEARCH_PARAMS keys
type SearchParamKeys = keyof typeof SEARCH_PARAMS;

export default function Search<T extends SearchParamKeys>({
  disabled,
  placeholder = "Search by Name",
  entityType,
}: IProps<T>) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set(SEARCH_PARAMS[entityType], term);
    } else {
      params.delete(SEARCH_PARAMS[entityType]);
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
        className={` dark:text-gray-400 h-11 rounded-lg ${generateInputClass(
          false,
          "bg-white dark:bg-[#2C303B]"
        )}`}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get(SEARCH_PARAMS[entityType])?.toString()}
      />
      <MagnifyingGlassIcon
        className={`absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 peer-focus:${strongTextColor} ${textColor}`}
      />
      {isPending && (
        <div className="absolute right-0 top-0 bottom-0 flex items-center justify-center">
          <SvgSpinner className="dark:text-gray-400" />
        </div>
      )}
    </div>
  );
}
