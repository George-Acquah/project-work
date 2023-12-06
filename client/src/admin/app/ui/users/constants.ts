import { AtSymbolIcon, UserIcon } from "@heroicons/react/24/outline";

interface SearchParamsKeys {
  [key: string]: string;
};

const searchParamsKeys: SearchParamsKeys = {
  APPLICANTS: "applicant",
  users: "users",
  centers: "centers",
  slots: "slots"
};

const inputIcons = {
  user: UserIcon,
  email: AtSymbolIcon
}

// interface Test {
//   user: IconType;
//   email: IconType;
// }

export { searchParamsKeys, inputIcons };
