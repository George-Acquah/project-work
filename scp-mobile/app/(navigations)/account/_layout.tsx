import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="help" />
      <Stack.Screen name="manage-account" />
      <Stack.Screen name="monetizing" />
      <Stack.Screen name="payment" />
      <Stack.Screen name="settings" />
    </Stack>
  );
}