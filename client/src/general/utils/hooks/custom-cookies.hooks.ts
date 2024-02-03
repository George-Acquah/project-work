import { clientCookiesKeys } from "@/app/lib/constants";
import { getCookie, setCookie } from "cookies-next";
import { useEffect, useCallback } from "react";

const isServer = typeof window === "undefined";
function useCookies(key: string, value?: any, fallback?: string) {
  const getCookiesValue = () => {
    if (isServer) return undefined;
    let cookiesVal;
    try {
      cookiesVal = getCookie(key) || undefined;
    } catch (e) {
      // Unsupported
    }
    return cookiesVal || fallback;
  };

  const setCookieValue = useCallback(() => {
    try {
      setCookie(key, value);
    } catch (error) {}
  }, [value]);
  useEffect(() => {
    setCookieValue();
  }, [setCookieValue]);

  return { getCookiesValue };
}

function useListValue(value: string, fallback?: string) {
  const getListValue = () => {
    if (isServer) return undefined;
    let listVal;
    try {
      listVal = getCookie(clientCookiesKeys.LIST_VAL) || undefined;
    } catch (e) {
      // Unsupported
    }
    return listVal || fallback;
  };

  const setListValue = useCallback(() => {
    try {
      setCookie(clientCookiesKeys.LIST_VAL, value);
    } catch (error) {
    }
  }, [value]);
  useEffect(() => {
    setListValue();
  }, [setListValue]);

  return { getListValue };
}

export { useListValue, useCookies };
