import React, { forwardRef, useCallback, useMemo } from "react";
import { StyleSheet } from "react-native";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import { MotiView } from "moti";
import { BackdropPressBehavior, BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";

// Define the type for the BottomSheetModal ref
type Ref = BottomSheetModal;

interface _ICustomModalProps {
  points: string[];
  index: number;
  bg: string;
  indicatorBg: string;
  pressBehavior: BackdropPressBehavior;
  children: React.ReactNode;
}

const CustomBottomSheetModal = forwardRef<Ref, _ICustomModalProps>(
  (
    {
      points = ["25%", "50%", "75%"],
      index = 0,
      bg = "white",
      indicatorBg = "black",
      pressBehavior = 'none',
      children,
    },
    ref
  ) => {
    // Use useMemo to memoize snapPoints array
    const snapPoints = useMemo(() => points, [points]);

        const renderBackdrop = useCallback(
          (props: BottomSheetDefaultBackdropProps) => (
            <BottomSheetBackdrop
              {...props}
              disappearsOnIndex={-1}
              appearsOnIndex={0}
              opacity={0.8}
              pressBehavior={ pressBehavior }
            />
          ),
          []
        );

    return (
      <BottomSheetModal
        ref={ref}
        index={index}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        backgroundStyle={{ backgroundColor: bg }}
        handleIndicatorStyle={{ backgroundColor: indicatorBg }}
      >
        <BottomSheetView style={{ flex: 1 }}>{children}</BottomSheetView>
      </BottomSheetModal>
    );
  }
);

const styles = StyleSheet.create({
  contentContainer: {
    
  },
});

export default CustomBottomSheetModal;
