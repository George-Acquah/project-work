import SearchComp from "@/components/common/search";
import { SEARCH_PARAMS } from "@/constants/search-params.constants";
import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native"

type SearchParamKeys = keyof typeof SEARCH_PARAMS;
interface _ISearchParams extends SearchParamsKeys {
  title: string;
  entityType: SearchParamKeys;
}
const SearchScreen = () => {
  const { title = "Search for your parking centers here", entityType = "CENTERS" } =
    useLocalSearchParams<_ISearchParams>();
  return (
    <View style= {{ paddingVertical: 20, paddingHorizontal: 10}}>
      <Text>{ title }</Text>
      <View>
        <SearchComp entityType={ entityType } />
      </View>
    </View>
  )
}

export default SearchScreen;