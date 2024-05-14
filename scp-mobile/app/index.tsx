import { keys } from "@/constants/root";
import { load } from "@/utils/functions/storage";
import axios from "axios";
import { Redirect } from "expo-router";
import React from "react";
import { useEffect, useState } from "react";

const Index = () => {
  const [auth, setAuth] = useState(false);
  console.log("Hello");

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const tokens = (await load<_ITokens>(
          keys.TOKEN_KEY,
          "json"
        )) as unknown as _ITokens;
        if (tokens && tokens.access_token) {
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${tokens.access_token}`;
          setAuth(true);
        } else {
          // Handle case where tokens are missing or invalid
          console.error("Invalid tokens:", tokens);
        }
      } catch (error) {
        // Handle error occurred during token loading
        console.error("Error loading tokens:", error);
      }
    };

    fetchTokens();
  }, []);

  // Render loading state while waiting for auth status to be determined
  if (auth === null) {
    return <div>Loading...</div>;
  }

  // Render based on auth status
  return auth ? (
    <Redirect href="/(auth)/welcome" />
  ) : (
    <Redirect href="/(auth)/welcome" />
  );
};

export default Index;
