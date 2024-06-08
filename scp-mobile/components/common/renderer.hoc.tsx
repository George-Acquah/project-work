import { Text } from "react-native";
import LoadingComponent from "../skeletons/loading";
import { DARK_THEME, LIGHT_THEME } from "@/constants/Colors";
import { useColorScheme } from "@/utils/hooks/useColorScheme";
import React from "react";

interface _IRenderer {
  loading: boolean;
  error: string | null;
  children: React.ReactNode;
  loadingComponent?: React.ReactNode;
  color?: string;
  pad?: boolean;
}

const RendererHOC = ({
  loading,
  error,
  children,
  loadingComponent,
  color,
  pad,
}: _IRenderer) => {
  const colorScheme = useColorScheme();
  if (loading) {
    return (
      <>
        {loadingComponent ? (
          loadingComponent
        ) : (
          <LoadingComponent
            color={
              color
                ? color
                : colorScheme === "light"
                ? LIGHT_THEME.primary500
                : DARK_THEME.primary500
            }
            styles={{}}
            pad={pad && pad}
          />
        )}
      </>
    );
  }

  if (error) {
    return (
      <Text
        style={{
          color: color
            ? color
            : colorScheme === "light"
            ? LIGHT_THEME.contentPrimary
            : DARK_THEME.contentPrimary,
        }}
      >
        Something Went Wrong
      </Text>
    );
  }
  return <>{!loading && !error && <>{children}</>}</>;
};

export default RendererHOC;
