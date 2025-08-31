import { ThemedView } from "../common/ThemedView";
import { useColorScheme } from "@/utils/hooks/useColorScheme";
import { generateCenterDetailsImageStyles } from "./style";
import { FlatList, View } from "react-native";
import { Image } from "expo-image";
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
  galleryOption?: boolean;
}

interface _ImageLoadingState {
  [key: string]: boolean;
}

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const CenterDetailsHeaderImage = ({
  center_images,
  galleryOption,
}: _ICenterHeaderImage) => {
  const [imageLoading, setImageLoading] = useState<_ImageLoadingState>({});
  const fallback_data = [IMAGES.first];
  const colorScheme = useColorScheme() ?? "light";
  const styles = generateCenterDetailsImageStyles(colorScheme);

  const renderItem = ({ item, index }: { item: string; index: number }) => {
    return (
      <Image
        key={`${item}-${index}`}
        source={`${BASE_URL}images/${item}`}
        style={{ width, height: 400 }}
        placeholder={{ blurhash }}
        contentFit="cover"
        transition={1000}
        onLoadStart={() => {
          setImageLoading((prev) => ({ ...prev, [item]: true }));
        }}
        onLoadEnd={() => {
          setImageLoading((prev) => ({ ...prev, [item]: false }));
        }}
        onError={(error) => {
          setImageLoading((prev) => ({ ...prev, [item]: false }));
        }}
      />
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

      { galleryOption && 
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
      }
    </ThemedView>
  );
};

export default CenterDetailsHeaderImage;
