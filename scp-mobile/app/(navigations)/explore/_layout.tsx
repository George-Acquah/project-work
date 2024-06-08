import { Stack, useNavigation } from "expo-router";

export default function ExploreLayout() {
  const navigation = useNavigation();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={ { headerShown: false}}/>
    </Stack>
  );
}
