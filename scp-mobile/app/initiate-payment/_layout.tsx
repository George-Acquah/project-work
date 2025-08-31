import { Stack } from "expo-router";

const SuccessLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="hubtel-webview" />
    </Stack>
  );
};

export default SuccessLayout;
