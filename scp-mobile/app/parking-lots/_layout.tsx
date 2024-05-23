import { Stack } from "expo-router";

export default function ParkingLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="[center_id]/(overview)" />
    </Stack>
  );
}
