import { text_colors } from "@/components/auth/styles";
import { ThemedText } from "@/components/common/ThemedText";
import { LIGHT_THEME, SHARED_COLORS } from "@/constants/Colors";
import { FONTS } from "@/constants/fonts";
import { SIZES } from "@/constants/styles";
import { selectCentersFilter, setCentersFilter } from "@/features/root.slice";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/useRedux";
import { FlatList, TouchableOpacity } from "react-native";
import { useColorScheme } from "@/utils/hooks/useColorScheme";
import { Center_Filter } from "@/utils/enums/global.enum";

const data = [Center_Filter.AVAILABLE, Center_Filter.NEARBY, Center_Filter.POPULAR];
//TODO receive data as props to have dynamic filtering
const FiltersTab = ({px, py, textColor}: {py?: number, px?: number, textColor?: { lightColor: string, darkColor: string}}) => {
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
              paddingHorizontal: px ?? 25,
              paddingVertical: py ?? 10,
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
            <ThemedText
              style={{ ...FONTS.pr2 }}
              {...(textColor ?? text_colors.title)}
            >
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
