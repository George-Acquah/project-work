import * as SecureStore from "expo-secure-store";

const save = async <T>(key: string, value: T) => {
  try {
    const stringValue =
      typeof value === "string" ? value : JSON.stringify(value);
    await SecureStore.setItemAsync(key, stringValue);
  } catch (error) {
    console.error("Error saving to secure storage:", error);
  }
};

const load = async <T>(
  key: string,
  type: "json" | "string"
): Promise<T | string | null> => {
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
    return null;
  }
};

const loadSync = <T>(
  key: string,
  type: "json" | "string"
): T | string | null => {
  try {
    const value = SecureStore.getItem(key);
    if (value) {
      if (type === "json") {
        try {
          return JSON.parse(value);
        } catch (error) {
          console.error("Error parsing JSON data:");
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
    return null;
  }
};

const remove = async (key: string) => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.error("Error removing from secure storage:", error);
  }
};

export { load, save, remove, loadSync}