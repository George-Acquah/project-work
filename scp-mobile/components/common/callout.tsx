import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ViewProps } from "react-native";

interface CalloutProps extends ViewProps {
  message: string;
  type?: "success" | "error" | "warning" | "info";
  onClose?: () => void;
};

const Callout: React.FC<CalloutProps> = ({
  type = "info",
  message,
  onClose,
  style,
}) => {
  const getBackgroundColor = () => {
    switch (type) {
      case "success":
        return styles.successBackground;
      case "error":
        return styles.errorBackground;
      case "warning":
        return styles.warningBackground;
      default:
        return styles.infoBackground;
    }
  };

  return (
    <View style={[styles.container, getBackgroundColor(), style]}>
      <Text style={styles.message}>{message}</Text>
      {onClose && (
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <AntDesign name="closecircle" size={24} color={'white'}/>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  message: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
  },
  closeButton: {
    marginLeft: 10,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  successBackground: {
    backgroundColor: "#28a745",
  },
  errorBackground: {
    backgroundColor: "#dc3545",
  },
  warningBackground: {
    backgroundColor: "#ffc107",
  },
  infoBackground: {
    backgroundColor: "#17a2b8",
  },
});

export default Callout;
