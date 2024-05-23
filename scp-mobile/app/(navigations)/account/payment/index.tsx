import React from "react";
import { usePathname, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { FONTS } from "@/constants/fonts";
import { ThemedText } from "@/components/common/ThemedText";

const PaymentScreen = () => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <SafeAreaView>
      <ThemedText style={{ ...FONTS.h2 }}>
        {`Hello from ${pathname} Screen`}
      </ThemedText>
    </SafeAreaView>
  );
};

export default PaymentScreen;
