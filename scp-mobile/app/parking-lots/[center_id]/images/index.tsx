import ParallaxScrollView from "@/components/ParallaxScrollView";
import { text_colors } from "@/components/auth/styles";
import { ThemedView } from "@/components/common/ThemedView";
import Button from "@/components/common/button";
import RendererHOC from "@/components/common/renderer.hoc";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import CenterDetailsHeaderImage from "@/components/parking/details-header-image";
import loading from "@/components/skeletons/loading";
import { FONTS } from "@/constants/fonts";
import images from "@/constants/images";
import useImageManager from "@/utils/hooks/images.hook";
import useStorageHook from "@/utils/hooks/storage.hooks";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, usePathname } from "expo-router";
import { useEffect, useState } from "react";
import { View, Image, Text, FlatList } from "react-native";
import { useColorScheme } from "@/utils/hooks/useColorScheme";
import { generateParkingCenterStyles } from "@/components/parking/style";
import { useAppDispatch } from "@/utils/hooks/useRedux";
import { showErrorModal } from "@/features/error/error.slice";
import { ids } from "@/constants/root";

const AddCenterImagesScreen = () => {
  const [images, setImages] = useState<string[]>([]);
  const url = usePathname();

  const dispatch = useAppDispatch()

  //Params
  const params = useLocalSearchParams<_ICenterDetailsParams>();
  const { center_id } = params;

  //Upload center images endpoint
  const endpoint = `owner/parking-center/${ids.CENTER}/add-center-image`;

  //color Schemes
  const colorScheme = useColorScheme() ?? "light";

  //Styles
  const styles = generateParkingCenterStyles(colorScheme);

  //Load Tokens here
  const { load, storageError } = useStorageHook();

  // Image Manager Hook
  const {
    selectImage,
    uploadImage,
    imagesToUpload,
    libraryLoading,
    captureLoading,
    loading: updateLoading,
  } = useImageManager(url);

  useEffect(() => {}, []);

  //Functions
  const handleImageSelection = async (useLibrary: boolean) => {
    const result = await selectImage(useLibrary);
    if (result) {
      setImages([...images, result]); // Update profile picture
    }
  };

  const uploadCenterImages = async () => {
    console.log(imagesToUpload);
    if (imagesToUpload.length > 0) {
      return imagesToUpload.forEach(
        async (image) => await uploadImage(endpoint, "POST", image)
      );
    } else {
      dispatch(showErrorModal({ description: 'Select an image or capture one', message: 'No file Selecetd', button_label: 'Try again'}))
    }
  };

  const renderItem = ({ item }: _Item) => {
    const filename = item.split("/").pop();

    return (
      <View key={item} style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
        <Image source={{ uri: item }} style={{ width: 80, height: 80 }} />
        <Text style={{ flex: 1 }}> {filename}</Text>
        <RendererHOC loading={updateLoading} error={null}>
          <Button>
            <TabBarIcon
              fontProvider={Ionicons}
              name="cloud-upload"
              color="white"
              onPress={async () => await uploadImage(endpoint, "POST", item)}
            />
          </Button>
        </RendererHOC>
        <RendererHOC loading={false} error={null}>
          <Button>
            <TabBarIcon
              fontProvider={Ionicons}
              name="trash"
              color="white"
              onPress={() => {}}
            />
          </Button>
        </RendererHOC>
      </View>
    );
  };

  const renderContents = () => {
    return (
      <>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginVertical: 20,
          }}
        >
          <RendererHOC loading={libraryLoading} error={null}>
            <Button
              title="Photo Library"
              onPress={() => handleImageSelection(true)}
            />
          </RendererHOC>
          <RendererHOC loading={captureLoading} error={null}>
            <Button
              title="Capture Image"
              onPress={() => handleImageSelection(false)}
            />
          </RendererHOC>
        </View>
        <Text
          style={{ ...FONTS.h3, textAlign: "center" }}
          {...text_colors.title}
        >
          My Images
        </Text>
        {/* <FlatList data={images} renderItem={renderItem} /> */}
        {images.map((image) => renderItem({ item: image }))}
      </>
    );
  };

  // Render options for all users
  const renderFooter = () => (
    <Button
      additionalStyles={[styles.userOptionsButton]}
      type="opacity"
      title="Add all Images"
      onPress={() => uploadCenterImages()}
    />
  );

  return (
    <RendererHOC loading={false} error={null}>
      <ParallaxScrollView
        headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
        headerContent={<CenterDetailsHeaderImage center_images={images} />}
        style={{ position: "relative" }}
        header_height={250}
        scroll_ratio={0.27}
      >
        {renderContents()}
      </ParallaxScrollView>

      {renderFooter()}
    </RendererHOC>
  );
};

export default AddCenterImagesScreen;
