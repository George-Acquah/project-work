import { useState } from "react";
import { View, TextInput, Button, Image, Alert } from "react-native";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { BASE_URL } from "@/data/root";
import React = require("react");

// interface _ImageData {
//   uri: string;
//   name: string;
//   type: string;
// }
const VehicleForm = () => {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  // const [images, setImages] = useState<_ImageData[]>([]);
  const [images, setImages] = useState([]);

  const pickImage = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission denied",
          "Sorry, we need camera roll permissions to make this work!"
        );
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });
      if (!result.canceled) {
        setImages([
          ...images, result.assets[0].uri
        ]);
      }
    } catch (err) {
      console.error("Image picker error:", err);
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("make", make);
      formData.append("model", model);
      formData.append("year", year);
      images.forEach(async (image, index) => {
        // Convert URI to Blob
        const blob = await uriToBlob(image.uri);
        // Append Blob to form data
        formData.append(`image_${index}`, blob, `image_${index}.jpg`);
      });

      const response = await axios.post(
        `${BASE_URL}/customer/vehicle/add`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Handle response
      console.log("Response:", response.data);
      Alert.alert("Success", "Vehicle added successfully!");

      // Clear form fields and images after successful submission
      setMake("");
      setModel("");
      setYear("");
      setImages([]);
    } catch (error) {
      console.error("Error adding vehicle:", error);
      Alert.alert("Error", "Failed to add vehicle. Please try again later.");
    }
  };

  // Function to convert URI to Blob
  const uriToBlob = async (uri: string): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        if (xhr.responseType === "blob" && xhr.response instanceof Blob) {
          resolve(xhr.response);
        } else {
          reject(
            new Error("Failed to convert URI to Blob: Response is not a Blob")
          );
        }
      };
      xhr.onerror = function () {
        reject(new Error("Failed to convert URI to Blob: Network error"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
  };

  return (
    <View>
      <TextInput
        placeholder="Make"
        value={make}
        onChangeText={(text) => setMake(text)}
      />
      <TextInput
        placeholder="Model"
        value={model}
        onChangeText={(text) => setModel(text)}
      />
      <TextInput
        placeholder="Year"
        value={year}
        onChangeText={(text) => setYear(text)}
      />
      <Button title="Pick Image" onPress={pickImage} />
      {images.map((image, index) => (
        <Image
          key={index}
          source={{ uri: image }}
          style={{ width: 200, height: 200 }}
        />
      ))}
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

export default VehicleForm;
