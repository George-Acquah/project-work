import { ThemedView } from "../common/ThemedView";
import { useColorScheme } from "@/utils/hooks/useColorScheme";
import { generateCenterDetailsImageStyles } from "./style";
import { FlatList, Image } from "react-native";
import { IMAGES } from "@/constants/images";
import Button from "../common/button";
import { SHARED_COLORS } from "@/constants/Colors";
import { Entypo } from "@expo/vector-icons";
import { width } from "@/constants/styles";
import { BASE_URL } from "@/api/root";
import { useState } from "react";
import RendererHOC from "../common/renderer.hoc";
import ImageSkeleton from "../skeletons/centers/images";

interface _ICenterHeaderImage {
  center_images?: string[];
}

interface _ImageLoadingState {
  [key: string]: boolean;
}

const CenterDetailsHeaderImage = ({ center_images }: _ICenterHeaderImage) => {
  const [loading, setLoading] = useState(true); // State to track loading status
   const [imageLoading, setImageLoading] = useState<_ImageLoadingState>({});
  const fallback_data = [IMAGES.first];
  const colorScheme = useColorScheme() ?? "light";
  const styles = generateCenterDetailsImageStyles(colorScheme);

  const renderItem = ({ item, index }: { item: string; index: number }) => {
    const isLoading = imageLoading[item] ?? true;

    return (
      <RendererHOC
        loading={isLoading}
        error={null}
        loadingComponent={<ImageSkeleton width={width} height={400} />}
      >
        <Image
          key={`${item}-${index}`}
          source={{ uri: `${BASE_URL}images/${item}` }}
          width={width}
          height={400}
          style={isLoading ? { display: "none" } : {}}
          onLoadStart={() =>
            setImageLoading((prev) => ({ ...prev, [item]: true }))
          }
          onLoadEnd={() =>
            setImageLoading((prev) => ({ ...prev, [item]: false }))
          }
        />
      </RendererHOC>
    );
  };

  return (
    <ThemedView style={styles.headerContainer}>
      <FlatList
        data={center_images ?? fallback_data}
        horizontal
        renderItem={renderItem}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
      />
      <Button additionalStyles={[styles.imageButton]}>
        <Entypo
          name="images"
          color="white"
          size={20}
          onPress={() => {
            // galleryOptionsRef.current?.expand(); // Open the bottom sheet modal
          }}
        />
      </Button>
    </ThemedView>
  );
};

export default CenterDetailsHeaderImage;
