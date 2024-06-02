import { _IFont } from "@/components/navigation/TabBarIcon";
import { MaterialIcons } from "@expo/vector-icons";

interface _IOwnerOptions extends _IFont {
  option: string;
  route?: any;
}

const ownerOptionsData: _IOwnerOptions[] = [
  {
    option: "Add a new center",
    fontProvider: MaterialIcons,
    icon: "add-home",
    route: "add",
  },
  {
    option: "Add Images",
    fontProvider: MaterialIcons,
    icon: "add-a-photo",
    route: "images",
  },
  {
    option: "Add Slots",
    fontProvider: MaterialIcons,
    icon: "add-road",
    route: "slots",
  },
  {
    option: "Update this center",
    fontProvider: MaterialIcons,
    icon: "edit",
    route: "update",
  },
];

export {
  ownerOptionsData
}