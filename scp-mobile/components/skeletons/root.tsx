import { StyleSheet, Pressable, View, ViewProps } from "react-native";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import { useColorScheme } from "@/utils/hooks/useColorScheme";
import { generateRootSkeletonStyles } from "./styles";

interface _IRootSkeleton extends ViewProps {

}
export default function RootSkeleton({ style, children }: _IRootSkeleton) {
  const colorMode = useColorScheme() ?? "dark";
  const styles = generateRootSkeletonStyles(colorMode);

  const Spacer = ({ height = 16 }) => <View style={{ height }} />;

  return (
    <MotiView
      transition={
        {
          type: "timing",
        } as any
      }
      style={[styles.container, styles.padded, style]}
      animate={{
        backgroundColor: colorMode === "dark" ? "#000000" : "#ffffff",
      }}
    >
      { children }
    </MotiView>
  );
}
