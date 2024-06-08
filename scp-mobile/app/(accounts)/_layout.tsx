import { Stack } from "expo-router";

export default function AccountsLayout() {
  return (
    <Stack screenOptions={{
      headerShown: false, contentStyle: {
       flex: 1
    } }}>
      <Stack.Screen name="help" />
      <Stack.Screen name="manage-account" />
      <Stack.Screen name="messages" />
      <Stack.Screen name="monetizing" />
      <Stack.Screen name="payment" />
      <Stack.Screen name="settings" />
    </Stack>
  );
}
