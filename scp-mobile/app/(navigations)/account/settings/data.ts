import { _IFont } from "@/components/common/Icons";
import {
  AntDesign,
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
    route: "help",
    icon: "help-with-circle",
    fontProvider: Entypo,
  },
  {
    name: "Payments",
    route: "payments",
    icon: "payments",
    fontProvider: MaterialIcons,
  },
  {
    name: "Activity",
    route: "activity",
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
    route: "settings",
    icon: "settings-sharp",
    fontProvider: Ionicons,
  },
  {
    name: "Messages",
    route: "messages",
    icon: "message",
    fontProvider: MaterialIcons,
    sub: "trsting"
  },
  {
    name: "Become a center owner",
    route: "monetizing",
    icon: "monetization-on",
    fontProvider: MaterialIcons,
  },
  {
    name: "Manage Account",
    route: "manage-account",
    icon: "manage-accounts",
    fontProvider: MaterialIcons,
  },
  {
    name: "Legal",
    route: "legal",
    icon: "legal",
    fontProvider: FontAwesome,
  },
];

export { 
  cardRoutes,
  accountOptions,
  mainRoutes
}