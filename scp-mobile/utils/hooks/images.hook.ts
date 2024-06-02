import { useState } from "react";
import * as FileSystem from "expo-file-system";
import * as SecureStore from "expo-secure-store";
import * as ImagePicker from "expo-image-picker";
import { keys } from "@/constants/root";
import { BASE_URL } from "@/api/root";
import useStorageHook from "./storage.hooks";
import { useAppDispatch } from "./useRedux";
import { showModal } from "@/features/session/session.slice";

const secureDir = FileSystem.documentDirectory + "secure/";

const ensureDirExists = async (dirPath: string) => {
  const dirInfo = await FileSystem.getInfoAsync(dirPath);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(dirPath, { intermediates: true });
  }
};

const useImageManager = (callbackUrl?: string) => {
  const [imagesToUpload, setImagesToUpload] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [libraryLoading, setLibraryLoading] = useState(false);
  const [captureLoading, setCaptureLoading] = useState(false);
  const { load, storageError } = useStorageHook();
  const dispatch = useAppDispatch();

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

  const selectImage = async (useLibrary: boolean) => {
    try {
      let result: ImagePicker.ImagePickerResult;
      const options: ImagePicker.ImagePickerOptions = {
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.75,
      };

      if (useLibrary) {
        setLibraryLoading(true);
        result = await ImagePicker.launchImageLibraryAsync(options);
      } else {
        setCaptureLoading(true);
        await ImagePicker.requestCameraPermissionsAsync();
        result = await ImagePicker.launchCameraAsync(options);
      }

      setLibraryLoading(false);
      setCaptureLoading(false);
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

    setImagesToUpload([...imagesToUpload, newUri]);
    return newUri;
  };

  const deleteImage = async (uri: string) => {
    try {
      await SecureStore.deleteItemAsync(uri.split("/").pop() ?? ""); // Delete from secure storage
      await FileSystem.deleteAsync(uri); // Delete local file if exists (optional)
      setImagesToUpload(imagesToUpload.filter((image) => image !== uri));
    } catch (error) {
      console.log(error);
    }
  };

  const uploadImage = async <T>(
    url: string,
    method: FileSystem.FileSystemAcceptedUploadHttpMethod | undefined,
    fileUri: string,
    data?: Record<keyof T, string>
  ) => {
    try {
      console.log("hello");
      setLoading(true);
      // Load tokens from storage
      const tokens = (await load<_ITokens>(
        keys.TOKEN_KEY,
        "json"
      )) as unknown as _ITokens;

      const response = await FileSystem.uploadAsync(
        `${BASE_URL}${url}`,
        fileUri,
        {
          httpMethod: method,
          uploadType: FileSystem.FileSystemUploadType.MULTIPART,
          parameters: data ?? undefined,
          fieldName: "files",
          headers: {
            Authorization: `Bearer ${tokens.access_token}`,
          },
        }
      );

      console.log(response);
      if (response.status === 401) {
        dispatch(showModal(callbackUrl ?? undefined));
      }
      deleteImage(fileUri); 
      return response;
    } catch (error) {
      console.log("An unexpected error occured: ", error);
      console.log("storage error: ", storageError);
    } finally {
      setLoading(false);
    }
  };

  return {
    imagesToUpload, // No need to store images in state anymore
    libraryLoading,
    captureLoading,
    loading,
    selectImage,
    moveToSecureStorage,
    deleteImage,
    uploadImage, // Optional, implement your upload logic
  };
};

export default useImageManager;
