import SearchComp from "@/components/common/search";
import { View, Text } from "react-native"

const SearchScreen = () => {
  return (
    <View style= {{ paddingVertical: 20, paddingHorizontal: 10}}>
      <Text>Search for your parking centers here</Text>
      <View>
        <SearchComp searchLoading= {false} entityType="centers" />
      </View>
    </View>
  )
}

export default SearchScreen;