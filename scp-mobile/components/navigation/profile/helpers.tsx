import { FlatList, Pressable, TouchableOpacity } from "react-native";
import { ThemedView } from "@/components/common/ThemedView";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { ThemedText } from "@/components/common/ThemedText";
import { FONTS } from "@/constants/fonts";
import React, { Dispatch, SetStateAction } from "react";
import { DARK_THEME, LIGHT_THEME, SHARED_COLORS } from "@/constants/Colors";
import { useColorScheme } from "@/utils/hooks/useColorScheme";
import {
  cardRoutes,
  accountOptions,
  mainRoutes,
} from "@/app/(navigations)/account/data";
import {
  generateAccountIndexStyles,
  bg_styles,
  text_styles,
} from "@/app/(navigations)/account/styles";
import { ACCOUNT_MODALS } from "@/constants/root";
import { Entypo } from "@expo/vector-icons";
import DPImage from "./image-dp";
import { MotiView } from "moti";
import ManageAccount from "./modals/manage-accounts";

interface _IRenderMotiModals {
  screen_type: string;
  children: React.ReactNode;
  selectedScreen: string;
  num: number;
}

const background_colors = {
  container: {
    lightColor: SHARED_COLORS.gray400,
    darkColor: SHARED_COLORS.gray400,
  },
  sub_container: {
    lightColor: SHARED_COLORS.gray900,
    darkColor: SHARED_COLORS.gray900,
  },
};

// renders
const renderHeader = (selectedScreen: string, hideModal: () => void) => {
  const colorScheme = useColorScheme() ?? "light";
  return (
    <ThemedView>
      {selectedScreen === ACCOUNT_MODALS.MANAGE ? (
        <ThemedView
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              hideModal();
            }}
          >
            <TabBarIcon
              fontProvider={Entypo}
              name="chevron-left"
              color={
                colorScheme === "light"
                  ? LIGHT_THEME.contentPrimary
                  : DARK_THEME.contentPrimary
              }
            />
          </TouchableOpacity>
          <DPImage size={120} />
        </ThemedView>
      ) : (
        <ThemedView>
          <TouchableOpacity
            onPress={() => {
              hideModal();
            }}
          >
            <TabBarIcon
              fontProvider={Entypo}
              name="chevron-left"
              color={
                colorScheme === "light"
                  ? LIGHT_THEME.contentPrimary
                  : DARK_THEME.contentPrimary
              }
            />
          </TouchableOpacity>
        </ThemedView>
      )}
    </ThemedView>
  );
};

const RenderMotiModals = ({
  screen_type,
  num,
  selectedScreen,
  children,
}: _IRenderMotiModals) => {
  return (
    <MotiView
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: selectedScreen === screen_type ? 2 : 1,
      }}
      from={{}}
      animate={{
        left: selectedScreen === screen_type ? 0 : num,
        opacity: selectedScreen === screen_type ? 1 : 0,
      }}
    >
      {children}
    </MotiView>
  );
};

const renderMainRoutesModals = (
  selectedScreen: string,
  setSelectedScreen: Dispatch<SetStateAction<string>>
) => (
  <>
    {/* Manage Account */}
    <RenderMotiModals
      selectedScreen={selectedScreen}
      screen_type={ACCOUNT_MODALS.MANAGE}
      num={-100}
    >
      <ManageAccount setSelectedScreen={setSelectedScreen} />
    </RenderMotiModals>

    {/* Manage Account */}
    <RenderMotiModals
      selectedScreen={selectedScreen}
      screen_type={ACCOUNT_MODALS.MESSAGES}
      num={-100}
    >
      <ManageAccount setSelectedScreen={setSelectedScreen} />
    </RenderMotiModals>

    {/* Manage Account */}
    <RenderMotiModals
      selectedScreen={selectedScreen}
      screen_type={ACCOUNT_MODALS.MONETIZING}
      num={-100}
    >
      <ManageAccount setSelectedScreen={setSelectedScreen} />
    </RenderMotiModals>

    {/* Manage Account */}
    <RenderMotiModals
      selectedScreen={selectedScreen}
      screen_type={ACCOUNT_MODALS.SETTINGS}
      num={-100}
    >
      <ManageAccount setSelectedScreen={setSelectedScreen} />
    </RenderMotiModals>

    {/* Manage Account */}
    <RenderMotiModals
      selectedScreen={selectedScreen}
      screen_type={ACCOUNT_MODALS.LEGAL}
      num={-100}
    >
      <ManageAccount setSelectedScreen={setSelectedScreen} />
    </RenderMotiModals>
  </>
);

const renderAccountDetails = (
  showModal: (screen: string) => void,
  animationState: any
) => {
  const colorScheme = useColorScheme() ?? "light";
  const styles = generateAccountIndexStyles(colorScheme);
  return (
    <>
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
              <Pressable
                key={index}
                style={{ marginTop: 10, marginHorizontal: 10 }}
                onPress={() => {
                  showModal(item.route);
                }}
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
              </Pressable>
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
          <Pressable
            onPress={() => {
              showModal(route.route);
            }}
            style={{
              paddingVertical: 10,
              paddingHorizontal: 10,
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
            key={i}
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
          </Pressable>
        ))}
      </ThemedView>
    </>
  );
};

export {
  background_colors,
  renderAccountDetails,
  renderHeader,
  RenderMotiModals,
  renderMainRoutesModals,
};
