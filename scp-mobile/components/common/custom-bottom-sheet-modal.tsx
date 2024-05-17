import React, { forwardRef, useMemo } from "react";
import { StyleSheet } from "react-native";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { MotiView } from "moti";

// Define the type for the BottomSheetModal ref
type Ref = BottomSheetModal;

interface _ICustomModalProps {
  points: string[];
  index: number;
  bg: string;
  indicatorBg: string;
  children: React.ReactNode;
}

const CustomBottomSheetModal = forwardRef<Ref, _ICustomModalProps>(
  (
    {
      points = ["25%", "50%", "75%"],
      index = 0,
      bg = "white",
      indicatorBg = "black",
      children,
    },
    ref
  ) => {
    // Use useMemo to memoize snapPoints array
    const snapPoints = useMemo(() => points, [points]);

    return (
      <BottomSheetModal
        ref={ref}
        index={index}
        snapPoints={snapPoints}
        backgroundStyle={{ backgroundColor: bg }}
        handleIndicatorStyle={{ backgroundColor: indicatorBg }}
      >
        <BottomSheetView style={styles.contentContainer}>
          {children}
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
});

export default CustomBottomSheetModal;
