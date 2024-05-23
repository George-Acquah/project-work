import React from "react";
import { FlatList, Pressable } from "react-native";
import { accountOptions, cardRoutes, mainRoutes } from "./data";
import { Link, router } from "expo-router";
import { ThemedView } from "@/components/common/ThemedView";
import { SHARED_COLORS } from "@/constants/Colors";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { useColorScheme } from "@/utils/hooks/useColorScheme";
import { bg_styles, generateAccountIndexStyles, text_styles } from "./styles";
import { FONTS } from "@/constants/fonts";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/common/ThemedText";
import UserHeader from "@/components/navigation/profile/user-header";
import Button from "@/components/common/button";
import { MaterialIcons } from "@expo/vector-icons";
import { useAppDispatch } from "@/utils/hooks/useRedux";
import { logout } from "@/features/auth/auth.slice";

const AccountProfileScreen = () => {
  const colorScheme = useColorScheme() ?? "light";
  const styles = generateAccountIndexStyles(colorScheme);
  const username = "George Acquah"; // Replace with actual username
  const userdp = "https://randomuser.me/api/portraits/men/1.jpg"; // Replace with actual image URL
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      console.log('clicked')
      await dispatch(logout());
      router.replace('/')
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerContent={<UserHeader username={username} userdp={userdp} />}
      header_height={250}
      scroll_ratio={0.27}
    >
      <ThemedView style={{ paddingHorizontal: 10, gap: 8 }}>
        <ThemedView
          style={{
            borderBottomColor:
              colorScheme === "light"
                ? SHARED_COLORS.gray400
                : SHARED_COLORS.gray600,
            borderBottomWidth: 1,
            paddingBottom: 20,
          }}
        >
          <FlatList
            data={cardRoutes}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <Link
                href={`/(accounts)/${item.route}/` as any}
                key={index}
                style={{ marginTop: 10, marginHorizontal: 10 }}
              >
                <ThemedView style={[styles.card, {}]} {...bg_styles.container}>
                  <TabBarIcon
                    fontProvider={item.fontProvider}
                    name={item.icon}
                    color={colorScheme === "light" ? "black" : "white"}
                    size={34}
                  />
                  <ThemedText
                    style={styles.subtitle}
                    {...text_styles.container}
                  >
                    {item.name}
                  </ThemedText>
                </ThemedView>
              </Link>
            )}
          />

          <ThemedView style={{ marginTop: 20 }}>
            {accountOptions.map((option, i) => (
              <Pressable style={styles.option} key={i}>
                <ThemedView style={{ width: "80%" }}>
                  <ThemedText
                    style={{ ...FONTS.h3 }}
                    {...text_styles.container}
                  >
                    {option.name}
                  </ThemedText>
                  <ThemedText
                    style={{ ...FONTS.pr3 }}
                    {...text_styles.container}
                  >
                    {option.description}
                  </ThemedText>
                </ThemedView>
                <TabBarIcon
                  fontProvider={option.fontProvider}
                  name={option.icon}
                  color={colorScheme === "light" ? "black" : "white"}
                  size={48}
                />
              </Pressable>
            ))}
          </ThemedView>
        </ThemedView>
      </ThemedView>

      <ThemedView style={{ marginVertical: 20, marginHorizontal: 10 }}>
        {mainRoutes.map((route, i) => (
          <Link href={`/(accounts)/${route.route}/` as any} key={i}>
            <ThemedView
              style={{
                paddingVertical: 10,
                paddingHorizontal: 10,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TabBarIcon
                fontProvider={route.fontProvider}
                name={route.icon}
                color={colorScheme === "light" ? "black" : "white"}
                size={24}
                style={{ marginBottom: undefined }}
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
                    ...FONTS.pr1,
                  }}
                  {...text_styles.container}
                >
                  {route.name}
                </ThemedText>
              </ThemedView>
            </ThemedView>
            {route?.sub && (
              <ThemedView
                style={{
                  marginLeft: 80,
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <ThemedText
                  style={{
                    ...FONTS.b1,
                  }}
                  {...text_styles.sub}
                >
                  {route.sub}
                </ThemedText>
              </ThemedView>
            )}
          </Link>
        ))}
      </ThemedView>

      <ThemedView style={{ margin: 20 }}>
        <ThemedView
          style={{
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 10,
          }}
          {...bg_styles.container}
        >
          <Button
            additionalStyles={{
              backgroundColor: undefined,
              borderColor: undefined,
              borderWidth: 0,
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
            }}
            type="opacity"
            onPress={handleLogout}
          >
            <TabBarIcon
              fontProvider={MaterialIcons}
              name={"logout"}
              color={colorScheme === "light" ? "black" : "white"}
              size={24}
              style={{ marginBottom: undefined }}
            />
            <ThemedText
              style={{
                ...FONTS.ps1,
              }}
              {...text_styles.container}
            >
              Logout
            </ThemedText>
          </Button>
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  );
};

export default AccountProfileScreen;
