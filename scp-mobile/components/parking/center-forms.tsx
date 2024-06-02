import { useRef, useState } from "react";
import { ThemedView } from "../common/ThemedView";
import { ThemedText } from "../common/ThemedText";
import { useColorScheme } from "@/utils/hooks/useColorScheme";
import { generateParkingCenterStyles } from "./style";
import { bg_colors, text_colors } from "../auth/styles";
import SearchBox from "../navigation/shared/search-box";
import { EAutoComplete } from "@/utils/enums/auto-complete";
import { TextInput } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FieldValues } from "react-hook-form";
import ParkingCenterSchema from "@/schemas/center.schema";
import { SHARED_COLORS } from "@/constants/Colors";
import { SIZES } from "@/constants/styles";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import FormInputs from "../common/input-form";
import { TabBarIcon } from "../navigation/TabBarIcon";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { FONTS } from "@/constants/fonts";

const ParkingCenterForm = ({ center }: { center?: _IParkingCenter }) => {
  //Color Scheme
  const colorScheme = useColorScheme() ?? "light";

  //Generate Styles
  const styles = generateParkingCenterStyles(colorScheme);

  //States
  const [address, setAddress] = useState(center ? center.center_address?.state : null);
  const [latitude, setLatitude] = useState(
    center ? center.center_address?.latitude : null
  );
  const [longitude, setLongitude] = useState(
    center ? center.center_address?.longitude : null
  );
  const condition = address && latitude && longitude;

  //Refs
  const centerNameRef = useRef<TextInput>(null);
  const descriptionRef = useRef<TextInput>(null);

  //Address Refs
  const addressRef = useRef<TextInput>(null);
  const latitudeRef = useRef<TextInput>(null);
  const longitudeRef = useRef<TextInput>(null);

  const addCenterSchema = ParkingCenterSchema;
  const { control, handleSubmit } = useForm<FieldValues>({
    defaultValues: {
      center_name: center ? center.center_name : "",
      description: center ? center.center_name : "",
      address: center ? center.center_name : "",
      latitude: center ? center.center_address?.latitude : 0,
      longitude: center ? center.center_address?.longitude : 0,
    },
    resolver: zodResolver(addCenterSchema),
  });

  const renderHeader = () => (
    <ThemedView style={{ marginHorizontal: SIZES.padding, marginTop: 20 }}>
      <ThemedText style={[styles.addCenterTitle]} {...text_colors.title}>
        {center
          ? `Editing ${center.center_address?.state}`
          : "Add a New Center"}
      </ThemedText>
    </ThemedView>
  );

    const renderFormInputs = () => (
      <ThemedView style={{ paddingHorizontal: SIZES.padding * 0.3 }}>
        {/* Basic */}
        <ThemedText
          style={{ ...FONTS.b1, paddingHorizontal: SIZES.padding * 0.1 }}
          {...text_colors.title}
        >
          Basic Details
        </ThemedText>
        <ThemedView
          style={{
            paddingHorizontal: SIZES.padding * 0.8,
            marginTop: 2,
            marginBottom: SIZES.padding,
            borderRadius: 10,
          }}
          {...bg_colors.main}
        >
          {/* Phone Number */}
          <FormInputs
            ref={centerNameRef}
            control={control}
            name="center_name"
            rootContainerStyles={{ marginTop: SIZES.padding }}
            label="Center Name"
            placeholder="Enter the name of your center"
            prependComponent={
              <TabBarIcon
                fontProvider={MaterialIcons}
                name="local-parking"
                color={
                  colorScheme === "light" ? SHARED_COLORS.gray900 : "white"
                }
                size={34}
                style={{ marginRight: SIZES.base }}
              />
            }
          />
          {/* Email */}
          <FormInputs
            ref={descriptionRef}
            control={control}
            name="description"
            rootContainerStyles={{
              marginTop: SIZES.padding * 0.5,
              marginBottom: SIZES.padding,
            }}
            label="Description"
            placeholder="Describe your parking center"
            prependComponent={
              <TabBarIcon
                fontProvider={MaterialIcons}
                name="description"
                color={
                  colorScheme === "light" ? SHARED_COLORS.gray900 : "white"
                }
                size={24}
                style={{ marginRight: SIZES.base }}
              />
            }
          />
        </ThemedView>
        {/* Address Fields */}
        <ThemedText
          style={{ ...FONTS.b1, paddingHorizontal: SIZES.padding * 0.1 }}
          {...text_colors.title}
        >
          Address Details
        </ThemedText>
        <ThemedView
          style={{ paddingHorizontal: SIZES.padding * 0.1, flex: 1, marginBottom: 10 }}
        >
          <SearchBox
            placeholder="Search for your address"
            type={EAutoComplete.CENTER}
            disableScroll
          />
        </ThemedView>
        <ThemedView
          style={{
            paddingHorizontal: SIZES.padding * 0.8,
            marginTop: 2,
            marginBottom: SIZES.padding,
            borderRadius: 10,
          }}
          {...bg_colors.main}
        >
          <ThemedView></ThemedView>
          {/* Address */}
          <FormInputs
            ref={addressRef}
            control={control}
            name="address"
            rootContainerStyles={{ marginTop: SIZES.padding }}
            label="Address"
            placeholder="Search for your address"
            prependComponent={
              <TabBarIcon
                fontProvider={Entypo}
                name="address"
                color={
                  colorScheme === "light" ? SHARED_COLORS.gray900 : "white"
                }
                size={24}
                style={{ marginRight: SIZES.base }}
              />
            }
          />

          {/* Latitude */}
          <FormInputs
            ref={latitudeRef}
            control={control}
            name="latitude"
            rootContainerStyles={{ marginTop: SIZES.padding }}
            label="Latitude"
            placeholder="Search for your address"
            prependComponent={
              <TabBarIcon
                fontProvider={MaterialIcons}
                name="description"
                color={
                  colorScheme === "light" ? SHARED_COLORS.gray900 : "white"
                }
                size={24}
                style={{ marginRight: SIZES.base }}
              />
            }
          />

          {/* Longitude */}
          <FormInputs
            ref={longitudeRef}
            control={control}
            name="longitude"
            rootContainerStyles={{
              marginTop: SIZES.padding * 0.5,
              marginBottom: SIZES.padding,
            }}
            label="Longitude"
            placeholder="Search for your address"
            prependComponent={
              <TabBarIcon
                fontProvider={MaterialIcons}
                name="description"
                color={
                  colorScheme === "light" ? SHARED_COLORS.gray900 : "white"
                }
                size={24}
                style={{ marginRight: SIZES.base }}
              />
            }
          />
        </ThemedView>
      </ThemedView>
    );

  setTimeout(() => {
    setAddress("hello");
    setLatitude(45.5);
    setLongitude(-2.98);
  }, 5000); // TODO to be deleted, was just for testing 😀😀
  
  return (
    <ThemedView>
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps={"handled"}
        extraScrollHeight={250}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          marginTop: SIZES.radius,
        }}
      >
        {/* Header */}
        {renderHeader()}

        {/* Conditional Rendering */}
        {condition && (
          <ThemedView>
            <ThemedText style={[styles.addCenterTitle]} {...text_colors.title}>
              Center Image
            </ThemedText>
            {/* Render Dynamic Center Images Here. If center then its an update else its an add */}

            
            {renderFormInputs()}
          </ThemedView>
        )}
      </KeyboardAwareScrollView>
    </ThemedView>
  );
};

export default ParkingCenterForm;
