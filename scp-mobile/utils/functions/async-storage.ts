import AsyncStorage from "@react-native-async-storage/async-storage";
import { decrypt, encrypt } from "./security";
import { UserType } from "../enums/global.enum";

const async_save = async <T>(key: string, value: T) => {
  try {
    const stringValue =
      typeof value === "string" ? value : JSON.stringify(value);
    await AsyncStorage.setItem(key, stringValue);
  } catch (error) {
    console.error("Error saving to async storage:", error);
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
        console.log(value)
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

export const encryptAndSaveUserType = async (
  userType: UserType
): Promise<void> => {
  try {
    // Encrypt the userType
    const encryptedUserType = encrypt(userType);

    // Save the encrypted userType to AsyncStorage
    await AsyncStorage.setItem("userType", encryptedUserType);
  } catch (error) {
    console.error("Error encrypting and saving userType:", error);
  }
};

export const getUserType = async (): Promise<UserType | null> => {
  try {
    // Retrieve the encrypted userType from AsyncStorage
    const encryptedUserType = await AsyncStorage.getItem("userType");
    if (!encryptedUserType) {
      return null;
    }

    // Decrypt the userType
    const decryptedUserType = decrypt(encryptedUserType);

    return decryptedUserType;
  } catch (error) {
    console.error("Error retrieving and decrypting userType:", error);
    return null;
  }
};

export { async_load, async_save, async_remove };