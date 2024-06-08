import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/useRedux";
import { removeToast, selectToasts } from "@/features/toast/toast.slice";
import { AntDesign } from "@expo/vector-icons";
import CircularCountdown from "./countdown";

// Define the type for the toast types
type ToastType = "success" | "error" | "info" | "warning";

const Toast: React.FC = () => {
  const toasts = useAppSelector(selectToasts);
  const dispatch = useAppDispatch();

  const handleRemoveToast = (id: string) => {
    dispatch(removeToast(id));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={toasts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ToastItem
            id={item.id}
            message={item.message}
            type={item.type}
            duration={5000} // Toast duration in milliseconds
            onRemove={handleRemoveToast}
          />
        )}
      />
    </View>
  );
};

const ToastItem: React.FC<{
  id: string;
  message: string;
  type: ToastType;
  duration: number;
  onRemove: (id: string) => void;
}> = ({ id, message, type, duration, onRemove }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onRemove]);

  return (
    <View style={[styles.toast, styles[type] as any]}>
      <Text style={styles.message}>{message}</Text>
      <View style={styles.iconContainer}>
        <CircularCountdown
          duration={duration}
          size={30}
          strokeWidth={2}
          color="white"
        />
        <TouchableOpacity onPress={() => onRemove(id)}>
          <AntDesign name="closecircle" size={24} color={"white"} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 40,
    left: 0,
    right: 0,
    zIndex: 9999,
  },
  toast: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  success: {
    backgroundColor: "green",
  },
  error: {
    backgroundColor: "red",
  },
  info: {
    backgroundColor: "blue",
  },
  warning: {
    backgroundColor: "orange",
  },
  message: {
    color: "#fff",
    flex: 1,
  },
  iconContainer: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Toast;
