"use client";
import React, { Fragment, ChangeEvent } from "react";
import { cardsBg } from "./themes";
import { Combobox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon, CheckIcon } from "@heroicons/react/24/outline";

interface _IComboboxProps {
  placeholder: string;
  value: string;
  autoComplete: string;
  disabled: boolean;
  children: React.ReactNode;
  // status?: string;
  // data: google.maps.places.AutocompletePrediction[];
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSelect: (address: string) => Promise<void>;
}
interface _IMapComboboxProps {
  value: string;
  status: string;
  data: google.maps.places.AutocompletePrediction[];
}
interface _IComboboxOptionsProps {
  id: number;
  name: string;
}
const options: _IComboboxOptionsProps[] = [
  { id: 1, name: "All Slots" },
  { id: 2, name: "Available Slots" },
  { id: 3, name: "Unavailable Slots" },
];

const ComboboxComp = ({
  autoComplete,
  value,
  disabled,
  placeholder = "Search your location",
  // status = "OK",
  handleChange,
  handleSelect,
  // data,
  children,
}: _IComboboxProps) => {
  return (
    <div className="space-x-0.5 flex">
      <div
        className={`w-full dark:shadow-two cursor-pointer text-base transition-all duration-300 outline-none ${cardsBg} hover:bg-white rounded dark:hover:bg-[#2C303B]/50 border-gray-600 dark:border-gray-600`}
      >
        <Combobox value={value} onChange={handleSelect} disabled={disabled}>
          <div className={`relative mt-1`}>
            <div className="relative w-full cursor-default py-3 pl-3 pr-10 text-left focus:outline-none outline-none shadow sm:text-sm">
              <Combobox.Input
                className={`w-full text-sm leading-5 outline-none ${cardsBg}`}
                displayValue={(value: string) => value} // TODO needs refactoring
                onChange={handleChange}
                autoComplete={autoComplete ?? "off"}
                placeholder={ disabled ? "Please wait while we try to connect ..." : placeholder  }
              />
              <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </Combobox.Button>
            </div>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              // afterLeave={() => setValue("")}
            >
              <Combobox.Options
                className={`z-[9999] absolute rounded shadow dark:shadow-two text-base outline-none py-1 mt-1 max-h-64 md:max-h-96 w-full overflow-auto`}
              >
                {children}
                {/* {status === "OK" ? (
                  data.length === 0 && value !== "" ? (
                    <div className="relative cursor-default select-none px-4 py-2 text-gray-600 dark:text-gray-300">
                      😟 Nothing found.
                    </div>
                  ) : (
                    data.map(({ place_id, description, structured_formatting: { main_text, secondary_text} }) => (
                      <Combobox.Option
                        key={place_id}
                        className={({ active }) =>
                          `relative cursor-pointer select-none py-3 px-4 pl-10 transition-all duration-300 focus:outline-none hover:bg-[#FCFCFC] border-b-[0.1px]  dark:hover:bg-black border-gray-100 overflow-auto dark:border-gray-800 ${cardsBg} ${
                            active
                              ? "text-green-600"
                              : "text-gray-600 dark:text-gray-300"
                          }`
                        }
                        value={description}
                      >
                        {({ active, selected }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {main_text} <small>{ secondary_text}</small>
                            </span>
                            {value === description ? (
                              <span
                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                  active ? "text-white" : "text-teal-600"
                                }`}
                              >
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Combobox.Option>
                    ))
                  )
                ) : status !== "OK" && (
                  <div
                    className={`relative flex flex-col justify-center items-center h-32 md:h-80 cursor-pointer select-none py-3 transition-all duration-300 focus:outline-none ${cardsBg}`}
                  >
                    😟😟 <div>Please Search For an Acccurate Place</div>
                  </div>
                )} */}
              </Combobox.Options>
            </Transition>
          </div>
        </Combobox>
      </div>
    </div>
  );
};

export default ComboboxComp;

