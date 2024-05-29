import React, { useEffect, useRef } from "react";
import { Modal, View, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { hideModal } from "@/features/session/session.slice";
import { useRouter } from "expo-router";
import { AUTH_MODALS } from "@/constants/root";
import Button from "./common/button";
import { ThemedText } from "./common/ThemedText";
import { text_colors } from "./auth/styles";
import { FONTS } from "@/constants/fonts";
import { logout } from "@/features/auth/auth.slice";
import { useAppDispatch } from "@/utils/hooks/useRedux";
import { SHARED_COLORS } from "@/constants/Colors";
import { useColorScheme } from "@/utils/hooks/useColorScheme";
import DetachedModal from "./common/detached-modal";
import { SIZES, height } from "@/constants/styles";
import BottomSheet from "@gorhom/bottom-sheet";

const SessionModal = () => {
  const colorScheme = useColorScheme() ?? "light";
  const dispatch = useAppDispatch();
  const router = useRouter();
  const sessionModalRef = useRef<BottomSheet>(null);
  const { showModal, callbackUrl } = useSelector(
    (state: RootState) => state.session
  );

  console.log(showModal, callbackUrl);

  const handleLoginRedirect = async () => {
    await dispatch(logout());
    dispatch(hideModal());
    router.replace(
      `/(auth)/welcome?callbackUrl=${callbackUrl}&action=${AUTH_MODALS.LOGIN}`
    );
  };

  useEffect(() => {
    if (showModal) {
      sessionModalRef.current?.expand()
    }
  }, [showModal])

    // useEffect(() => {
    //   sessionModalRef.current?.expand();
    // }, []);

  return (
    <DetachedModal
      ref={sessionModalRef}
        height={height * 0.6}
        style={{
          marginHorizontal: 50,
          borderRadius: SIZES.radius * 1.5,
        }}
        backgroundStyle={{
          backgroundColor:
            colorScheme === "light"
              ? SHARED_COLORS.gray200
              : SHARED_COLORS.gray700,
        }}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: 300,
            padding: 20,
            backgroundColor:
              colorScheme === "light"
                ? SHARED_COLORS.gray200
                : SHARED_COLORS.gray700,
            borderRadius: 10,
          }}
        >
          <ThemedText style={{ ...FONTS.h3 }} {...text_colors.title}>
            Your session has expired.
          </ThemedText>
          <ThemedText style={{ ...FONTS.ps3 }} {...text_colors.title}>
            Please log in again. 
          </ThemedText>
          <Button title="Go to Login" onPress={handleLoginRedirect} />
        </View>
      </View>
    </DetachedModal>
  );
};

export default SessionModal;
