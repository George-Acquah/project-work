import React, {
  Dispatch,
  SetStateAction,
  forwardRef,
  useCallback,
  useMemo,
} from "react";
import { Platform } from "react-native";
import { BottomSheetModal, BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { ThemedView as View } from "@/components/common/ThemedView";
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";

import { SIZES } from "@/constants/styles";
import { bg_colors } from "@/components/auth/styles";
import {  renderHeader, renderMainRoutesModals } from "./helpers";

type Ref = BottomSheetModal;
interface _IAccountsModal {
  selectedScreen: string;
  setSelectedScreen: Dispatch<SetStateAction<string>>;
  hideModal: () => void;
}

const AccountsModal = forwardRef<Ref, _IAccountsModal>(
  ({ selectedScreen, setSelectedScreen, hideModal }, ref) => {
    // variables
    const snapPoints = useMemo(() => {
      if (Platform.OS === "ios") return ["96%"];
      else if (Platform.OS === "android") return ["96%"];
      else return ["60%"];
    }, []);

    const renderBackdrop = useCallback(
      (props: BottomSheetDefaultBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          opacity={0.3}
          pressBehavior="none"
        />
      ),
      []
    );

    return (
      <BottomSheetModal
        ref={ref}
        snapPoints={snapPoints}
        enablePanDownToClose={false}
        backdropComponent={renderBackdrop}
        backgroundStyle={{ backgroundColor: "transparent", borderRadius: 0 }}
        handleComponent={() => {
          return <View />;
        }}
      >
        <View
          style={{
            flex: 1,
            borderTopRightRadius: SIZES.radius * 2,
            borderTopLeftRadius: SIZES.radius * 2,
            padding: SIZES.padding,
          }}
          {...bg_colors.main}
        >
          {/* HEADER */}
          {renderHeader(selectedScreen, hideModal)}

          {/* SCREENS -  */}
          <View style={{ flex: 1 }}>
            {/* Render Modals */}
            {renderMainRoutesModals(selectedScreen, setSelectedScreen)}
          </View>
        </View>
      </BottomSheetModal>
    );
  }
);

export default AccountsModal;
