import { text_colors } from "@/components/auth/styles";
import { ThemedText } from "@/components/common/ThemedText";
import useTokenRotation from "@/utils/hooks/rotate-tokens.hooks";
import { Redirect } from "expo-router";
import React from "react";

const Index = () => {
  const { auth } = useTokenRotation();
  // Render loading state while waiting for auth status to be determined
  if (auth === null) {
    return (
      <ThemedText style={{ textAlign: "center" }} {...text_colors.title}>
        Loading...
      </ThemedText>
    );
  }

  // Render based on auth status
  return auth ? <Redirect href="/onboarding" /> : <Redirect href="/welcome" />;
};

export default Index;
