import { Stack } from "expo-router";

export default function UpdateParkingCenterLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}
