import React, {
  Dispatch,
  SetStateAction,
  forwardRef,
  useCallback,
  useMemo,
} from "react";
import { Platform, TouchableOpacity } from "react-native";
import { BottomSheetModal, BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { ThemedView as View } from "@/components/common/ThemedView";
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import { Entypo } from "@expo/vector-icons";
import { MotiView } from "moti";
import { NAVIGATION_MODALS } from "@/constants/root";
import { useColorScheme } from "@/utils/hooks/useColorScheme";
import { SIZES } from "@/constants/styles";
import { DARK_THEME, LIGHT_THEME } from "@/constants/Colors";
import { TabBarIcon } from "../TabBarIcon";
import { bg_colors } from "@/components/auth/styles";

type Ref = BottomSheetModal;
interface _INavigationModal {
  hideModal: () => void;
  children: React.ReactNode;
}

const NavigationModal = forwardRef<Ref, _INavigationModal>(
  (
    {
      hideModal,
      children,
    },
    ref
  ) => {
    // variables
    const snapPoints = useMemo(() => {
      if (Platform.OS === "ios") return ["93%"];
      else if (Platform.OS === "android") return ["93%"];
      else return ["60%"];
    }, []);
    const colorScheme = useColorScheme() ?? "light";

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

    // renders
    const renderHeader = () => {
      return (
        <View>
          <View>
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
          </View>
        </View>
      );
    };

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
          {renderHeader()}

          {/* MODALS- REQUEST_RESERVATIONS */}
          <View style={{ flex: 1 }}>
            {/* Render Request Reservation */}
            <MotiView
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                // zIndex: selectedScreen === screen_type ? 2 : 1,
              }}
              from={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={
                {
                  type: "timing",
                  duration: 500,
                } as any
              }
            >
              {children}
            </MotiView>
          </View>
        </View>
      </BottomSheetModal>
    );
  }
);

export default NavigationModal;
