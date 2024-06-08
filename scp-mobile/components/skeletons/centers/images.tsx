import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import { DimensionValue, ViewProps } from "react-native";
import { useColorScheme } from "@/utils/hooks/useColorScheme";


interface _ICenterImageSkeleton extends ViewProps {
  width: DimensionValue;
  height: DimensionValue;
}
const ImageSkeleton = ({ width = 200, height= 200 }: _ICenterImageSkeleton) => {
  const colorMode = useColorScheme() ?? "dark";

  return (
    <MotiView
      style={{ width: width, height: height }}
      transition={
        {
          type: "timing",
        } as any
      }
      animate={{ opacity: [0.5, 1, 0.5] }}
    >
      <Skeleton colorMode={colorMode} width={width} height={height} />
    </MotiView>
  );
};

export default ImageSkeleton;
