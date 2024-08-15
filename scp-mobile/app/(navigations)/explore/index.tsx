import React, { useEffect } from "react";
import { usePathname, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { FONTS } from "@/constants/fonts";
import { ThemedText } from "@/components/common/ThemedText";
import { text_colors } from "@/components/auth/styles";
import axiosInstance from "@/api/root";

const ExploreScreen = () => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const seedSlots = async () => {
      const result = await axiosInstance.post("owner/parking-center/66bd77e7f5c9311faadc7137/add-slot");
      
    }
    seedSlots();
  },[])
  return (
    <SafeAreaView>
      <ThemedText style={{ ...FONTS.h2 }} {...text_colors.title}>
        {`Hello from ${pathname} Screen`}
      </ThemedText>
    </SafeAreaView>
  );
};

export default ExploreScreen;
