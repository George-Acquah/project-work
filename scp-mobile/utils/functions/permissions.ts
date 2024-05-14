import * as Location from "expo-location"

const locationPermission = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();
};
