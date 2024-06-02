import { Stack } from "expo-router";

export default function ParkingSlotsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(overview)" />
      <Stack.Screen name="[slot_id]" />
      <Stack.Screen name="reserve-slot" />
      <Stack.Screen name="add" />
    </Stack>
  );
}
