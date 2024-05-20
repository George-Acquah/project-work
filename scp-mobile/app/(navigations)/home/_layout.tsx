import { Stack, useNavigation } from "expo-router";
import { useLayoutEffect } from "react";

export default function Layout() {
  const navigation = useNavigation();
  useLayoutEffect(() => {
     navigation.setOptions({
       headerShown: false,
       title: `HOME`,
       headerTitleStyle: {
         fontSize: 20,
         fontWeight: "bold",
         color: "white",
       },
       headerStyle: {
         backgroundColor: "#003580",
         height: 110,
         borderBottomColor: "transparent",
         shadowColor: "transparent",
       },
     });
  }, [])
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={ { headerShown: false }}/>
    </Stack>
  );
}
