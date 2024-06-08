import { Stack } from "expo-router";

export default function ParkingCentersLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="[center_id]" />
      <Stack.Screen name="add" />
    </Stack>
  );
}
