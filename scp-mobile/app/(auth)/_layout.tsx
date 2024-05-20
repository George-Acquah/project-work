import { Stack } from "expo-router";
import { selectAuthLoading } from "@/features/auth/auth.slice";
import { useAppSelector } from "@/utils/hooks/useRedux";

const AuthLayout = () => {
  const isLoading = useAppSelector(selectAuthLoading);

  return (
    <Stack>
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
      <Stack.Screen name="otp" options={{ headerShown: false }} />
      <Stack.Screen name="reset-password" options={{ headerShown: false }} />
    </Stack>
  );
};

export default AuthLayout;
