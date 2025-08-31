import { Stack } from "expo-router";

const HubtelWebviewLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
  );
};

export default HubtelWebviewLayout;
