import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Pressable } from "react-native";
import { useColorScheme } from "@/utils/hooks/useColorScheme";
import { FONTS } from "@/constants/fonts";
import { DARK_THEME, LIGHT_THEME, SHARED_COLORS } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import DPImage from "./image-dp";
import { router } from "expo-router";

interface UserHeaderProps {
  username: string;
  userdp: string; // Assuming userdp is a URL to the image
}

const UserHeader = ({
  username,
  userdp,
}: UserHeaderProps) => {
  const colorScheme = useColorScheme() ?? "light";
  const textColor =
    colorScheme === "light" ? LIGHT_THEME.contentPrimary : DARK_THEME.contentPrimary;

  return (
    <View style={styles.headerContainer}>
      <Pressable onPress={() => router.navigate("/(navigations)/account/help")}>
        <DPImage size={120} />
      </Pressable>
      <Text style={[styles.username, { color: textColor }]}>{username}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  username: {
    ...FONTS.h1,
    marginTop: 10,
  },
});

export default UserHeader;
