export const generateInputClass = (error: boolean, bg = "[#f8f8f8]") =>
  `peer pl-10 dark:shadow-two w-full border text-base outline-none transition-all duration-300 dark:focus:shadow-none placeholder:dark:text-custom-body-color-dark bg-${bg} dark:bg-[#2C303B] focus:outline-none focus:ring-1 focus:ring-inset px-6 py-3 text-custom-body-color dark:text-custom-body-color-dark rounded-sm ${
    error
      ? "accent-red-400 border-red-400 focus:border-red-400 focus:ring-red-400"
      : "dark:border-gray-700 focus:border-custom-primary dark:focus:border-custom-primary"
  }`;
