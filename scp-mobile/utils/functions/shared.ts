import { async_load } from "./async-storage";

export const isTokenExpired = (expirationTime: number) => {
  const currentTime = new Date().getTime();
  return currentTime >= expirationTime;
};

export const getExpiry = async (key: string) => {
  try {
    const dataString = await async_load<string>(key, "string");
    if (dataString === null) {
      return 0;
    }
    return parseInt(dataString);
  } catch (error) {
    console.error("Error retrieving expiration time:", error);
    return 0;
  }
};
