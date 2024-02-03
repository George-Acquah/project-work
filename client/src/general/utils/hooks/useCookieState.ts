import { getCookie, setCookie } from "cookies-next";
import { useState, useEffect } from "react";

export function useLocalState<S = undefined>(key: string, initial: S) {
  const [value, setValue] = useState<S>(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const saved = window.localStorage.getItem(key);
      if (saved) {
        return JSON.parse(saved);
      }
    }
    return initial;
  });

  useEffect(() => {
    if (window.localStorage) {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  }, [value]);

  return [value, setValue] as [typeof value, typeof setValue];
}

export function useCookieState<S = undefined>(key: string, initial: S) {
  const [value, setValue] = useState<S>(() => {
    if (typeof window !== "undefined") {
      const cookieItem = getCookie(key);
      if (cookieItem) {
        return JSON.parse(cookieItem);
      }
    }
    return initial;
  });

  useEffect(() => {
    setCookie(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue] as [typeof value, typeof setValue];
}
