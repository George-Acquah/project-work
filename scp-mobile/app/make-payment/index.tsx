// import { requestMoney } from "@/api/payment";
// import React, { useState } from "react";
// import { View, Text, TextInput, Button, Alert } from "react-native";

// export default function PaymentScreen() {
//   const [mobileNumber, setMobileNumber] = useState("");
//   const [amount, setAmount] = useState("");
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [clientReference, setClientReference] = useState("");

//   const handlePaymentRequest = async () => {
//     try {
//       const data = await requestMoney({
//         mobileNumber,
//         amount: parseFloat(amount),
//         title,
//         description,
//         clientReference,
//         callbackUrl: "https://admin-scp.vercel.app", // Replace with your actual URLs
//         returnUrl: "https://admin-scp.vercel.app",
//         cancellationUrl: "https://admin-scp.vercel.app",
//         logo: "https://admin-scp.vercel.app",
//       });

//       Alert.alert(
//         "Payment Requested",
//         `Pay using this link: ${data?.paylinkUrl}`
//       );
//     } catch (error) {
//       Alert.alert("Error", "Failed to request payment");
//     }
//   };

//   return (
//     <View style={{ padding: 20 }}>
//       <Text>Mobile Number:</Text>
//       <TextInput
//         value={mobileNumber}
//         onChangeText={setMobileNumber}
//         placeholder="Enter mobile number"
//         keyboardType="phone-pad"
//         style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
//       />

//       <Text>Amount:</Text>
//       <TextInput
//         value={amount}
//         onChangeText={setAmount}
//         placeholder="Enter amount"
//         keyboardType="numeric"
//         style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
//       />

//       <Text>Title:</Text>
//       <TextInput
//         value={title}
//         onChangeText={setTitle}
//         placeholder="Enter title"
//         style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
//       />

//       <Text>Description:</Text>
//       <TextInput
//         value={description}
//         onChangeText={setDescription}
//         placeholder="Enter description"
//         style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
//       />

//       <Text>Client Reference:</Text>
//       <TextInput
//         value={clientReference}
//         onChangeText={setClientReference}
//         placeholder="Enter client reference"
//         style={{ borderWidth: 1, padding: 10, marginBottom: 20 }}
//       />

//       <Button title="Request Payment" onPress={handlePaymentRequest} />
//     </View>
//   );
// }


import { ThemedView, ThemedView as View } from "@/components/common/ThemedView";
import { ThemedText as Text, ThemedText } from "@/components/common/ThemedText";
import { FONTS } from "@/constants/fonts";
import { TextInput, TouchableOpacity, Alert } from "react-native";
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
import { requestMoney } from "@/api/payment";

const PaymentScreen = () => {
  const colorScheme = useColorScheme() ?? "light";
  const phoneNumberRef = useRef<TextInput>(null);
  const amountRef = useRef<TextInput>(null);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      phone_number: "",
      amount: 0,
    },
    resolver: zodResolver(PaymentSchema),
  });

  const handlePayment = async (data: any) => {
    try {
      console.log('data');
      console.log(data);
      const { phone_number, amount, client_reference } = data;

      // const req_data = await requestMoney({
      //   phone_number,
      //   amount: parseFloat(amount),
      //   // title,
      //   callbackUrl: "https://admin-scp.vercel.app", // Replace with your actual URLs
      //   returnUrl: "https://admin-scp.vercel.app",
      //   cancellationUrl: "https://admin-scp.vercel.app",
      //   logo: "https://admin-scp.vercel.app",
      // });

      Alert.alert(
        "Payment Requested",
        `Pay using this link: `
      );

      // onPaymentSuccess(); // Call on success
    } catch (error: any) {
      Alert.alert("Payment failed", error.message);
    }
  };

  const renderFormInputs = () => (
    <>
      {/* Phone Number */}
      <FormInputs
        ref={phoneNumberRef}
        control={control as any}
        name="phone_number"
        rootContainerStyles={{ marginTop: SIZES.padding }}
        label="Phone Number"
        placeholder="Enter phone number"
        prependComponent={
          <FontAwesome
            name="mobile-phone"
            color={colorScheme === "light" ? SHARED_COLORS.gray900 : "white"}
            size={34}
            style={{ marginRight: SIZES.base }}
          />
        }
      />
      {/* Amount */}
      <FormInputs
        ref={amountRef}
        control={control as any}
        name="amount"
        rootContainerStyles={{ marginTop: SIZES.padding }}
        label="Amount"
        inputMode="numeric"
        placeholder="Enter amount"
        prependComponent={
          // <FontAwesome
          //   name="dollar"
          //   color={colorScheme === "light" ? SHARED_COLORS.gray900 : "white"}
          //   size={24}
          //   style={{ marginRight: SIZES.base }}
          // />
          <ThemedView style={{ borderRightColor: SHARED_COLORS.gray600, borderRightWidth: 2 }}>
            <ThemedText style={{ color: SHARED_COLORS.gray600 }}>
              GHC
            </ThemedText>
          </ThemedView>
        }
      />
    </>
  );

  return (
    <View style={{ flex: 1 }}>
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
        {/* Render Form Inputs */}
        {renderFormInputs()}
      </KeyboardAwareScrollView>
      {/* Submit Button */}
      <Button
        additionalStyles={{
          borderRadius: SIZES.radius,
          marginTop: SIZES.padding,
          marginLeft: SIZES.base,
        }}
        additionalTextStyles={{
          ...FONTS.l2,
          color: SHARED_COLORS.gray50,
        }}
        type="opacity"
        onPress={handleSubmit(handlePayment)}
      >
        <Text style={{ ...FONTS.pr2 }} {...text_colors.main_title}>
          Make Payment
        </Text>
      </Button>
    </View>
  );
};

export default PaymentScreen;
