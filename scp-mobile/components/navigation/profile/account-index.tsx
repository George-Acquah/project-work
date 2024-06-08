import { useCallback, useEffect, useRef, useState } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { MotiView, useAnimationState } from "moti";
import { useLocalSearchParams } from "expo-router";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import UserHeader from "./user-header";
import { renderAccountDetails } from "./helpers";
import AccountsModal from "./account-modals";

interface _IAcccountIndexParams extends SearchParamsKeys {
  action: string;
}
const AccountIndex = () => {
  const { action } = useLocalSearchParams<_IAcccountIndexParams>();
  //
  const username = "George Acquah"; // Replace with actual username
  const userdp = "https://randomuser.me/api/portraits/men/1.jpg"; // Replace with actual image URL

  
  // Modal
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [selectedScreen, setSelectedScreen] = useState("");

  //MOTI
  const scaleAnimationState = useAnimationState({
    normal: {
      transform: [{ scale: 1 }],
    },
    scaleDown: {
      transform: [{ scale: 0.9 }],
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
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerContent={<UserHeader username={username} userdp={userdp} />}
      header_height={230}
      scroll_ratio={0.7}
    >
      <MotiView
        state={scaleAnimationState}
        style={{
          flex: 1,
          overflow: "hidden",
        }}
      >
        {/* //Render Account Details */}
        {renderAccountDetails(showModal, scaleAnimationState)}

        {/* Auth Modals */}
        <AccountsModal
          ref={bottomSheetModalRef}
          hideModal={hideModal}
          selectedScreen={selectedScreen}
          setSelectedScreen={setSelectedScreen}
        />
      </MotiView>
    </ParallaxScrollView>
  );
};

export default AccountIndex;
