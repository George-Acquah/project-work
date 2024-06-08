import React from "react";
import { usePathname, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { FONTS } from "@/constants/fonts";
import { ThemedText } from "@/components/common/ThemedText";
import { text_colors } from "@/components/auth/styles";

const ExploreScreen = () => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <SafeAreaView>
      <ThemedText style={{ ...FONTS.h2 }} {...text_colors.title}>
        {`Hello from ${pathname} Screen`}
      </ThemedText>
    </SafeAreaView>
  );
};

export default ExploreScreen;
