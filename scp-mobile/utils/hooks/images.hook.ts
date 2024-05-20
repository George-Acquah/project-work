import { useState } from "react";
import * as FileSystem from "expo-file-system";
import * as SecureStore from "expo-secure-store";
import * as ImagePicker from "expo-image-picker";

const secureDir = FileSystem.documentDirectory + "secure/";

const ensureDirExists = async (dirPath: string) => {
  const dirInfo = await FileSystem.getInfoAsync(dirPath);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(dirPath, { intermediates: true });
  }
};

const useImageManager = () => {
  const [images, setImages] = useState<string[]>([]);

  const checkStorageSpace = async () => {
    try {
      const free = await FileSystem.getFreeDiskStorageAsync();
      const threshold = 100 * 1024 * 1024; // Set a threshold in bytes (e.g., 100 MB)
      if (free < threshold) {
        console.warn(
          "Low storage space available. Uploading might be impacted."
        );
        throw new Error(
          "Low storage space available. Uploading might be impacted."
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const selectImage = async (
    useLibrary: boolean
  ) => {
    try {
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
        await checkStorageSpace(); // Check storage before saving
        return await moveToSecureStorage(result.assets[0].uri);
      }

      // return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const moveToSecureStorage = async (uri: string) => {
    const filename = uri.split("/").pop() ?? "";
    const newUri = `${secureDir}${filename}`;
    await ensureDirExists(secureDir);

    try {
      // Move the file to secure storage
      await FileSystem.moveAsync({ from: uri, to: newUri });

      // Read content from the new location
      const content = await FileSystem.readAsStringAsync(newUri);

      // Store content securely
      await SecureStore.setItemAsync(filename, content);
    } catch (error) {
      console.error("Error moving file to secure storage:", error);
    }

    // Check if the original file exists before deleting
    const fileInfo = await FileSystem.getInfoAsync(uri);
    if (fileInfo.exists) {
      try {
        await FileSystem.deleteAsync(uri); // Delete original after moving
      } catch (error) {
        console.error("Error deleting original file:", error);
      }
    }

    return newUri;
  };

  const deleteImage = async (uri: string) => {
    try {
      await SecureStore.deleteItemAsync(uri.split("/").pop() ?? ""); // Delete from secure storage
      await FileSystem.deleteAsync(uri); // Delete local file if exists (optional)
      setImages(images.filter((image) => image !== uri));
    } catch (error) {
      console.log(error);
    }
  };

  const uploadImage = async (uri: string) => {
    // Implement your upload logic here (not shown in this hook)
    // Utilize `fetch` with `FormData` or a library like Axios
    // After successful upload, consider deleting the local copy:
    // deleteLocalCopy(uri);
  };

  return {
    images, // No need to store images in state anymore
    selectImage,
    moveToSecureStorage,
    deleteImage,
    uploadImage, // Optional, implement your upload logic
  };
};

export default useImageManager;
