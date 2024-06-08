import { _IFont } from "@/components/navigation/TabBarIcon";
import { ACCOUNT_MODALS } from "@/constants/root";
import {
  Ionicons,
  MaterialIcons,
  FontAwesome,
  Entypo,
} from "@expo/vector-icons";

interface _IRoutes extends _IFont{
  name: string;
  route: string;
}

interface _IMainRoute extends _IRoutes {
  sub?: string;
}

interface _IOptions extends _IFont {
  name: string;
  description: string;
}

const cardRoutes: _IRoutes[] = [
  {
    name: "Help",
    route: ACCOUNT_MODALS.HELP,
    icon: "help-with-circle",
    fontProvider: Entypo,
  },
  {
    name: "Payments",
    route: ACCOUNT_MODALS.PAYMENTS,
    icon: "payments",
    fontProvider: MaterialIcons,
  },
  {
    name: "Activity",
    route: ACCOUNT_MODALS.ACTIVITY,
    icon: "local-activity",
    fontProvider: MaterialIcons,
  },
];

const accountOptions: _IOptions[] = [
  {
    name: "Safety Checkup",
    description: "Some random safety checks. Open to see the safety tips.",
    icon: "safety-check",
    fontProvider: MaterialIcons,
  },
  {
    name: "Security Checkup",
    description: "Some random security checks. Open to see the security tips.",
    icon: "security",
    fontProvider: MaterialIcons,
  },
];

const mainRoutes: _IMainRoute[] = [
  {
    name: "Settings",
    route: ACCOUNT_MODALS.SETTINGS,
    icon: "settings-sharp",
    fontProvider: Ionicons,
  },
  {
    name: "Messages",
    route: ACCOUNT_MODALS.MESSAGES,
    icon: "message",
    fontProvider: MaterialIcons,
  },
  {
    name: "Become a center owner",
    route: ACCOUNT_MODALS.MONETIZING,
    icon: "monetization-on",
    fontProvider: MaterialIcons,
  },
  {
    name: "Manage Account",
    route: ACCOUNT_MODALS.MANAGE,
    icon: "manage-accounts",
    fontProvider: MaterialIcons,
  },
  {
    name: "Legal",
    route: ACCOUNT_MODALS.LEGAL,
    icon: "legal",
    fontProvider: FontAwesome,
  },
];

const logout = {
  name: "Logout",
  icon: "logout",
  fontProvider: MaterialIcons,
};

export { 
  cardRoutes,
  accountOptions,
  mainRoutes,
  logout
}