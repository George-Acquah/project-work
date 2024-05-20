import React, { useCallback, useMemo} from "react";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetProps,
} from "@gorhom/bottom-sheet";
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";

type Ref = BottomSheet;
interface _IDetached extends BottomSheetProps {
  height: number;
  children: React.ReactNode;
}

const DetachedModal = React.forwardRef<Ref, _IDetached>(
  ({ height, style, backgroundStyle, children }, ref) => {
    // variables
    const snapPoints = useMemo(() => ["40%"], []);
    const renderBackdrop = useCallback(
      (props: BottomSheetDefaultBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          opacity={0.3}
          pressBehavior="close"
        />
      ),
      []
    );

    // renders
    return (
      <BottomSheet
        ref={ref}
        snapPoints={snapPoints}
        index={-1} // Initially closed
        backdropComponent={renderBackdrop}
        // add bottom inset to elevate the sheet
        bottomInset={height - 40 ?? 46}
        // set `detached` to true
        detached={true}
        style={style}
        backgroundStyle={backgroundStyle}
      >
        {children}
      </BottomSheet>
    );
  }
);


export default DetachedModal;
