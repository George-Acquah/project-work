import { requestMoney } from "@/api/payment";
import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";

export default function PaymentScreen() {
  const [mobileNumber, setMobileNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [clientReference, setClientReference] = useState("");

  const handlePaymentRequest = async () => {
    try {
      const data = await requestMoney({
        mobileNumber,
        amount: parseFloat(amount),
        title,
        description,
        clientReference,
        callbackUrl: "https://admin-scp.vercel.app", // Replace with your actual URLs
        returnUrl: "https://admin-scp.vercel.app",
        cancellationUrl: "https://admin-scp.vercel.app",
        logo: "https://admin-scp.vercel.app",
      });

      Alert.alert(
        "Payment Requested",
        `Pay using this link: ${data?.paylinkUrl}`
      );
    } catch (error) {
      Alert.alert("Error", "Failed to request payment");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Mobile Number:</Text>
      <TextInput
        value={mobileNumber}
        onChangeText={setMobileNumber}
        placeholder="Enter mobile number"
        keyboardType="phone-pad"
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />

      <Text>Amount:</Text>
      <TextInput
        value={amount}
        onChangeText={setAmount}
        placeholder="Enter amount"
        keyboardType="numeric"
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />

      <Text>Title:</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Enter title"
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />

      <Text>Description:</Text>
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Enter description"
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />

      <Text>Client Reference:</Text>
      <TextInput
        value={clientReference}
        onChangeText={setClientReference}
        placeholder="Enter client reference"
        style={{ borderWidth: 1, padding: 10, marginBottom: 20 }}
      />

      <Button title="Request Payment" onPress={handlePaymentRequest} />
    </View>
  );
}
