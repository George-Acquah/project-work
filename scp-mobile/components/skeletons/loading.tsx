import { SHARED_COLORS } from "@/constants/Colors";
import { ActivityIndicator, View, StyleSheet } from "react-native";
interface _ILoader {
  color?: string;
  pad?: boolean;
  styles?: Object;
}

const LoadingComponent = ({
  color = SHARED_COLORS.gray500,
  pad = false,
  styles = {},
}: _ILoader) => {
  return (
    <View
      style={[
        StyleSheet.absoluteFill,
        {
          // flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: pad ? 4 : 0,
          backgroundColor: "rgba(0,0,0,0.4)",
        },
        styles,
      ]}
    >
      <ActivityIndicator
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        animating
        size="large"
        color={color}
      />
    </View>
  );
};

export default LoadingComponent;
