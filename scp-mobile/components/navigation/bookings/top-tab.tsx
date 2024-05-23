import { FlatList, View } from "react-native";
import TabItem from "./tab-item";
import { SIZES } from "@/constants/styles";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/useRedux";
import { selectSelctedTab, setSelectedTab } from "@/features/bookings/bookings.slice";
import { LIGHT_THEME } from "@/constants/Colors";


const TopTabs = ({ tabData}: { tabData: string[]}) => {
  
  const dispatch = useAppDispatch();
  const selectedTab = useAppSelector(selectSelctedTab);

  const handleTabPress = (tab: string) => {
    dispatch(setSelectedTab(tab))
  };

  return (
    <View style={{ width: "100%", borderRadius: 8, marginTop: SIZES.medium, backgroundColor: LIGHT_THEME.primary600,}}>
      <FlatList
        data={tabData}
        renderItem={({ item }) => (
          <TabItem
            label={item}
            num_tabs={ tabData.length}
            isSelected={selectedTab === item}
            onPress={() => handleTabPress(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle= { { flex: 1, justifyContent: "space-evenly"}}
      />
    </View>
  );
};


export default TopTabs;