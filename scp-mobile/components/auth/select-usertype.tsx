import { SHARED_COLORS } from "@/constants/Colors";
import { FONTS } from "@/constants/fonts";
import { AUTH_MODALS } from "@/constants/root";
import { SIZES } from "@/constants/styles";
import { ThemedView } from "../common/ThemedView";
import { Dispatch, SetStateAction, useState } from "react";
import Button from "../common/button";
import RendererHOC from "../common/renderer.hoc";
import { ThemedText } from "../common/ThemedText";
import { text_colors } from "./styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { UserType } from "@/utils/enums/global.enum";

interface _IUserType {
  usertype: UserType | null;
  setSelectedScreen: Dispatch<SetStateAction<string>>;
  setUsertype: Dispatch<SetStateAction<UserType | null>>;
}
const UserTypeModal = ({
  usertype,
  setSelectedScreen,
  setUsertype,
}: _IUserType) => {
  const [error, setError] = useState<string | null>(null);
  const handleNext = () => {
    setSelectedScreen(AUTH_MODALS.SIGNUP);
  };

  const renderTitle = () => {
    return (
      <ThemedView>
        {/* TITLE */}
        <ThemedText style={[{ ...FONTS.h2 }]} {...text_colors.title}>
          Welcome Back
        </ThemedText>
        {/* Description */}
        <ThemedText style={[{ ...FONTS.ps2 }]} {...text_colors.description}>
          Select your user type to continue
        </ThemedText>
      </ThemedView>
    );
  };

  const renderUserTypeButtons = () => (
    <ThemedView style={{ margin: 'auto'}}>
      {/* Customer / Driver */}
      <Button
        additionalStyles={{
          borderRadius: 30,
          backgroundColor: SHARED_COLORS.gray900,
          borderColor: SHARED_COLORS.gray500,
          marginTop: SIZES.padding,
        }}
        additionalTextStyles={{
          ...FONTS.l2,
          marginLeft: SIZES.radius,
          color: SHARED_COLORS.gray50,
        }}
        // icon="google"
        // iconColor={SHARED_COLORS.gray50}
        title="Continue as driver"
        type="opacity"
        onPress={() => {
          setUsertype(UserType.CUSTOMER);
          handleNext()
        }}
      />
      {/* Parking Center Owner */}
      <Button
        additionalStyles={{
          borderRadius: 30,
          backgroundColor: SHARED_COLORS.gray900,
          borderColor: SHARED_COLORS.gray500,
          marginTop: SIZES.padding,
        }}
        additionalTextStyles={{
          ...FONTS.l2,
          marginLeft: SIZES.radius,
          color: SHARED_COLORS.gray50,
        }}
        // icon="github"
        // iconColor={SHARED_COLORS.gray50}
        title="Continue as center owner"
        type="opacity"
        onPress={() => {
          setUsertype(UserType.PARK_OWNER);
          handleNext();
        }}
      />
    </ThemedView>
  );

  const renderError = () => (
    <>
      {error && (
        <ThemedView>
          {/* TITLE */}
          <ThemedText style={[{ ...FONTS.l3, marginTop: 10 }]} {...text_colors.error}>
            {error}
          </ThemedText>
          {/* Description */}
        </ThemedView>
      )}
    </>
  );

  const renderFooter = () => {
    return (
      <ThemedView>
        {/* Sign In button */}
        <Button
          additionalStyles={{
            borderRadius: 10,
            marginTop: SIZES.padding * 1.5,
          }}
          additionalTextStyles={{
            ...FONTS.l2,
            color: SHARED_COLORS.gray50,
          }}
          type="opacity"
          onPress={() => {
            if (usertype !== null) {
              setSelectedScreen(AUTH_MODALS.SIGNUP)
            } else {
              setError('Please select your type of user before proceeding to signup.')
            }
          }}
        >
          <RendererHOC
            loading={false}
            error={null}
            color={SHARED_COLORS.gray50}
            pad
          >
            <ThemedText style={{ ...FONTS.pr2 }} {...text_colors.title}>
              Proceed with Sign Up
            </ThemedText>
          </RendererHOC>
        </Button>
      </ThemedView>
    );
  };
  return (
    <ThemedView style={{ flex: 1}}>
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps={"handled"}
        extraScrollHeight={250}
        contentContainerStyle={{
          flexGrow: 1,
          marginTop: SIZES.radius,
        }}
      >
        {/* Title And Descriptions */}
        {renderTitle()}

        {/* Form Inputs */}
        <RendererHOC
          loading={false}
          error={null}
          color={SHARED_COLORS.gray50}
          pad
        >
          {renderUserTypeButtons()}
        </RendererHOC>

        {/* Render Error */}
        {renderError()}
      </KeyboardAwareScrollView>
      {/* Render Footer */}
      {renderFooter()}
    </ThemedView>
  );
};
export default UserTypeModal;
