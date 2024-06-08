import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useClientOnlyValue } from "@/utils/hooks/useClientOnlyValue";
import { useColorScheme } from "@/utils/hooks/useColorScheme";
import { DARK_THEME, LIGHT_THEME, SHARED_COLORS } from "@/constants/Colors";
import { ThemedView as View } from "@/components/common/ThemedView";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";

const SCREENS = {
  HOME: "home",
  CENTERS: "centers",
  EXPLORE: "explore",
  BOOKINGS: "bookings",
  ACCOUNT: "account",
};
export default function NavigationsLayout() {
  const colorScheme = useColorScheme() ?? "light";

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor:
          colorScheme === "light"
            ? LIGHT_THEME.contentPrimary
            : LIGHT_THEME.primary800,
        tabBarInactiveTintColor:
          colorScheme === "light"
            ? SHARED_COLORS.gray700
            : LIGHT_THEME.primary400,
        headerShown: useClientOnlyValue(false, false),
        tabBarStyle: {
          height: 60,
          paddingVertical: 10,
          shadowRadius: 3,
          shadowColor:
            colorScheme === "light"
              ? LIGHT_THEME.contentSecondary
              : DARK_THEME.contentSecondary,
        },
      }}
      sceneContainerStyle={{
        
      }}
    >
      <Tabs.Screen
        name={SCREENS.EXPLORE}
        options={{
          title: "EXPLORE",
          headerShown: false,
          headerStyle: {
            backgroundColor:
              colorScheme === "light"
                ? LIGHT_THEME.backgroundPrimary
                : DARK_THEME.backgroundPrimary,
          },
          tabBarItemStyle: {
            marginHorizontal: 5,
            paddingVertical: 5,
          },
          tabBarLabelStyle: { fontFamily: "RobotoBold" },
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{
                  borderTopWidth: focused ? 2 : 0,
                  borderTopColor:
                    colorScheme === "light"
                      ? SHARED_COLORS.gray600
                      : LIGHT_THEME.primary700,
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  top: -15,
                }}
              >
                <View style={{ top: 12 }}>
                  <TabBarIcon
                    fontProvider={Ionicons}
                    name="code-slash"
                    size={28}
                    color={
                      focused
                        ? colorScheme === "light"
                          ? "black"
                          : LIGHT_THEME.primary800
                        : colorScheme === "light"
                        ? SHARED_COLORS.gray500
                        : LIGHT_THEME.primary400
                    }
                  />
                </View>
              </View>
            );
          },
        }}
      />
      <Tabs.Screen
        name={SCREENS.CENTERS}
        options={{
          title: "CENTERS",
          headerShown: false,
          tabBarItemStyle: {
            marginHorizontal: 5,
            paddingVertical: 5,
          },
          tabBarLabelStyle: { fontFamily: "RobotoBold" },
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{
                  borderTopWidth: focused ? 2 : 0,
                  borderTopColor:
                    colorScheme === "light"
                      ? SHARED_COLORS.gray600
                      : LIGHT_THEME.primary700,
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  top: -15,
                }}
              >
                <View style={{ top: 12 }}>
                  <TabBarIcon
                    fontProvider={MaterialIcons}
                    name="local-parking"
                    size={28}
                    color={
                      focused
                        ? colorScheme === "light"
                          ? "black"
                          : LIGHT_THEME.primary800
                        : colorScheme === "light"
                        ? SHARED_COLORS.gray500
                        : LIGHT_THEME.primary400
                    }
                  />
                </View>
              </View>
            );
          },
        }}
      />
      <Tabs.Screen
        name={SCREENS.HOME}
        options={{
          title: "HOME",
          headerShown: false,
          headerStyle: { backgroundColor: "white" },
          tabBarActiveBackgroundColor:
            colorScheme === "light" ? SHARED_COLORS.gray900 : "",
          tabBarItemStyle: {
            borderRadius: 100,
            marginHorizontal: 5,
            bottom: 20,
            backgroundColor:
              colorScheme === "light"
                ? SHARED_COLORS.gray700
                : LIGHT_THEME.primary700,
          },
          tabBarLabelStyle: {
            color:
              colorScheme === "light"
                ? DARK_THEME.contentPrimary
                : DARK_THEME.contentPrimary,
            fontFamily: "RobotoBold",
          },
          tabBarIcon: () => (
            <TabBarIcon
              fontProvider={Ionicons}
              name="home"
              size={28}
              color={
                colorScheme === "light"
                  ? DARK_THEME.contentPrimary
                  : DARK_THEME.contentPrimary
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name={SCREENS.BOOKINGS}
        options={{
          title: "BOOKINGS",
          headerShown: false,
          tabBarItemStyle: {
            marginHorizontal: 5,
            paddingVertical: 5,
          },
          tabBarLabelStyle: { fontFamily: "RobotoBold" },
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{
                  borderTopWidth: focused ? 2 : 0,
                  borderTopColor:
                    colorScheme === "light"
                      ? SHARED_COLORS.gray600
                      : LIGHT_THEME.primary700,
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  top: -15,
                }}
              >
                <View style={{ top: 12 }}>
                  <TabBarIcon
                    fontProvider={MaterialIcons}
                    name="edit-note"
                    size={28}
                    color={
                      focused
                        ? colorScheme === "light"
                          ? "black"
                          : LIGHT_THEME.primary800
                        : colorScheme === "light"
                        ? SHARED_COLORS.gray500
                        : LIGHT_THEME.primary400
                    }
                  />
                </View>
              </View>
            );
          },
        }}
      />
      <Tabs.Screen
        name={SCREENS.ACCOUNT}
        options={{
          title: "PROFILE",
          headerShown: false,
          tabBarItemStyle: {
            marginHorizontal: 5,
            paddingVertical: 5,
          },
          tabBarLabelStyle: { fontFamily: "RobotoBold" },
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{
                  borderTopWidth: focused ? 2 : 0,
                  borderTopColor:
                    colorScheme === "light"
                      ? SHARED_COLORS.gray600
                      : LIGHT_THEME.primary700,
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  top: -15,
                }}
              >
                <View style={{ top: 12 }}>
                  <TabBarIcon
                    fontProvider={MaterialIcons}
                    name="person"
                    size={28}
                    color={
                      focused
                        ? colorScheme === "light"
                          ? "black"
                          : LIGHT_THEME.primary800
                        : colorScheme === "light"
                        ? SHARED_COLORS.gray500
                        : LIGHT_THEME.primary400
                    }
                  />
                </View>
              </View>
            );
          },
        }}
      />
    </Tabs>
  );
}