export const MapCombobox = ({data, status = "OK", value}: _IMapComboboxProps) => (
  <>
    {status === "OK" ? (
      data.length === 0 && value !== "" ? (
        <div className="relative cursor-default select-none px-4 py-2 text-gray-600 dark:text-gray-300">
          😟 Nothing found.
        </div>
      ) : (
        data.map(
          ({
            place_id,
            description,
            structured_formatting: { main_text, secondary_text },
          }) => (
            <Combobox.Option
              key={place_id}
              className={({ active }) =>
                `relative cursor-pointer select-none py-3 px-4 pl-10 transition-all duration-300 focus:outline-none hover:bg-[#FCFCFC] border-b-[0.1px]  dark:hover:bg-black border-gray-100 overflow-auto dark:border-gray-800 ${cardsBg} ${
                  active ? "text-green-600" : "text-gray-600 dark:text-gray-300"
                }`
              }
              value={description}
            >
              {({ active, selected }) => (
                <>
                  <span
                    className={`block truncate ${
                      selected ? "font-medium" : "font-normal"
                    }`}
                  >
                    {main_text} <small>{secondary_text}</small>
                  </span>
                  {value === description ? (
                    <span
                      className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                        active ? "text-white" : "text-teal-600"
                      }`}
                    >
                      <CheckIcon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  ) : null}
                </>
              )}
            </Combobox.Option>
          )
        )
      )
    ) : (
      status !== "OK" && (
        <div
          className={`relative flex flex-col justify-center items-center h-32 md:h-80 cursor-pointer select-none py-3 transition-all duration-300 focus:outline-none ${cardsBg}`}
        >
          😟😟 <div>Please Search For an Acccurate Place</div>
        </div>
      )
    )}
  </>
);

// "use client";
// import React, { useMemo, useState, Fragment } from "react";
// import { cardsBg } from "./themes";
// import { Combobox, Transition } from "@headlessui/react";
// import { ChevronUpDownIcon, CheckIcon } from "@heroicons/react/24/outline";

// type Props = {};
// interface _IPeople {
//   id: number;
//   name: string;
// }
// const people: _IPeople[] = [
//   { id: 1, name: "Wade Cooper" },
//   { id: 2, name: "Arlene Mccoy" },
//   { id: 3, name: "Devon Webb" },
//   { id: 4, name: "Tom Cook" },
//   { id: 5, name: "Tanya Fox" },
//   { id: 6, name: "Hellen Schmidt" },
// ];

// const ComboboxComp = (props: Props) => {
//   const [selected, setSelected] = useState(people[0]);
//   const [query, setQuery] = useState("");

//   const filteredPeople =
//     query === ""
//       ? people
//       : people.filter((person) =>
//           person.name
//             .toLowerCase()
//             .replace(/\s+/g, "")
//             .includes(query.toLowerCase().replace(/\s+/g, ""))
//         );

//   return (
//     <div className="space-x-0.5 flex">
//       <div
//         className={`w-full md:w-1/4 dark:shadow-two cursor-pointer text-base transition-all duration-300 outline-none ${cardsBg} hover:bg-white rounded dark:hover:bg-[#2C303B]/50 border-gray-600 dark:border-gray-600`}
//       >
//         <Combobox value={selected} onChange={setSelected}>
//           <div className={`relative mt-1`}>
//             <div className="relative w-full cursor-default py-3 pl-3 pr-10 text-left focus:outline-none outline-none shadow sm:text-sm">
//               <Combobox.Input
//                 className={`w-full text-sm leading-5 outline-none ${cardsBg}`}
//                 displayValue={(person: _IPeople) => person.name!}
//                 onChange={(event) => setQuery(event.target.value)}
//               />
//               <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
//                 <ChevronUpDownIcon
//                   className="h-5 w-5 text-gray-400"
//                   aria-hidden="true"
//                 />
//               </Combobox.Button>
//             </div>
//             <Transition
//               as={Fragment}
//               leave="transition ease-in duration-100"
//               leaveFrom="opacity-100"
//               leaveTo="opacity-0"
//               afterLeave={() => setQuery("")}
//             >
//               <Combobox.Options
//                 className={`z-[9999] absolute rounded shadow dark:shadow-two text-base outline-none py-1 mt-1 max-h-64 w-full overflow-auto`}
//               >
//                 {filteredPeople.length === 0 && query !== "" ? (
//                   <div className="relative cursor-default select-none px-4 py-2 text-gray-600 dark:text-gray-300">
//                     😟 Nothing found.
//                   </div>
//                 ) : (
//                   filteredPeople.map((person) => (
//                     <Combobox.Option
//                       key={person.id}
//                       className={({ active }) =>
//                         `relative cursor-pointer select-none py-3 px-4 pl-10 transition-all duration-300 focus:outline-none hover:bg-[#FCFCFC] border-b-[0.1px]  dark:hover:bg-black border-gray-100  dark:border-gray-800 ${cardsBg} ${
//                           active
//                             ? "text-green-600"
//                             : "text-gray-600 dark:text-gray-300"
//                         }`
//                       }
//                       value={person}
//                     >
//                       {({ active }) => (
//                         <>
//                           <span
//                             className={`block truncate ${
//                               selected.name === person.name
//                                 ? "font-medium"
//                                 : "font-normal"
//                             }`}
//                           >
//                             {person.name}
//                           </span>
//                           {selected.name === person.name ? (
//                             <span
//                               className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
//                                 active ? "text-white" : "text-teal-600"
//                               }`}
//                             >
//                               <CheckIcon
//                                 className="h-5 w-5"
//                                 aria-hidden="true"
//                               />
//                             </span>
//                           ) : null}
//                         </>
//                       )}
//                     </Combobox.Option>
//                   ))
//                 )}
//               </Combobox.Options>
//             </Transition>
//           </div>
//         </Combobox>
//       </div>
//     </div>
//   );
// };

// export default ComboboxComp;
