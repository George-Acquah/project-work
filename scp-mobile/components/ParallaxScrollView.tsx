import React from "react";
import type { PropsWithChildren, ReactElement } from "react";
import { ViewProps, useColorScheme } from "react-native";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";

import { ThemedView } from "@/components/common/ThemedView";
import { generageScrollViewStyles } from "./styles";

type Props = PropsWithChildren<{
  headerContent: ReactElement;
  header_height: number;
  scroll_ratio: number;
  headerBackgroundColor: {
    dark: string | undefined;
    light: string | undefined;
  };
}>;

export default function ParallaxScrollView({
  children,
  headerContent,
  header_height = 250,
  scroll_ratio = 0.6,
  headerBackgroundColor,
  style,
}: Props & ViewProps) {
  const colorScheme = useColorScheme() ?? "light";
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-header_height, 0, header_height],
            [-header_height / 2, 0, header_height * scroll_ratio]
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-header_height, 0, header_height],
            [2, 1, 1]
          ),
        },
      ],
    };
  });

  const styles = generageScrollViewStyles(header_height);

  return (
    <ThemedView style={styles.container}>
      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
        <Animated.View
          style={[
            styles.header,
            { backgroundColor: headerBackgroundColor[colorScheme] },
            headerAnimatedStyle,
          ]}
        >
          {headerContent}
        </Animated.View>
        <ThemedView style={[styles.content, style]}>
          <ThemedView style={{ marginTop: header_height }}>
            {children}
          </ThemedView>
        </ThemedView>
      </Animated.ScrollView>
    </ThemedView>
  );
}
