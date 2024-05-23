import { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system"; // Optional for local storage (use with caution)
import * as SecureStore from "expo-secure-store"; // For secure storage of image URIs (optional)

const useImagePicker = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPicking, setIsPicking] = useState(false); // Optional loading state

  const pickImage = async (useLibrary = true) => {
    setIsPicking(true); // Set optional loading state
    setError(null); // Clear previous errors
    let result: ImagePicker.ImagePickerResult | null = null;

    try {
      // Request permissions if using camera
      if (!useLibrary) {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
          setError("Camera permissions are required to use the camera.");
          return;
        }
      }

      result = await (useLibrary
        ? ImagePicker.launchImageLibraryAsync
        : ImagePicker.launchCameraAsync)({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3], // Optional aspect ratio
        quality: 1, // Adjust quality as needed (0-1)
      });

      if (!result.canceled) {
        const { uri } = result.assets[0];
        setImageUri(uri);

        // Optional: Local storage (use with caution due to security concerns)
        // await storeImageLocally(uri); // Implement your local storage logic

        // Optional: Secure storage of image URI (consider alternative secure storage solutions)
        await storeImageUriSecurely(uri); // Implement secure storage logic
      }
    } catch (error) {
      console.error("Error picking image:", error);
      setError("An error occurred while picking an image.");
    } finally {
      setIsPicking(false); // Clear optional loading state
    }
  };

  // Optional: Local storage function (replace with your preferred storage approach)
  const storeImageLocally = async (uri: string) => {
    const filename = uri.split("/").pop();
    const newPath = FileSystem.documentDirectory + filename;
    await FileSystem.copyAsync({ from: uri, to: newPath });
  };

  // Optional: Secure storage function for image URI (replace with your preferred secure storage solution)
  const storeImageUriSecurely = async (uri: string) => {
    const filename = uri.split("/").pop();
    await SecureStore.setItemAsync(filename, uri); // Consider alternative secure storage methods
  };

  return { imageUri, error, isPicking, pickImage };
};

export default useImagePicker;
