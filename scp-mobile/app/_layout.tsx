import "react-native-reanimated";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

import { useColorScheme } from "@/utils/hooks/useColorScheme";
import { store } from "@/store";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { KeyboardAvoidingView } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import SessionModal from "@/components/Session-Modal";
import Toast from "@/components/common/toast";
import ErrorModal from "@/components/ErrorModal";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    RobotoLight: require("../assets/fonts/Roboto-Light.ttf"),
    RobotoRegular: require("../assets/fonts/Roboto-Regular.ttf"),
    RobotoMedium: require("../assets/fonts/Roboto-Medium.ttf"),
    RobotoBold: require("../assets/fonts/Roboto-Bold.ttf"),
    RobotoBlack: require("../assets/fonts/Roboto-Black.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Provider store={store}>
          <BottomSheetModalProvider>
            <KeyboardAvoidingView
              enabled={true}
              style={{ flex: 1 }}
            >
              <SafeAreaProvider style={{ backgroundColor: "black" }}>
                <ErrorModal />
                <SessionModal />
                <Stack screenOptions={{ headerShown: false }} />
                <Toast />
              </SafeAreaProvider>
            </KeyboardAvoidingView>
          </BottomSheetModalProvider>
        </Provider>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
