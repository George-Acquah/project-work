const textColor =
  "text-text-color";
const strongTextColor =
  "text-content-subtle-light dark:text-content-strong-dark";
const bgColor =
  "bg-background-secondary-light dark:bg-background-secondary-dark";
const bodyBg = "bg-[#FCFCFC] dark:bg-black";
const hoverTexts =
  "hover:text-content-subtle-light dark:hover:text-gray-100";
const hoverBg =
  "hover:bg-background-secondary-light hover:dark:bg-background-secondary-dark";
const secondaryBg = "bg-white/80 py-10 dark:bg-dark";
const cardsBg =
  "dark:bg-gray-dark bg-white";
const cardOutline =
  "outline outline-[2px] outline-slate-200 dark:outline-gray-500";

const borderRight =
  "border-r border-r-[1px] border-r-slate-100 dark:border-r-slate-700";

const cardBorder = "border-gray-200 dark:border-gray-700";

const blueBtn = "bg-primary dark:bg-primary";

const secHover =
  "hover:bg-background-primary-light hover:dark:bg-background-primary-dark";
// 455C73  lighter bodyBG
// 1E2E3C  Darker bodyBG

const cardHover = "hover:bg-primary/10 dark:hover:bg-primary/80";

const providerBtnClass =
  "border-stroke dark:text-body-color-dark dark:shadow-two mb-6 flex w-full items-center justify-center rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 hover:bg-green-50/70 hover:text-green-600 dark:border-transparent dark:bg-[#2C303B] dark:hover:bg-green-400/5 dark:hover:bg-opacity-70 dark:hover:text-green-500 dark:hover:shadow-none";

const gradientDark = "via-body-color/80 dark:via-body-color/50";

const navbar = {
  HOVER: "hover-[#4CAF50] hover:ring-[#388E3C]/70 hover:ring",
  SPAN_DEF:
    "relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white",
  NAV_DEF:
    "navbar absolute right-0 z-30 w-[250px] rounded border-[.5px] border-body-color/50 bg-white px-6 py-4 duration-300 dark:border-body-color/20 dark:bg-dark lg:visible lg:static lg:w-auto lg:border-none lg:!bg-transparent lg:p-0 lg:opacity-100",
};

const globalBorder = {
  hoverBorder: "hover:border-green-900 dark:hover:border-green-900",
  focusBorder: "focus:border-green-900 dark:focus:border-green-900",
  border: "border-green-900 dark:border-green-900",
};

export {
  textColor,
  bgColor,
  strongTextColor,
  bodyBg,
  hoverTexts,
  hoverBg,
  secHover,
  cardOutline,
  cardBorder,
  cardsBg,
  borderRight,
  blueBtn,
  secondaryBg,
  providerBtnClass,
  gradientDark,
  cardHover,
  navbar,
  globalBorder,
};
