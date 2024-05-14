import { _IHeaderData } from "@/components/common/Icons";
import { Ionicons } from "@expo/vector-icons";

const APP_NAME = "Smart Car Parking";
const TOKEN_KEY = "jwt";
const USER_KEY = "logged_user";

const ids = {
  VEHICLE: "656117b8bc100d9f24baed06",
  CENTER: "656482722cbf180fcb3aaf3d",
  SLOT: "6564827f2cbf180fcb3aaf42",
};

const keys = {
  USER_KEY,
  TOKEN_KEY,
}
const AXIOS_ERRORS = {
  NETWORK_ERROR: "Network Error",
}

// HEADER 
const headerData: _IHeaderData[] = [
  {
    id: 1,
    fontProvider: Ionicons,
    icon: "bed-outline",
    label: "Available",
  },
  {
    id: 2,
    fontProvider: Ionicons,
    icon: "airplane-outline",
    label: "Nearby",
  },
  {
    id: 3,
    fontProvider: Ionicons,
    icon: "car-outline",
    label: "Popular",
  },
  // {
  //   id: 4,
  //   fontProvider: FontAwesome,
  //   icon: "bolt",
  //   label: "Taxi",
  // },
];

const tipsData: _ITipsData[] = [
  {
    title: "Find Parking Easily",
    description:
      "Use our search bar to find available parking near your destination.",
    image:
      "https://images.pexels.com/photos/7630190/pexels-photo-7630190.jpeg?auto=compress&cs=tinysrgb&w=800images/tip1.jpg",
  },
  {
    title: "Save Time & Money",
    description:
      "Compare prices and book parking in advance to avoid last-minute hassles.",
    image:
      "https://images.pexels.com/photos/7630190/pexels-photo-7630190.jpeg?auto=compress&cs=tinysrgb&w=800images/tip1.jpg",
  },
  {
    title: "Manage Bookings Simply and Faster",
    description: "View and manage all your parking reservations in one place.",
    image:
      "https://images.pexels.com/photos/7630190/pexels-photo-7630190.jpeg?auto=compress&cs=tinysrgb&w=800images/tip1.jpg",
  },
];

const tabData = ["Upcoming", "History", "Faourite"];


interface _ISearch extends SearchParamsKeys {
  users: string;
  centers: string;
  slots: string;
}

const searchParamsKeys: _ISearch = {
  users: "users",
  centers: "centers",
  slots: "slots",
  // SLOTS_KEY: "s_key",
};

const pathname_helper: { center: string } = {
  center: "/centers",
};


const AUTH_MODALS = {
  LOGIN: "Login-Modal",
  SIGNUP: "Signup-Modal",
  FORGOT: "Forgotpassword-Modal",
  VEHICLES: "add-vehicles",
  ADDRESS: "add-address",
};



export { 
  APP_NAME,
  AXIOS_ERRORS,
  keys,
  headerData,
  tipsData,
  tabData,
  ids,
  searchParamsKeys,
  pathname_helper,
AUTH_MODALS,
}