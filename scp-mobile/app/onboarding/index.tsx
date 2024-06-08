import Button from "@/components/common/button";
import { tipsData } from "@/constants/root";
import { SIZES } from "@/constants/styles";
import { router } from "expo-router";
import React, { useState } from "react";
import { FlatList, Image } from "react-native";
import Svg, { Path } from "react-native-svg";
import { ThemedView as View } from "@/components/common/ThemedView"
import { ThemedText as Text } from "@/components/common/ThemedText";
import { LIGHT_THEME, SHARED_COLORS } from "@/constants/Colors";

const bg_colors = {
  container: {
    lightColor: SHARED_COLORS.gray300,
    darkColor: SHARED_COLORS.gray800,
  },sub_container: {
    lightColor: LIGHT_THEME.primary900,
    darkColor: LIGHT_THEME.primary900,
  },
  text: {
    lightColor: LIGHT_THEME.backgroundPrimary,
    darkColor: LIGHT_THEME.backgroundPrimary,
  },
};
const OnboardingScreen = () => {
  const controlX = SIZES.width / 2; // Control center point's X co ordinate

  //FlatList
  const currentIndex = React.useRef(0);
  const screenFlatListRef = React.useRef<FlatList>(null);
  const titleFlatListRef = React.useRef<FlatList>(null);

  // State to track lastIndex
  const [lastIndex, setLastIndex] = useState(false);

  const handleNextPress = () => {
    if (currentIndex.current < tipsData.length - 1) {
      currentIndex.current += 1;
      const nextIndex = currentIndex.current;
      const offset = nextIndex * SIZES.width;

      screenFlatListRef?.current?.scrollToOffset({
        offset,
        animated: true,
      });

      titleFlatListRef?.current?.scrollToOffset({
        offset,
        animated: true,
      });
      if (currentIndex.current === tipsData.length - 1) {
        setLastIndex(true);
      }
    }
    else {
      router.replace("/(navigations)/home/");
    }

  };

  return (
    <View style={{ flex: 1 }} {...bg_colors.container}>
      {/* Screenshot View */}
      <View style={{ flex: 2 }}>
        <FlatList
          ref={screenFlatListRef}
          horizontal
          pagingEnabled
          scrollEnabled={false}
          snapToAlignment="center"
          snapToInterval={SIZES.width}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          data={tipsData}
          keyExtractor={(item) => `onboarding_screen_phone-${item.title}`}
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  width: SIZES.width,
                  alignItems: "center",
                }}
              >
                <Image
                  source={{ uri: item.image }}
                  style={{
                    marginTop: SIZES.xLarge * 3,
                    borderTopRightRadius: SIZES.radius * 2,
                    borderTopLeftRadius: SIZES.radius * 2,
                    width: SIZES.width * 0.8,
                    height: SIZES.height * 0.8,
                  }}
                />
              </View>
            );
          }}
        />
      </View>

      {/* Details View */}
      <View style={{ flex: 1 }} {...bg_colors.sub_container}>
        {/* I installed react-native-svg for the curve */}

        {/* curve */}
        <Svg
          style={{ position: "absolute", top: -100 }}
          width={SIZES.width + 5}
          height={100}
        >
          <Path
            d={`M 0 20 Q ${controlX} 130 ${SIZES.width} 20 L ${SIZES.width} 100 L 0 100 Z`}
            fill={LIGHT_THEME.primary900}
          />
        </Svg>

        {/* Title and description */}
        <FlatList
          ref={titleFlatListRef}
          horizontal
          pagingEnabled
          scrollEnabled={false}
          snapToAlignment="center"
          snapToInterval={SIZES.width}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          data={tipsData}
          keyExtractor={(item) => `onboarding_screen_title-${item.title}`}
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  width: SIZES.width,
                  paddingHorizontal: SIZES.large,
                  alignItems: "center",
                }}
              >
                {/* title */}
                <Text
                  style={{
                    textAlign: "center",
                    fontWeight: "500",
                    fontSize: 30,
                  }}
                  {...bg_colors.text}
                >
                  {item.title}
                </Text>

                {/* description */}
                <Text
                  style={{
                    textAlign: "center",
                    marginTop: SIZES.padding,
                    fontWeight: "400",
                    fontSize: 18,
                  }}
                  {...bg_colors.text}
                >
                  {item.description}
                </Text>
              </View>
            );
          }}
        />

        {/* Text Button */}
        <Button
          title={`${lastIndex ? "Get Started" : "Next"}`}
          additionalStyles={{
            marginBottom: SIZES.padding,
            marginHorizontal: SIZES.radius,
            borderRadius: 50,
            backgroundColor: "white",
          }}
          additionalTextStyles={{
            fontSize: 22,
            color: LIGHT_THEME.primary900,
            fontWeight: "500",
          }}
          onPress={handleNextPress}
        />
      </View>
    </View>
  );
};

export default OnboardingScreen;
