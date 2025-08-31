import React, { useState } from "react";
import { WebView } from "react-native-webview";
import Constants from "expo-constants";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import RendererHOC from "@/components/common/renderer.hoc";
import { LIGHT_THEME } from "@/constants/Colors";
import { ThemedText } from "@/components/common/ThemedText";
import Button from "@/components/common/button";

interface _IHubtelWebviewParams {
  [key: string]: string;
  checkoutUrl: string;
}

export default function HubtelWebview() {
  const { checkoutUrl = "" } = useLocalSearchParams<_IHubtelWebviewParams>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoadEnd = () => {
    setLoading(false);
    setError(false);
  };

  const handleLoadError = () => {
    setLoading(false);
    setError(true);
  };

  const handleReload = () => {
    setLoading(true);
    setError(false);
  };

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            animating
            size="large"
            color={LIGHT_THEME.primary800}
          />
        </View>
      )}
      {error ? (
        <View style={styles.errorContainer}>
          <ThemedText style={styles.errorMessage}>
            Failed to load the page.
          </ThemedText>
          <Button title="Try Again" onPress={handleReload} />
        </View>
      ) : (
        <WebView
          style={{ flex: 1 }}
          source={{ uri: checkoutUrl }}
          onLoadEnd={handleLoadEnd}
          onError={handleLoadError}
          onHttpError={handleLoadError}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
    zIndex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
  },
  errorMessage: {
    marginBottom: 10,
    color: "red",
    textAlign: "center",
  },
});
