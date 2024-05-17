import React, { useRef } from "react";
import {
  Animated,
  FlatList,
  Pressable,
  Image,
} from "react-native";
import { accountOptions, cardRoutes, mainRoutes } from "./data";
import { Link } from "expo-router";
import { ThemedView } from "@/components/common/ThemedView";
import { SHARED_COLORS } from "@/constants/Colors";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { useColorScheme } from '@/hooks/useColorScheme'
import { generateAccountIndexStyles } from "./styles";
import { FONTS } from "@/constants/fonts";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/common/ThemedText";
import { Ionicons } from "@expo/vector-icons";

const ScrollViewScreen = () => {
  const scrollOffsetY = useRef(new Animated.Value(0)).current;
  const colorScheme = useColorScheme() ?? 'light';
  const styles = generateAccountIndexStyles(colorScheme);
  return (
    // <ThemedView style={{ height: "100%" }} {...bg_colors.main}>
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Ionicons size={310} name="code-slash" style={styles.headerImage} />
      }
    >
      <ThemedView style={{ paddingHorizontal: 10, gap: 8 }}>
        <ThemedView
          style={{
            borderBottomColor: SHARED_COLORS.gray400,
            borderBottomWidth: 1,
            paddingBottom: 20,
          }}
        >
          <FlatList
            data={cardRoutes}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <ThemedView style={styles.card} key={index}>
                <TabBarIcon
                  fontProvider={item.fontProvider}
                  name={item.icon}
                  color="black"
                  size={34}
                />
                <ThemedText style={styles.subtitle}>{item.name}</ThemedText>
              </ThemedView>
            )}
          />

          <ThemedView style={{ marginTop: 20 }}>
            {accountOptions.map((option, i) => (
              <Pressable style={styles.option} key={i}>
                <ThemedView style={{ width: "70%" }}>
                  <ThemedText style={{ ...FONTS.b1 }}>{option.name}</ThemedText>
                  <ThemedText style={{ ...FONTS.b1 }}>
                    {option.description}
                  </ThemedText>
                </ThemedView>
                <TabBarIcon
                  fontProvider={option.fontProvider}
                  name={option.icon}
                  color="black"
                  size={48}
                />
              </Pressable>
            ))}
          </ThemedView>
        </ThemedView>
      </ThemedView>

      <ThemedView style={{ marginTop: 20, marginHorizontal: 10 }}>
        {mainRoutes.map((route, i) => (
          <Link href={`/(navigations)/account/${route.route}` as any} key={i}>
            <ThemedView
              style={{
                paddingVertical: 14,
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <TabBarIcon
                fontProvider={route.fontProvider}
                name={route.icon}
                color="black"
                size={24}
              />
              <ThemedView
                style={{
                  marginLeft: 20,
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <ThemedText
                  style={{
                    letterSpacing: 1.2,
                    ...FONTS.b1,
                  }}
                >
                  {route.name}
                </ThemedText>
                {route?.sub && (
                  <ThemedView style={{ marginTop: 8 }}>
                    <ThemedText
                      style={{
                        letterSpacing: 1.2,
                        ...FONTS.b1,
                      }}
                    >
                      {route.sub}
                    </ThemedText>
                  </ThemedView>
                )}
              </ThemedView>
            </ThemedView>
          </Link>
        ))}
      </ThemedView>
    </ParallaxScrollView>
    // </ThemedView>
  );
};

export default ScrollViewScreen;