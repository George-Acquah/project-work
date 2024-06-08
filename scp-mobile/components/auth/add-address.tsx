import { ThemedView as View  } from "@/components/common/ThemedView";
import { ThemedText as Text } from "@/components/common/ThemedText";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import Button from "@/components/common/button";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ScrollView, Image, FlatList, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FONTS } from "@/constants/fonts";
import { text_colors } from "./styles";
import { BASE_URL } from "@/api/root";
import axios, { AxiosRequestConfig } from "axios";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/useRedux";
import { refreshTokens } from "@/features/auth/auth.slice";
import { keys } from "@/constants/root";
import useStorageHook from "@/utils/hooks/storage.hooks";
import { fetchAllVehicles, selectAllVehicles, selectVehiclesLoading } from "@/features/vehicles/vehicles.slice";
import RendererHOC from "../common/renderer.hoc";

interface _IAddress {
  setSelectedScreen: Dispatch<SetStateAction<string>>;
  hideModal: () => void;
}

const imgDir = FileSystem.documentDirectory + "images/";
const FormData = global.FormData;

const ensureDirExists = async () => {
  const dirInfo = await FileSystem.getInfoAsync(imgDir);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(imgDir, { intermediates: true });
  }
};

const AddAddress = ({ setSelectedScreen, hideModal }: _IAddress) => {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const vehicleLoading = useAppSelector(selectVehiclesLoading)
  const { load, storageError } = useStorageHook();

  const fetchVehicles = async() => {
    try {
      await dispatch(
        fetchAllVehicles({
          vehicles: "",
          currentPage: 1,
          pageSize: 3,
        })
      );
    } catch (error: any) {
      Alert.alert('Error', error.message)
    }
  }

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    await ensureDirExists();
    const files = await FileSystem.readDirectoryAsync(imgDir);
    if (files.length > 0) {
      setImages(files.map((file) => imgDir + file));
    }
  };

  const selectImage = async (useLibrary: boolean) => {
    let result: ImagePicker.ImagePickerResult;
    const options: ImagePicker.ImagePickerOptions = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.75,
    };

    if (useLibrary) {
      result = await ImagePicker.launchImageLibraryAsync(options);
    } else {
      await ImagePicker.requestCameraPermissionsAsync();

      result = await ImagePicker.launchCameraAsync(options);
    }

    if (!result.canceled) {
      saveImage(result.assets[0].uri);
    }
  };

  const saveImage = async (uri: string) => {
    await ensureDirExists();
    const filename = `${new Date().getTime()}.jpg`;
    const dest = imgDir + filename;
    await FileSystem.copyAsync({ from: uri, to: dest });
    setImages([...images, dest]);
  };

  const deleteImage = async (uri: string) => {
    await FileSystem.deleteAsync(uri);
    setImages(images.filter((image) => image !== uri));
  };

  const uploadImages = async (uri: string) => {
    setLoading(true);
    // Load tokens from storage
    const tokens = (await load<_ITokens>(
      keys.TOKEN_KEY,
      "json"
    )) as unknown as _ITokens;

    const response = await FileSystem.uploadAsync(`${BASE_URL}/customer/vehicle/add`, uri, {
      httpMethod: "POST",
      uploadType: FileSystem.FileSystemUploadType.MULTIPART,
      parameters: {
        vehicle_no: 'test_id'
      },
      fieldName: "files",
      headers: {
        'Authorization': `Bearer ${tokens.access_token}`
      }
    });

    console.log(JSON.stringify(response, null, 4));
    setLoading(false);
  };

  const sendToBackend = async (uri: string) => {
    try {
      const formData = new FormData();

      const config: AxiosRequestConfig = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        transformRequest: () => {
          return formData;
        },
      };

      await axios.post(`${BASE_URL}`, formData, config);
    } catch (error) {
      console.log(error);
    }
  };

  const renderItem = ({ item }: _Item) => {
    const filename = item.split("/").pop();

    return (
      <RendererHOC loading={loading} error={null}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <Image source={{ uri: item }} style={{ width: 80, height: 80 }} />
          <Text style={{ flex: 1 }}> {filename}</Text>
          <Button>
            <TabBarIcon
              fontProvider={Ionicons}
              name="cloud-upload"
              color="white"
              onPress={() => uploadImages(item)}
            />
          </Button>
          <Button>
            <TabBarIcon
              fontProvider={Ionicons}
              name="trash"
              color="white"
              onPress={() => {}}
            />
          </Button>
        </View>
      </RendererHOC>
    );
  };

return (
  <View style={{ flex: 1 }}>
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginVertical: 20,
      }}
    >
      <Button title="Photo Library" onPress={() => selectImage(true)} />
      <Button title="Capture Image" onPress={() => selectImage(false)} />
    </View>

    <Text style={{ ...FONTS.h3, textAlign: "center" }} {...text_colors.title}>
      My Images
    </Text>
    <FlatList data={images} renderItem={renderItem} />
    
    <Button onPress={() => {}}>
      <RendererHOC loading={vehicleLoading} error={null}>
        <Text
          style={{ ...FONTS.ps2 }}
          {...text_colors.title}
          onPress={() => fetchVehicles()}
        >
          Fetch Vehicles
        </Text>
      </RendererHOC>
    </Button>
  </View>
);

};

export default AddAddress;
