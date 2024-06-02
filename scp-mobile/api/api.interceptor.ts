import { load, remove, save } from "@/utils/functions/storage";
import { SCREEN_ROUTE, SHOW_TOAST, keys } from "@/constants/root";
import { async_remove, async_save } from "@/utils/functions/async-storage";
import axiosInstance from "./root";
import { store } from "@/store";
import { showModal } from "@/features/session/session.slice";
import { addToast } from "@/features/toast/toast.slice";
import { showErrorModal } from "@/features/error/error.slice";

let isRefreshing = false;
let flag = false;
let failedQueue: any[] = [];
let callbackUrl: string | undefined = undefined;

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

axiosInstance.interceptors.request.use(
  (config) => {
    if (config.headers[SHOW_TOAST]) {
      config.showToast = config.headers[SHOW_TOAST];
      delete config.headers[SHOW_TOAST];
    }
    // Capture and store the screen route in the config
    if (config.headers[SCREEN_ROUTE]) {
      config.callbackUrl = config.headers[SCREEN_ROUTE];
      delete config.headers[SCREEN_ROUTE];
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.config.showToast) {
      const successMessage = response.data.message || "Request succeeded!";
      store.dispatch(addToast({ message: successMessage, type: "success" }));
    }
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
        // Use the stored screen route for the modal
        store.dispatch(
          showModal(callbackUrl)
        );
      }

      originalRequest._retry = true;
      isRefreshing = true;
      callbackUrl = originalRequest.callbackUrl; // Store the original screen route

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

    // Handle network error or timeout error
    if (!error.response) {
      const errorMessage = error.message.includes("timeout")
        ? "Network timeout. Please try again."
        : "Network error. Please check your internet connection.";

      store.dispatch(showErrorModal({ message: errorMessage, button_label: 'Go to Login'}));

      return Promise.reject({ message: errorMessage });
    }

    if (originalRequest.showToast) {
      const errorMessage = error.response?.data?.message || "Request failed!";
      store.dispatch(addToast({ message: errorMessage, type: "error" }));
    }

    return Promise.reject(error.response.data);
  }
);

export default axiosInstance;
