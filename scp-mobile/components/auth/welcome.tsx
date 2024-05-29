import { ThemedView as View } from "@/components/common/ThemedView";
import { renderImage, renderLoginDetails, background_colors } from "./helpers";
import { useCallback, useEffect, useRef, useState } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import AuthModal from "./modal";
import { MotiView, useAnimationState } from "moti";
import { useLocalSearchParams } from "expo-router";
import { UserType } from "@/utils/enums/global.enum";


interface _IWelcomeParams extends SearchParamsKeys {
  action: string;
  callbackUrl: string;
}
const Welcome = () => {
  const { action, callbackUrl } = useLocalSearchParams<_IWelcomeParams>();
  console.log(callbackUrl);

  // Modal
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [selectedScreen, setSelectedScreen] = useState("");
  const [usertype, setUsertype] = useState<UserType | null>(null);

  //MOTI
  const scaleAnimationState = useAnimationState({
    normal: {
      transform: [{ scale: 1 }],
    },
    scaleDown: {
      transform: [{ scale: 0.9 }],
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
  });

  // Modal Callbacks
  const showModal = useCallback((screen: string) => {
    setSelectedScreen(screen);
    if (bottomSheetModalRef.current) {
      bottomSheetModalRef.current.present();
    } else {
      // Handle the case when bottomSheetModalRef.current is null
      console.error("bottomSheetModalRef.current is null");
    }
  }, []);

  const hideModal = useCallback(() => {
    scaleAnimationState.transitionTo("normal");
    if (bottomSheetModalRef.current) {
      bottomSheetModalRef.current.dismiss();
    } else {
      // Handle the case when bottomSheetModalRef.current is null
      console.error("bottomSheetModalRef.current is null");
    }
  }, []);

  //use Effect
  useEffect(() => {
    if (action) {
      showModal(action);
    } else {
      scaleAnimationState.transitionTo("normal");
    }
  }, [action]);

  return (
    // CONTAINER
    <View style={{ flex: 1 }} {...background_colors.container}>
      {/* //SUB CONTAINER */}
      <MotiView
        state={scaleAnimationState}
        style={{
          flex: 1,
          overflow: "hidden",
          backgroundColor: background_colors.sub_container.lightColor,
        }}
      >
        {/* //Render Image */}
        {renderImage()}

        {/* //Render Login Details */}
        {renderLoginDetails(showModal, scaleAnimationState, usertype)}

        {/* Auth Modals */}
        <AuthModal
          ref={bottomSheetModalRef}
          hideModal={hideModal}
          selectedScreen={selectedScreen}
          setSelectedScreen={setSelectedScreen}
          setUsertype={setUsertype}
          usertype={usertype}
        />
      </MotiView>
    </View>
  );
};

export default Welcome;
