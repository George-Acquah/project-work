import { Stack } from "expo-router";

export default function ParkingLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { paddingHorizontal: 10, marginTop: 20 },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="[center_id]/(overview)" />
    </Stack>
  );
}
