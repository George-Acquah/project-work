import { SHARED_COLORS } from "@/constants/Colors";
import { FONTS } from "@/constants/fonts";
import { SIZES } from "@/constants/styles";
import { hideErrorModal, selectErrorButtonLabel, selectErrorDescription, selectErrorMessage, selectErrorVisible } from "@/features/error/error.slice";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/useRedux";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { View, Modal } from "react-native";
import { ThemedText as Text } from "./common/ThemedText";
import { useColorScheme } from "@/utils/hooks/useColorScheme";
import { generateErrorModalStyles } from "./styles";
import Button from "./common/button";
import { text_colors } from "@/components/auth/styles";


const ErrorModal = () => {

  const colorScheme = useColorScheme() ?? "light";
  const styles = generateErrorModalStyles(colorScheme);
  const dispatch = useAppDispatch();
  const visible = useAppSelector(selectErrorVisible);
  const message = useAppSelector(selectErrorMessage);
  const button_label = useAppSelector(selectErrorButtonLabel);
  const description = useAppSelector(selectErrorDescription);

  const handleClose = () => {
    dispatch(hideErrorModal());
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <AntDesign
            name="closecircle"
            size={54}
            color={SHARED_COLORS.negative400}
            style={{ marginVertical: SIZES.padding * 0.4 }}
          />
          <Text
            style={[styles.errorMessage, { ...FONTS.h3 }]}
            {...text_colors.title}
          >
            {message}
          </Text>

          {description !== undefined && (
            <Text
              style={[
                {
                  ...FONTS.pr2,
                  textAlign: "center",
                  marginBottom: SIZES.padding * 0.4,
                },
              ]}
              {...text_colors.title}
            >
              {description}
            </Text>
          )}
          <Button title={button_label ?? "Close"} onPress={handleClose} />
        </View>
      </View>
    </Modal>
  );
};

export default ErrorModal;