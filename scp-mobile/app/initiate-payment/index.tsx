import { ThemedView, ThemedView as View } from "@/components/common/ThemedView";
import { ThemedText as Text, ThemedText } from "@/components/common/ThemedText";
import { FONTS } from "@/constants/fonts";
import { TextInput, TouchableOpacity, Alert, Modal } from "react-native";
import { useRef, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import Button from "@/components/common/button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useForm, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useColorScheme } from "@/utils/hooks/useColorScheme";
import { SHARED_COLORS, LIGHT_THEME } from "@/constants/Colors";
import { SIZES } from "@/constants/styles";
import FormInputs from "@/components/common/input-form";
import { text_colors } from "@/components/auth/styles";
import PaymentSchema from "@/schemas/payment.schema";
import { initiatePayment } from "@/api/payment";
import { generateErrorModalStyles } from "@/components/styles";
import { AUTH_MODALS, keys } from "@/constants/root";
import { logout } from "@/features/auth/auth.slice";
import {
  selectShowSessionModal,
  selectCallbackUrl,
  hideModal,
} from "@/features/session/session.slice";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/useRedux";
import { useRouter } from "expo-router";
import LoadingComponent from "@/components/skeletons/loading";
import axiosInstance, { BASE_URL } from "@/api/root";
import { load } from "@/utils/functions/storage";
import RendererHOC from "@/components/common/renderer.hoc";
import InitiatePaymentComp from "@/components/navigation/bookings/initiate-payment";

const PaymentScreen = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      <RendererHOC loading={false} error={null}>
        <InitiatePaymentComp />
      </RendererHOC>
    </View>
  );
};

export default PaymentScreen;
