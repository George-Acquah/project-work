import { Stack } from "expo-router";

const SuccessLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
  );
};

export default SuccessLayout;
