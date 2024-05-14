import { useState } from "react";
import * as SecureStore from "expo-secure-store";

const useStorageHook = () => {
  const [storageError, setStorageError] = useState<string | null>(null);

  const save = async <T>(key: string, value: T) => {
    try {
      const stringValue =
        typeof value === "string" ? value : JSON.stringify(value);
      await SecureStore.setItemAsync(key, stringValue);
      setStorageError(null); // Clear previous errors on successful save
    } catch (error) {
      console.error("Error saving to secure storage:", error);
      setStorageError("An error occurred while saving data."); // Set user-friendly error message
    }
  };

  const load = async <T>(key: string, type: "json" | "string"): Promise<T | string> => {
    try {
      const value = await SecureStore.getItemAsync(key);
      if (value) {
        if (type === "json") {
          try {
            return JSON.parse(value);
          } catch (error) {
            console.error("Error parsing JSON data:", error);
            return null; // Return null for invalid JSON
          }
        } else {
          return value;
        }
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error loading from secure storage:", error);
      setStorageError("An error occurred while loading data."); // Set user-friendly error message
      return null;
    }
  };

  const remove = async (key: string) => {
    try {
      await SecureStore.deleteItemAsync(key);
      setStorageError(null); // Clear previous errors on successful removal
    } catch (error) {
      console.error("Error removing from secure storage:", error);
      setStorageError("An error occurred while removing data."); // Set user-friendly error message
    }
  };

  return { storageError, save, load, remove };
};

export default useStorageHook;
