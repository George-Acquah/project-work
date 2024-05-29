import { SHARED_COLORS } from "@/constants/Colors";
import { EAutoComplete } from "@/utils/enums/auto-complete";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import PlacesAutoComplete from "./auto-complete";
import { useColorScheme } from "@/utils/hooks/useColorScheme";

interface _ISearchBox {
  placeholder?: string;
  type?: EAutoComplete;
  disableScroll?: boolean;
}
const SearchBox = ({
  placeholder = "Change your Location",
  type = EAutoComplete.ORIGIN,
  disableScroll = false,
}: _ISearchBox) => {
  const colorScheme = useColorScheme() ?? "light";
  return (
    <View style={{ marginTop: 20, position: "relative" }}>
      <PlacesAutoComplete
        placeholder={placeholder}
        type={type}
        disableScroll={disableScroll}
      />
      <Ionicons
        style={{ position: "absolute", top: "24%", right: 15 }}
        size={20}
        color={
          colorScheme === "light"
            ? SHARED_COLORS.gray600
            : SHARED_COLORS.gray700
        }
        name="location"
      />
    </View>
  );
};

export default SearchBox;