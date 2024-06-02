import React, { useEffect, useRef } from "react";
import { Animated, View, StyleSheet } from "react-native";
import Svg, { Circle } from "react-native-svg";

interface CircularCountdownProps {
  duration: number;
  size: number;
  strokeWidth: number;
  color: string;
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const CircularCountdown: React.FC<CircularCountdownProps> = ({
  duration,
  size,
  strokeWidth,
  color,
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration,
      useNativeDriver: true, // If you're animating opacity or transform, you can enable useNativeDriver
    }).start();
  }, [duration]);

  const circumference = 2 * Math.PI * (size / 2 - strokeWidth / 2);
  const animatedVa = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, circumference],
  });

  // Animated.Value will be a number during the animation, so you can directly use animatedVa
return (
  <View style={styles.svgContainer}>
    <Svg width={size} height={size}>
      <AnimatedCircle
        stroke={color}
        fill="none"
        cx={size / 2}
        cy={size / 2}
        r={size / 2 - strokeWidth / 2}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={animatedVa} // Now this is an Animated value
      />
    </Svg>
  </View>
);
};

const styles = StyleSheet.create({
  svgContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CircularCountdown;
