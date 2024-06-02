import { Stack } from "expo-router";

export default function ParkingCenterLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="update" />
      <Stack.Screen name="images" />
      <Stack.Screen name="slots" />
    </Stack>
  );
}
