import { View } from "react-native";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import { useColorScheme } from "@/utils/hooks/useColorScheme";
import { generateCenterFormSkeletonStyles } from "../styles";

export default function ParkingCenterFormSkeleton() {
  const colorMode = useColorScheme() ?? "dark";
  const styles = generateCenterFormSkeletonStyles(colorMode);

  const Spacer = ({ height = 16 }) => <View style={{ height }} />;

  const renderIconWithText = (appendComponent: boolean) => (
    <View style={[styles.iconWithTextContainer]}>
      <Skeleton colorMode={colorMode} radius="round" height={55} width={55} />
      <Skeleton colorMode={colorMode} width={"80%"} />
      {appendComponent && (
        <Skeleton colorMode={colorMode} radius="round" height={55} width={55} />
      )}
    </View>
  );

  return (
    <MotiView
      transition={
        {
          type: "timing",
        } as any
      }
      style={[styles.container, styles.padded]}
      animate={{
        backgroundColor: colorMode === "dark" ? "#000000" : "#ffffff",
      }}
    >
      <Skeleton colorMode={colorMode} width={"100%"} />
      <Spacer />
      <View style={[styles.center_items]}>
        <Skeleton colorMode={colorMode} width={250} />
      </View>
      <Spacer height={18} />
      {renderIconWithText(false)}
      <Spacer height={18} />
      {renderIconWithText(true)}
      <Spacer height={18} />
      {renderIconWithText(true)}
    </MotiView>
  );
}
