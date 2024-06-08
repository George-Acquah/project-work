import { keys } from "@/constants/root";
import axios from "axios";
import { useState, useEffect } from "react";
import { load } from "../functions/storage";

const useTokenRotation = () => {
    const [auth, setAuth] = useState<boolean | null>(null);
    const authorization = axios.defaults.headers.common["Authorization"];

    const tokens = async () => {
      return (await load(keys.TOKEN_KEY, "json")) as unknown as _ITokens;
    };

    useEffect(() => {
      const fetchTokens = async () => {
        try {
          const { access_token } = await tokens();
          if (!authorization) {
            if (access_token) {
              axios.defaults.headers.common[
                "Authorization"
              ] = `Bearer ${access_token}`;
              setAuth(true);
            } else {
              setAuth(false);
            }
          } else {
            if (access_token) {
              setAuth(true);
            } else {
              setAuth(false);
            }
          }
        } catch (error) {
          // Handle error occurred during token loading
          setAuth(false);
        }
      };

      fetchTokens();
    }, []);
  
  return { auth }
}

export default useTokenRotation;