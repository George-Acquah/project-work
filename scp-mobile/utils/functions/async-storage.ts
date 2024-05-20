import AsyncStorage from "@react-native-async-storage/async-storage";

const async_save = async <T>(key: string, value: T) => {
  try {
    const stringValue =
      typeof value === "string" ? value : JSON.stringify(value);
    await AsyncStorage.setItem(key, stringValue);
  } catch (error) {
    console.error("Error saving to secure storage:", error);
  }
};

const async_load = async <T>(
  key: string,
  type: "json" | "string"
): Promise<T | string | null> => {
  try {
    const value = await AsyncStorage.getItem(key);
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

// const loadSync = <T>(
//   key: string,
//   type: "json" | "string"
// ): T | string | null => {
//   try {
//     const value = AsyncStorage.getItem(key);
//     if (value) {
//       if (type === "json") {
//         try {
//           return JSON.parse(value);
//         } catch (error) {
//           console.error("Error parsing JSON data:");
//           return null; // Return null for invalid JSON
//         }
//       } else {
//         return value;
//       }
//     } else {
//       return null;
//     }
//   } catch (error) {
//     console.error("Error loading from secure storage:", error);
//     return null;
//   }
// };

const async_remove = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing from secure storage:", error);
  }
};

export { async_load, async_save, async_remove };