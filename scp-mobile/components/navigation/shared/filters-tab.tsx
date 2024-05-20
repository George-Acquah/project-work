import { text_colors } from "@/components/auth/styles";
import { ThemedText } from "@/components/common/ThemedText";
import { LIGHT_THEME, SHARED_COLORS } from "@/constants/Colors";
import { FONTS } from "@/constants/fonts";
import { SIZES } from "@/constants/styles";
import { selectCentersFilter, setCentersFilter } from "@/features/root.slice";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/useRedux";
import { FlatList, TouchableOpacity } from "react-native";
import { useColorScheme } from "@/utils/hooks/useColorScheme";

const data = ["Available", "Nearby", "Popular"];
//TODO receive data as props to have dynamic filtering
const FiltersTab = () => {
  const colorScheme = useColorScheme() ?? 'light';
  const center_type = useAppSelector(selectCentersFilter);
  const dispatch = useAppDispatch();
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => {
        const activeItem = item === center_type;
        return (
          <TouchableOpacity
            onPress={() => dispatch(setCentersFilter(item))}
            style={{
              paddingHorizontal: 25,
              paddingVertical: 10,
              borderRadius: colorScheme === "light" ? 20 : 50,
              borderColor: activeItem
                ? colorScheme === "light"
                  ? LIGHT_THEME.primary700
                  : LIGHT_THEME.primary900
                : colorScheme === "light"
                ? SHARED_COLORS.gray300
                : SHARED_COLORS.gray700,
              borderWidth: 1,
            }}
          >
            <ThemedText style={{ ...FONTS.pr2 }} {...text_colors.title}>
              {item}
            </ThemedText>
          </TouchableOpacity>
        );
      }}
      keyExtractor={(item) => item}
      contentContainerStyle={{ columnGap: SIZES.xLarge }}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default FiltersTab;
