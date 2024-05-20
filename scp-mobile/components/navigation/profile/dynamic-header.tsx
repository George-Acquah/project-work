// DynamicHeader.tsx
import React, { useRef, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import {
  Animated,
  LayoutChangeEvent,
  StyleSheet,
  View,
} from "react-native";
import { useAppSelector } from "@/utils/hooks/useRedux";
import { selectUser } from "@/features/auth/auth.slice";
import DPImage from "./image-dp";
import { LIGHT_THEME, SHARED_COLORS } from "@/constants/Colors";
import { TabBarIcon } from "../TabBarIcon";

interface _IDynamicHeader {
  scrollOffsetY: Animated.Value;
  Header_Max_Height: number;
  Header_Min_Height: number;
  main_color: string;
  secondary_color: string;
}

const DynamicHeader: React.FC<_IDynamicHeader> = ({
  scrollOffsetY,
  Header_Max_Height = 240,
  Header_Min_Height = 120,
  main_color = LIGHT_THEME.primary700,
  secondary_color = SHARED_COLORS.gray800,
}) => {
  const [height, setHeight] = useState(0);

  const floatingLabelAnimation = useRef(new Animated.Value(0)).current;

  const handleLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setHeight(height);

    // Update the floatingLabelAnimation based on the initial height
    Animated.timing(floatingLabelAnimation, {
      toValue: height <= Header_Min_Height ? 1 : 0,
      duration: 0, // Set the duration to 0 to set the value immediately
      useNativeDriver: false, // Make sure to set this if you're using Animated.Value
    }).start();
  };

  const floatingLabelStyle = {
    fontSize: floatingLabelAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [40, 20],
    }),
    marginLeft: floatingLabelAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [5, 10],
    }),
    width: floatingLabelAnimation.interpolate({
      inputRange: [0, 1], 
      outputRange: [180, 240]
    })
  };

  const floatingViewStyle = {
     marginLeft: floatingLabelAnimation.interpolate({
       inputRange: [0, 1],
       outputRange: [0, 10],
     }),
  };

  const user = useAppSelector(selectUser);
  const Scroll_Distance = Header_Max_Height - Header_Min_Height;

  const animatedHeaderHeight = scrollOffsetY.interpolate({
    inputRange: [0, Scroll_Distance],
    outputRange: [Header_Max_Height, Header_Min_Height],
    extrapolate: "clamp",
  });

  const animatedHeaderColor = scrollOffsetY.interpolate({
    inputRange: [0, Scroll_Distance],
    outputRange: [main_color, secondary_color],
    extrapolate: "clamp",
  });

    const animatedHeaderPadding = scrollOffsetY.interpolate({
      inputRange: [0, Scroll_Distance],
      outputRange: [40, 0],
      extrapolate: "clamp",
    });

  return (
    <Animated.View
      style={[
        styles.header,
        {
          height: animatedHeaderHeight,
          backgroundColor: animatedHeaderColor,
          paddingTop: animatedHeaderPadding,
        },
      ]}
      // className={`${
      //   height <= Header_Min_Height
      //     ? "flex-row items-center justify-between "
      //     : ""
      // } `}
      onLayout={handleLayout}
    >
      <View >
        <TabBarIcon fontProvider={MaterialIcons} name={"close"} color="white"  style={{ borderWidth: 20}}/>
      </View>
      <Animated.View
        style={[floatingViewStyle]}
        // className={` flex-row justify-between items-center ${
        //   height <= Header_Min_Height ? "flex-1" : ""
        // } `}
      >
        <View>
          <Animated.Text style={[styles.title, floatingLabelStyle]}>
            {"George Acquah"}
          </Animated.Text>
        </View>
        <View>
          <DPImage size={60} />
        </View>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  header: {
    left: 0,
    right: 0,
    paddingHorizontal: 20,
  },
  title: {
    color: 'black',
    fontWeight: "bold",
    textAlign: "left"
  },
});

export default DynamicHeader;
