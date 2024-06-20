"use client";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { useDebouncedCallback } from "use-debounce";
import { searchParamsKeys } from "./constants";
import { SvgSpinner } from "@/app/lib/icons";
import { strongTextColor, textColor } from "../themes";
import { generateInputClass } from "@/utils/functions/styles.functions";

interface IProps {
  entityType: string; // Add entityType prop
  placeholder?: string;
  disabled?: boolean;
}

export default function SearchApplicants({
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
        className={` dark:text-gray-400 h-10 rounded-lg ${generateInputClass(
          false,
          "white"
        )}`}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams
          .get(searchParamsKeys[entityType])
          ?.toString()}
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
