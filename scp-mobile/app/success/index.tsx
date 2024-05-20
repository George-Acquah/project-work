import { ThemedView as View } from "@/components/common/ThemedView"
import SuccessComponent from "@/components/success/success-component";
import { useLocalSearchParams } from "expo-router";

interface _ISuccessParams extends SearchParamsKeys {
  title: string;
  description: string;
  btnLabel: string;
  route: string;
}
const SuccessScreen = () => {
    const params = useLocalSearchParams<_ISuccessParams>();
  const {title ='', description='', btnLabel='', route='', action } = params;
  return (
    <View style={{flex: 1}}>
      <SuccessComponent title={title} description={description} btnLabel={btnLabel} route={route} action={action} />
    </View>
  )
}

export default SuccessScreen;