import { Stack } from "expo-router";

const ReservationLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
  );
};

export default ReservationLayout;
