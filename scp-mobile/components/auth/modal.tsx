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
import Login from "./login";
import { MotiView } from "moti";
import { AUTH_MODALS } from "@/constants/root";
import Register from "./register";
import { bg_colors } from "./styles";
import ForgotPassword from "./forgot-password";
import AddVehicle from "./add-vehicle";
import AddAddress from "./add-address";
import { useColorScheme } from "@/utils/hooks/useColorScheme";
import { TabBarIcon } from "../navigation/TabBarIcon";
import { SIZES } from "@/constants/styles";
import { DARK_THEME, LIGHT_THEME } from "@/constants/Colors";
import UserTypeModal from "./select-usertype";
import { UserType } from "@/utils/enums/global.enum";



type Ref = BottomSheetModal;
interface _IAuthModal {
  selectedScreen: string;
  usertype: UserType | null;
  callbackUrl: string | undefined;
  setSelectedScreen: Dispatch<SetStateAction<string>>;
  setUsertype: Dispatch<SetStateAction<UserType | null>>;
  hideModal: () => void;
}

interface _IRenderMotiModals {
  screen_type: string;
  children: React.ReactNode;
  num: number;
}
const AuthModal = forwardRef<Ref, _IAuthModal>(
  ({ selectedScreen, callbackUrl, usertype, setSelectedScreen, setUsertype, hideModal }, ref) => {
    // variables
    const snapPoints = useMemo(() => {
      if (Platform.OS === "ios") return ["93%"];
      else if (Platform.OS === "android") return ["93%"];
      else return ["60%"];
    }, []);
    const colorScheme = useColorScheme() ?? 'light'

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
          <View >
            <TouchableOpacity
              onPress={() => {
                hideModal();
              }}
            >
              <TabBarIcon
                fontProvider={Entypo}
                name="chevron-left"
                color={ colorScheme === 'light' ? LIGHT_THEME.contentPrimary : DARK_THEME.contentPrimary}
              />
            </TouchableOpacity>
          </View>
        </View>
      );
    };

    const RenderMotiModals = ({
      screen_type,
      num,
      children,
    }: _IRenderMotiModals) => {
      return (
        <MotiView
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: selectedScreen === screen_type ? 2 : 1,
          }}
          from={{}}
          animate={{
            left: selectedScreen === screen_type ? 0 : num,
            opacity: selectedScreen === screen_type ? 1 : 0,
          }}
          // transition={
          //   {
          //     // type: "timing",
          //     // duration: 100,
          //   } as any
          // }
        >
          {children}
        </MotiView>
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

          {/* SCREENS - LOGIN, SIGNUP AND FORGOT PASSWORD */}
          <View style={{ flex: 1 }}>
            {/* LOGIN */}
            <RenderMotiModals screen_type={AUTH_MODALS.LOGIN} num={-100}>
              <Login setSelectedScreen={setSelectedScreen} callbackUrl={ callbackUrl } />
            </RenderMotiModals>

            {/* SIGN UP */}
            <RenderMotiModals screen_type={AUTH_MODALS.SIGNUP} num={100}>
              <Register
                usertype={usertype}
                setSelectedScreen={setSelectedScreen}
                hideModal={hideModal}
              />
            </RenderMotiModals>

            {/* FORGOT PASSWORD */}
            <RenderMotiModals screen_type={AUTH_MODALS.FORGOT} num={100}>
              <ForgotPassword
                setSelectedScreen={setSelectedScreen}
                hideModal={hideModal}
              />
            </RenderMotiModals>

            {/* Render Add Vehicles */}
            <RenderMotiModals screen_type={AUTH_MODALS.VEHICLES} num={100}>
              <AddVehicle
                setSelectedScreen={setSelectedScreen}
                hideModal={hideModal}
              />
            </RenderMotiModals>

            {/* Render Address */}
            <RenderMotiModals screen_type={AUTH_MODALS.ADDRESS} num={100}>
              <AddAddress
                setSelectedScreen={setSelectedScreen}
                hideModal={hideModal}
              />
            </RenderMotiModals>

            {/* Render Request Reservation */}
            <RenderMotiModals screen_type={AUTH_MODALS.ADDRESS} num={100}>
              <AddAddress
                setSelectedScreen={setSelectedScreen}
                hideModal={hideModal}
              />
            </RenderMotiModals>

            {/* Render Request Reservation */}
            <RenderMotiModals screen_type={AUTH_MODALS.USER_TYPE} num={100}>
              <UserTypeModal
                setSelectedScreen={setSelectedScreen}
                usertype={usertype}
                setUsertype={setUsertype}
              />
            </RenderMotiModals>
          </View>
        </View>
      </BottomSheetModal>
    );
  }
);

export default AuthModal;
