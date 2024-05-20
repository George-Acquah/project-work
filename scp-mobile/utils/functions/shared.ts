import { async_load } from "./async-storage";

export const isTokenExpired = (expirationTime: number) => {
  console.log("exp: ", expirationTime);
  const currentTime = new Date().getTime();
  console.log("curr: ", currentTime);
  return currentTime >= expirationTime;
};

export const getExpiry = async (key: string) => {
  try {
    const dataString = await async_load<string>(key, "string");
    return parseInt(dataString ?? "");
  } catch (error) {
    console.error("Error retrieving expiration time:", error);
    return 0;
  }
};
