import { text_colors } from "@/components/auth/styles";
import { ThemedText } from "@/components/common/ThemedText";
import { keys } from "@/constants/root";
import { refreshTokens } from "@/features/auth/auth.slice";
import { getExpiry, isTokenExpired } from "@/utils/functions/shared";
import { load } from "@/utils/functions/storage";
import { useAppDispatch } from "@/utils/hooks/useRedux";
import axios from "axios";
import { Redirect } from "expo-router";
import React, { useState } from "react";
import { useEffect } from "react";

const Index = () => {
  const [auth, setAuth] = useState<boolean | null>(null);
  const dispatch = useAppDispatch();

  const tokens = async () => {
    return await load(keys.TOKEN_KEY, "json") as unknown as _ITokens;
  }

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        if (isTokenExpired(await getExpiry(keys.EXP))) {
          dispatch(refreshTokens());
          setAuth(true);
        } else {
          const { access_token } = await tokens();
          if (access_token) {
            axios.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${access_token}`;
            setAuth(true);
          }
        }
      } catch (error) {
        // Handle error occurred during token loading
        console.error("Error loading tokens:", error);
        setAuth(false);
      }
    };

    fetchTokens();
  }, []);

  // Render loading state while waiting for auth status to be determined
  if (auth === null) {
    return (
      <ThemedText style={{ textAlign: "center" }} {...text_colors.title}>
        Loading...
      </ThemedText>
    );
  }

  // Render based on auth status
  return auth ? <Redirect href="/onboarding" /> : <Redirect href="/welcome" />;
};

export default Index;
