import { Stack, useNavigation } from "expo-router";
import { useLayoutEffect } from "react";

export default function Layout() {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
      title: `HOME`,
      cardStyle: { backgroundColor: "transparent" },
    });
  }, []);
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={ { headerShown: false }}/>
    </Stack>
  );
}
