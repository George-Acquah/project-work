import React from "react";
import { Modal, View } from "react-native";
import { hideModal, selectCallbackUrl, selectShowSessionModal } from "@/features/session/session.slice";
import { useRouter } from "expo-router";
import { AUTH_MODALS } from "@/constants/root";
import Button from "./common/button";
import { ThemedText as Text } from "./common/ThemedText";
import { text_colors } from "./auth/styles";
import { FONTS } from "@/constants/fonts";
import { logout } from "@/features/auth/auth.slice";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/useRedux";
import { useColorScheme } from "@/utils/hooks/useColorScheme";
import { SIZES } from "@/constants/styles";
import { generateErrorModalStyles } from "./styles";

const SessionModal = () => {
  const colorScheme = useColorScheme() ?? "light";
  const styles = generateErrorModalStyles(colorScheme);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const showModal = useAppSelector(selectShowSessionModal);
  const callbackUrl = useAppSelector(selectCallbackUrl);

  console.log(showModal, callbackUrl);

  const handleLoginRedirect = async () => {
    await dispatch(logout());
    dispatch(hideModal());
    router.replace(
      `/(auth)/welcome?callbackUrl=${callbackUrl}&action=${AUTH_MODALS.LOGIN}`
    );
  };

    return (
      <Modal visible={showModal} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text
              style={[styles.errorMessage, { ...FONTS.h3 }]}
              {...text_colors.title}
            >
              Your session has expired.
            </Text>
            <Text
              style={[
                {
                  ...FONTS.ps2,
                  textAlign: "center",
                  marginBottom: SIZES.padding * 0.4,
                },
              ]}
              {...text_colors.title}
            >
              Please log in again.
            </Text>
            <Button title="Go to login" onPress={handleLoginRedirect} />
          </View>
        </View>
      </Modal>
    );
};

export default SessionModal;
