// src/api/interceptors.ts
import { load, remove, save } from "@/utils/functions/storage";
import { keys } from "@/constants/root";
import { async_remove, async_save } from "@/utils/functions/async-storage";
import axiosInstance from "./root";
import { store } from "@/store";
import { showModal } from "@/features/session/session.slice";

let isRefreshing = false;
let flag = false;
let failedQueue: any[] = [];
let originalRequestUrl: string | null = null;

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      if (isRefreshing && !flag) {
        return new Promise<_IRefresh>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((data) => {
            originalRequest.headers["Authorization"] =
              "Bearer " + data.tokens.access_token;
            return axiosInstance(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      if (isRefreshing && flag) {
        remove(keys.TOKEN_KEY);
        async_remove(keys.EXP);
        isRefreshing = false;
        flag = false;
        // Use the stored original request URL
        store.dispatch(showModal(originalRequestUrl || originalRequest.url));
      }

      originalRequest._retry = true;
      isRefreshing = true;
      originalRequestUrl = originalRequest.url; // Store the original request URL

      const tokens = (await load(keys.TOKEN_KEY, "json")) as _ITokens;
      const { refresh_token } = tokens;

      return new Promise((resolve, reject) => {
        flag = true;
        axiosInstance
          .post<{ data: _IRefresh }>(
            "auth/refresh",
            {},
            {
              headers: {
                Authorization: `Refresh ${refresh_token}`,
              },
            }
          )
          .then(({ data }) => {
            save<_ITokens>(keys.TOKEN_KEY, data.data.tokens);
            async_save<number>(keys.EXP, data.data.tokens.expiresIn);
            axiosInstance.defaults.headers["Authorization"] =
              "Bearer " + data.data.tokens.access_token;
            originalRequest.headers["Authorization"] =
              "Bearer " + data.data.tokens.access_token;
            processQueue(null, data.data.tokens.access_token);
            resolve(axiosInstance(originalRequest));
          })
          .catch((err) => {
            processQueue(err, null);
            reject(err);
          })
          .finally(() => {
            isRefreshing = false;
          });
      });
    }

    if (!error.response) {
      return Promise.reject({ message: "Network error. Please try again." });
    }

    return Promise.reject(error.response.data);
  }
);

export default axiosInstance;
