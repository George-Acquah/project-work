import { keys } from "@/constants/root";
import { loadSync } from "@/utils/functions/storage";
import axios from "axios";
import { Redirect } from "expo-router";
import React from "react";
import { useEffect, useState } from "react";

const Index = () => {
  const [auth, setAuth] = useState(false);
  const tokens = loadSync(keys.TOKEN_KEY, "json") as unknown as _ITokens;

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        if (tokens && tokens.access_token) {
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${tokens.access_token}`;
          setAuth(true);
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
  return auth ? <Redirect href="/onboarding" /> : <Redirect href="/welcome" />;
};

export default Index;
