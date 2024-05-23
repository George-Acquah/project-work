import { keys } from "@/constants/root";
import { refreshTokens } from "@/features/auth/auth.slice";
import axios from "axios";
import { useState, useEffect } from "react";
import { isTokenExpired, getExpiry } from "../functions/shared";
import { load } from "../functions/storage";
import { useAppDispatch } from "./useRedux";

const useTokenRotation = () => {
    const [auth, setAuth] = useState<boolean | null>(null);
    const dispatch = useAppDispatch();

    const tokens = async () => {
      return (await load(keys.TOKEN_KEY, "json")) as unknown as _ITokens;
    };

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
          setAuth(false);
        }
      };

      fetchTokens();
    }, []);
  
  return { auth }
}

export default useTokenRotation;