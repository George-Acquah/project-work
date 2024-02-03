"use client";

import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { cardsBg } from "@/app/ui/shared/themes";
import { SvgCheck } from "./icons";
import { useListValue } from "@/utils/hooks/custom-cookies.hooks";
import { FunnelIcon } from "@heroicons/react/24/outline";

interface _IListOptionProps {
  name: string;
  id?: string;
}
interface _IListProps {
  data: _IListOptionProps[];
  def_data: _IListOptionProps;
  icon?: boolean;
  pure?: boolean;
}

export default function List({ data, def_data,pure, icon }: _IListProps) {
  const [selected, setSelected] = useState<_IListOptionProps>(def_data);
  
  !pure && useListValue(selected.name);
  return (
    <div
      className={`w-full md:w-1/4 dark:shadow-two cursor-pointer text-base transition-all duration-300 outline-none ${cardsBg} hover:bg-white rounded dark:hover:bg-[#2C303B]/50 border-gray-600 dark:border-gray-600`}
    >
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default py-3 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm ">
            <span className="block truncate">{selected.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer ">
              {icon ? (
                <FunnelIcon className="h-5 w-5 text-gray-400 " aria-hidden="true" />
              ) : (
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              )}
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              className={`z-[9999] absolute rounded shadow dark:shadow-two text-base outline-none py-1 mt-1 max-h-64 w-full overflow-auto`}
            >
              {data.map((option, optionIdx) => (
                <Listbox.Option
                  key={optionIdx}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-3 px-4 pl-10 transition-all duration-300 focus:outline-none hover:bg-[#FCFCFC] border-b-[0.1px]  dark:hover:bg-black border-gray-100  dark:border-gray-800 ${cardsBg} ${
                      active
                        ? "text-green-600"
                        : "text-gray-600 dark:text-gray-300"
                    }`
                  }
                  value={option}
                >
                  {() => (
                    <>
                      <span
                        className={`block truncate ${
                          selected.name === option.name
                            ? "font-medium"
                            : "font-normal"
                        }`}
                      >
                        {option.name}
                      </span>
                      {selected.name === option.name ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-green-600">
                          <SvgCheck className="h-4 w-4" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
