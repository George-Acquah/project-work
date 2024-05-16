import { Link, Stack, useLocalSearchParams } from "expo-router";
import { StyleSheet } from "react-native";

import { ThemedText } from "@/components/common/ThemedText";
import { ThemedView } from "@/components/common/ThemedView";
import { bg_colors, text_colors } from "@/components/auth/styles";

export default function NotFoundScreen() {
  console.log(useLocalSearchParams<any>());
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <ThemedView style={styles.container} {...bg_colors.main}>
        <ThemedText type="title" {...text_colors.title}>
          This screen doesn't exist.
        </ThemedText>
        <Link href="/" style={styles.link}>
          <ThemedText type="link" {...text_colors.title}>
            Go to home screen!
          </ThemedText>
        </Link>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
