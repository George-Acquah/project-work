import LoadingComponent from "../skeletons/loading";
import { DARK_THEME, LIGHT_THEME } from "@/constants/Colors";
import { useColorScheme } from "@/utils/hooks/useColorScheme";
import React from "react";
import ErrorComponent from "./error";

interface _IRenderer {
  loading: boolean;
  error: string | null;
  children: React.ReactNode;
  loadingComponent?: React.ReactNode;
  color?: string;
  pad?: boolean;
  size?: "xs" | "sm" | "md" | "lg";
  onRetry?: () => void; // Add onRetry prop
}

const RendererHOC = ({
  loading,
  error,
  children,
  loadingComponent,
  color,
  pad,
  size = 'lg',
  onRetry, // Destructure onRetry
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
      <ErrorComponent title={error ?? undefined} onRetry={onRetry} size={ size} /> // Pass onRetry to ErrorComponent
    );
  }

  return <>{!loading && !error && <>{children}</>}</>;
};

export default RendererHOC;
