import React, { useRef, useState } from "react";
import { TextInput, StyleSheet, Alert, View as RNView } from "react-native";
import { ThemedView as View } from "@/components/common/ThemedView";
import { ThemedText as Text } from "@/components/common/ThemedText";
import { useColorScheme } from "@/utils/hooks/useColorScheme";
import { FONTS } from "@/constants/fonts";
import { SHARED_COLORS } from "@/constants/Colors";
import {
  Entypo,
  FontAwesome,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { router } from "expo-router";
import { bg_colors, text_colors } from "@/components/auth/styles";
import Button from "@/components/common/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { SIZES, height } from "@/constants/styles";
import FormInputs from "@/components/common/input-form";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import RendererHOC from "@/components/common/renderer.hoc";
import DPImage from "@/components/navigation/profile/image-dp";
import BottomSheet from "@gorhom/bottom-sheet";
import DetachedModal from "@/components/common/detached-modal";
import useImageManager from "@/utils/hooks/images.hook";
import { BASE_URL } from "@/api/root";
import { keys } from "@/constants/root";
import useStorageHook from "@/utils/hooks/storage.hooks";
import * as FileSystem from "expo-file-system";
import AccountSchema from "@/schemas/user.schema";

interface _IManageAccount {
  data: _IVerifyUser;
  loading?: boolean;
}
const ManageAccount = ({ data }: _IManageAccount) => {
  const colorScheme = useColorScheme() ?? "light";
  // Image Manager Hook
  const { selectImage } = useImageManager();
  console.log(data.phone_number);

  // Refs
  const firstNameRef = useRef<TextInput>(null);
  const lastNameRef = useRef<TextInput>(null);
  const phoneNumberRef = useRef<TextInput>(null);
  const stateRef = useRef<TextInput>(null);
  const areaRef = useRef<TextInput>(null);
  const pincodeRef = useRef<TextInput>(null);
  const galleryOptionsRef = useRef<BottomSheet>(null);

  //States
  const [headerHeight, setHeaderHeight] = useState(0);
  const [userDp, setUserDp] = useState(
    data.user_image ?? "https://randomuser.me/api/portraits/men/1.jpg"
  ); // Default image
  const [updateLoading, setLoading] = useState(false);

  //Caluculate height
  const calc_height = height - headerHeight;

  //Use Forms
  const ManageAccountSchema = AccountSchema;
  const { control, handleSubmit } = useForm({
    defaultValues: {
      first_name: data?.first_name,
      last_name: data?.last_name,
      phone_number: data?.phone_number,
      state: data?.state,
      area: data?.area,
      pincode: data?.pincode,
    },
    resolver: zodResolver(ManageAccountSchema),
  });

  // ... other imports and state declarations

  const { load, storageError } = useStorageHook();

  const updateUser = async (payload: _IAccount) => {
    try {
      setLoading(true);
      // Load tokens from storage
      const tokens = (await load<_ITokens>(
        keys.TOKEN_KEY,
        "json"
      )) as unknown as _ITokens;

      const response = await FileSystem.uploadAsync(
        `${BASE_URL}/users/${data._id}/update?email=${data.email}`,
        userDp,
        {
          httpMethod: "PUT",
          uploadType: FileSystem.FileSystemUploadType.MULTIPART,
          parameters: {
            firstName: payload.first_name ?? "",
            lastName: payload.last_name ?? "",
            contactNo: payload?.phone_number ?? "",
            state: payload.state ?? "",
            area: payload.area ?? "",
            pincode: payload.pincode ?? "",
          },
          fieldName: "files",
          headers: {
            Authorization: `Bearer ${tokens.access_token}`,
          },
        }
      );

      console.log(JSON.stringify(response, null, 4));
    } catch (error) {
      console.log("An unexpected error occured: ", error);
      console.log("storage error: ", storageError);
    } finally {
      setLoading(false);
    }
  };

  //Functions
  const handleImageSelection = async (useLibrary: boolean) => {
    const result = await selectImage(useLibrary);
    if (result) {
      setUserDp(result); // Update profile picture
    }
  };

  const handleBackPress = () => {
    router.back(); // Navigate back to the previous screen
  };

  const renderGalleryOptions = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          flex: 1,
        }}
      >
        <View style={[styles.gallery_options]}>
          <Button>
            <TabBarIcon
              fontProvider={Entypo}
              name="camera"
              color="white"
              onPress={() => {
                console.log("pressed camera");
                handleImageSelection(false); // Select from gallery
                galleryOptionsRef.current?.close(); // Close the bottom sheet modal
              }}
            />
          </Button>
          <Text style={{ ...FONTS.ps3 }} {...text_colors.title}>
            Camera
          </Text>
        </View>
        <View style={[styles.gallery_options]}>
          <Button>
            <TabBarIcon
              fontProvider={MaterialIcons}
              name="photo-library"
              color="white"
              onPress={() => {
                console.log("pressed photos");
                handleImageSelection(true); // Take a photo
                galleryOptionsRef.current?.close(); // Close the bottom sheet modal
              }}
            />
          </Button>
          <Text style={{ ...FONTS.ps3 }} {...text_colors.title}>
            Gallery
          </Text>
        </View>
        <View style={[styles.gallery_options]}>
          <Button>
            <TabBarIcon
              fontProvider={Entypo}
              name="trash"
              color="white"
              onPress={() => {
                console.log("pressed remove");
                setUserDp("https://randomuser.me/api/portraits/men/1.jpg"); // Reset to default image
                galleryOptionsRef.current?.close(); // Close the bottom sheet modal
              }}
            />
          </Button>
          <Text style={{ ...FONTS.ps3 }} {...text_colors.title}>
            Remove
          </Text>
        </View>
      </View>
    );
  };

  const renderHeader = () => (
    <View
      style={styles.headerContainer}
      onLayout={(event) => {
        const { height } = event.nativeEvent.layout;
        console.log(height);
        setHeaderHeight(height);
      }}
    >
      <View style={{ position: "relative" }}>
        <DPImage size={120} uri={userDp} />
        <Button
          additionalStyles={{
            borderRadius: 30,
            position: "absolute",
            bottom: -10,
            right: 5,
            borderColor: SHARED_COLORS.positive200,
          }}
        >
          <Entypo
            name="images"
            color="white"
            size={20}
            onPress={() => {
              galleryOptionsRef.current?.expand(); // Open the bottom sheet modal
            }}
          />
        </Button>
      </View>
      <Text style={[styles.username]} {...text_colors.title}>
        George Acquah
      </Text>
    </View>
  );

  const renderInputs = () => (
    <View
      style={{
        paddingHorizontal: SIZES.padding * 0.3,
      }}
    >
      {/* Personal Details */}
      <Text
        style={{ ...FONTS.b1, paddingHorizontal: SIZES.padding * 0.1 }}
        {...text_colors.title}
      >
        Personal Details
      </Text>
      <View
        style={{
          paddingHorizontal: SIZES.padding * 0.8,
          marginTop: 2,
          marginBottom: SIZES.padding,
          borderRadius: 10,
        }}
        {...bg_colors.main}
      >
        {/* First Name */}
        <FormInputs
          ref={firstNameRef}
          control={control as any}
          name="first_name"
          rootContainerStyles={{ marginTop: SIZES.padding * 0.8 }}
          label="First Name"
          keyboardType="default"
          placeholder="George"
          prependComponent={
            <TabBarIcon
              fontProvider={FontAwesome}
              name="user"
              color={colorScheme === "light" ? SHARED_COLORS.gray900 : "white"}
              size={24}
              style={{ marginRight: SIZES.base }}
            />
          }
        />
        {/* Last Name */}
        <FormInputs
          ref={lastNameRef}
          control={control as any}
          name="last_name"
          rootContainerStyles={{ marginTop: SIZES.padding * 0.5 }}
          label="Last Name"
          placeholder="Acquah"
          prependComponent={
            <TabBarIcon
              fontProvider={FontAwesome}
              name="user"
              color={colorScheme === "light" ? SHARED_COLORS.gray900 : "white"}
              size={24}
              style={{ marginRight: SIZES.base }}
            />
          }
        />

        {/* Phone Number */}
        <FormInputs
          ref={phoneNumberRef}
          control={control as any}
          name="phone_number"
          rootContainerStyles={{
            marginTop: SIZES.padding * 0.5,
            marginBottom: SIZES.padding,
          }}
          label="Phone Number"
          placeholder="0210000000"
          prependComponent={
            <TabBarIcon
              fontProvider={FontAwesome}
              name="mobile-phone"
              color={colorScheme === "light" ? SHARED_COLORS.gray900 : "white"}
              size={24}
              style={{ marginRight: SIZES.base }}
            />
          }
        />
      </View>

      {/* Location Details */}
      <Text
        style={{ ...FONTS.b1, paddingHorizontal: SIZES.padding * 0.1 }}
        {...text_colors.title}
      >
        Location Details
      </Text>
      <View
        style={{
          paddingHorizontal: SIZES.padding * 0.8,
          borderRadius: 10,
        }}
        {...bg_colors.main}
      >
        {/* State */}
        <FormInputs
          ref={stateRef}
          control={control as any}
          name="state"
          rootContainerStyles={{ marginTop: SIZES.padding * 0.5 }}
          label="State/Region"
          placeholder="Central"
          prependComponent={
            <TabBarIcon
              fontProvider={MaterialIcons}
              name="location-city"
              color={colorScheme === "light" ? SHARED_COLORS.gray900 : "white"}
              size={24}
              style={{ marginRight: SIZES.base }}
            />
          }
        />
        {/* Area */}
        <FormInputs
          ref={areaRef}
          control={control as any}
          name="area"
          rootContainerStyles={{ marginTop: SIZES.padding * 0.5 }}
          label="Area/Town"
          placeholder="Elmina"
          prependComponent={
            <TabBarIcon
              fontProvider={MaterialIcons}
              name="holiday-village"
              color={colorScheme === "light" ? SHARED_COLORS.gray900 : "white"}
              size={24}
              style={{ marginRight: SIZES.base }}
            />
          }
        />
        {/* Pin Code */}
        <FormInputs
          ref={pincodeRef}
          control={control as any}
          name="pincode"
          rootContainerStyles={{
            marginTop: SIZES.padding * 0.5,
            marginBottom: SIZES.padding,
          }}
          label="Pincode"
          placeholder="Enter Pincode here"
          prependComponent={
            <TabBarIcon
              fontProvider={MaterialIcons}
              name="fax"
              color={colorScheme === "light" ? SHARED_COLORS.gray900 : "white"}
              size={24}
              style={{ marginRight: SIZES.base }}
            />
          }
        />
      </View>
    </View>
  );

  const renderFooter = () => {
    return (
      <RNView
        style={{
          marginHorizontal: SIZES.padding,
          paddingBottom: SIZES.padding * 0.6,
          backgroundColor: "transparent",
        }}
      >
        {/* Save Changes */}
        <Button
          additionalStyles={{
            borderRadius: 10,
          }}
          additionalTextStyles={{
            ...FONTS.l2,
            color: SHARED_COLORS.gray50,
          }}
          type="opacity"
          onPress={handleSubmit(updateUser)}
        >
          <RendererHOC
            loading={updateLoading}
            error={null}
            color={SHARED_COLORS.gray50}
            pad
          >
            <Text style={{ ...FONTS.pr2 }} {...text_colors.main_title}>
              Save Changes
            </Text>
          </RendererHOC>
        </Button>
      </RNView>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps={"handled"}
        extraScrollHeight={150}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: SIZES.padding,
        }}
      >
        {/* Render Header */}
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingTop: SIZES.padding,
          }}
        >
          {/* {renderHeader()} */}
          <Text style={{ ...FONTS.b1 }} {...text_colors.title}>
            Your Profile
          </Text>
          <Ionicons
            name="arrow-back"
            size={22}
            color={colorScheme === "light" ? SHARED_COLORS.gray800 : "white"}
            onPress={handleBackPress}
            style={styles.backIcon}
          />
        </View>

        {/* Render Header */}
        {renderHeader()}

        {/* Form Inputs */}
        {renderInputs()}
      </KeyboardAwareScrollView>
      {/* Render Footer */}
      {renderFooter()}
      <DetachedModal
        ref={galleryOptionsRef}
        height={calc_height}
        style={{
          marginHorizontal: 50,
          borderRadius: SIZES.radius * 1.5,
        }}
        backgroundStyle={{
          backgroundColor:
            colorScheme === "light"
              ? SHARED_COLORS.gray200
              : SHARED_COLORS.gray700,
        }}
      >
        {renderGalleryOptions()}
      </DetachedModal>
    </View>
  );
};

const styles = StyleSheet.create({
  backIcon: {
    position: "absolute",
    left: 20,
    top: 32,
  },
  content: {
    flex: 1,
  },
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  username: {
    ...FONTS.h1,
    marginTop: 10,
  },
  gallery_options: {
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
  },
});

export default ManageAccount;
