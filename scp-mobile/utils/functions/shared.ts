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

export const convertDateToString = (dateString: string, locale = "en-US") => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return dateString;
  }

  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export const convertDateToTime = (dateString: string) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return dateString; // Return the original string if the date is invalid
  }

  // Extract hours and minutes
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  console.log(hours);
  console.log(minutes);

  // Format hours and minutes
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  return `${formattedHours}:${formattedMinutes} ${ampm}`;
};
