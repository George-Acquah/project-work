import { cardsBg } from "@/app/ui/themes";

export const generateInputClass = (
  error: boolean,
  bg = cardsBg
  // bg = "bg-[#f8f8f8] dark:bg-[#2C303B]"
) =>
  `peer pl-10 dark:shadow-two w-full border text-base outline-none transition-all duration-300 dark:focus:shadow-none placeholder:dark:text-custom-body-color-dark ${bg} focus:outline-none focus:ring-1 focus:ring-inset px-6 py-3 text-custom-body-color dark:text-custom-body-color-dark rounded-sm ${
    error
      ? "accent-red-400 border-red-400 focus:border-red-400 focus:ring-red-400"
      : "dark:border-gray-700 focus:border-custom-primary dark:focus:border-custom-primary"
  }`;

export const generateSelectClass = (
  error: boolean,
  width = "w-full",
  bg = "bg-[#f8f8f8] dark:bg-[#2C303B]"
) =>
  `transition-all duration-300 dark:focus:shadow-none ${bg} text-custom-body-color dark:text-custom-body-color-dark rounded-sm object-cover text-lg ${width} ${
    error
      ? "border-red-400 focus:border-red-400 focus:ring-red-400"
      : ""
  }`;

      export const generateOptionClass = (bg = "bg-[#f8f8f8] dark:bg-[#2C303B]") =>
        ` pl-2 dark:shadow-two w-full text-base outline-none transition-all duration-300 dark:focus:shadow-none placeholder:dark:text-custom-body-color-dark ${bg} focus:outline-none focus:ring-1 focus:ring-inset px-6 py-3 text-custom-body-color dark:text-custom-body-color-dark dark:border-gray-700 focus:border-custom-primary dark:focus:border-custom-primary`;