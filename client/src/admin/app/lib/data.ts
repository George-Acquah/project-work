import { auth, unstable_update } from "@/auth";
import { ErrorMessages } from "./constants";
import {
  AuthRequiredError,
  NotFoundError,
  UnauthorizedError,
  ValidationError,
  ServerError,
  NetworkError,
} from "./exceptions";

const DEV = process.env.NEXT_PUBLIC_API_URL;
const PROD = "prod-base-url";

export const API = DEV;
// export const API = process.env.NODE_ENV === "development" ? DEV : PROD;

export function switchErrRes(
  status: number,
  message: string
): { code: number; message: string } {
  switch (status) {
    case 400:
      throw { code: 400, message: message || "Bad Request" };
    case 401:
      throw new UnauthorizedError(message || ErrorMessages.UNAUTHORIZED);
    case 404:
      throw new NotFoundError(message || ErrorMessages.NOT_FOUND);
    case 403:
      throw new UnauthorizedError(message || ErrorMessages.UNAUTHORIZED);
    case 422:
      throw new ValidationError(message || ErrorMessages.VALIDATION_ERROR);
    case 500:
      throw new ServerError(message || ErrorMessages.SERVER_ERROR);
    default:
      throw { code: status, message: message || "An error occurred" };
  }
}

function handleApiError(error: any): void {
  if (error.response) {
    const { code, data } = error.response;
    switchErrRes(code, data.msg);
  } else {
    throw { code: -1, message: "An unexpected error occurred" };
  }
}

// Add a function to refresh the token
async function refreshToken() {
  const refreshResponse = await fetch(`${API}/auth/refresh`, {
    method: "POST",
    headers: await refreshHeader(),
  });

  if (!refreshResponse.ok) {
    throw new Error("Failed to refresh token");
  }

  const refreshData =
    (await refreshResponse.json()) as _IApiResponse<_IRefresh>;
  await updateSession(
    refreshData.data.tokens.access_token,
    refreshData.data.tokens.refresh_token
  );
  return refreshData.data.tokens.access_token;
}

export async function uploadFetcher(
  url: string,
  method?: RequestMethod,
  cache?: RequestCache
): Promise<Response> {
  const fetchUrl = `${API}/${url}`;
  console.log(await authHeader());
  const options: RequestInit = {
    method: method ? method : "GET",
    cache: cache ? cache : "default",
    credentials: "include",
    headers: await authHeader(),
  };

  try {
    const res = await fetch(fetchUrl, options);

    if (!res.ok) {
      const errorData = (await res.json()) as _IApiResponse<{}>;
      switchErrRes(res.status, errorData.message);
    }

    return res;
  } catch (err: any) {
    console.log(err.message);
    return err.message;
  }
}

// Modify the fetcher function to handle token refresh
export async function fetcher<T>(
  url: string,
  method?: RequestMethod,
  cache?: RequestCache,
  body?: any
): Promise<_IApiResponse<T>> {
  const fetchUrl = `${API}/${url}`;

  const options: RequestInit = {
    method: method ?? "GET",
    cache: cache ?? "default",
    credentials: "include",
    body: JSON.stringify(body) ?? null,
    headers: await authHeader(),
  };

  try {
    const res = await fetch(fetchUrl, options);

    const data = (await res.json()) as _IApiResponse<T>;

    // Check if the server response indicates an error
    if (data.statusCode && data.statusCode !== 200) {
      throw {
        response: {
          code: data.statusCode,
          data: {
            msg: data.message,
          },
        },
      };
    }

    return data;
  } catch (err: any) {
    if (err?.response?.code === 401 || err?.response?.status === 401) {
      try {
        // Attempt to refresh the token
        const newAccessToken = await refreshToken();
        // Retry the original request with the new access token
        options.headers = await authHeader();
        console.log(options.headers);
        const retryRes = await fetch(fetchUrl, options);
        const retryData = (await retryRes.json()) as _IApiResponse<T>;
        if (retryData.statusCode !== 200) {
          switchErrRes(retryData.statusCode, retryData.message);
        }
        return retryData;
      } catch (refreshError) {
        // Handle failed refresh here (e.g., redirect to login)
        throw refreshError;
      }
    } else if (err.response.data.msg.toLowerCase() === "fetch failed") {
      throw new NetworkError();
    }
    handleApiError(err);
    throw err;
  }
}

// Modify the authHeader function to use the new access token
export const authHeader = async (isUpload?: boolean) => {
  const session = await auth();

  const headers = {
    "Content-Type": "application/json",
    Authorization:
      session && session.access_token
        ? `Bearer ${session.access_token}`
        : "Bearer invalid-token",
  };

  if (isUpload) {
    // delete headers['Content-Type']; // multipart/form-data doesn't need a Content-Type header; the browser sets it
  }

  return headers;
};

export const refreshHeader = async () => {
  const session = await auth();

  const headers = {
    "Content-Type": "application/json",
    Authorization:
      session && session.refresh_token
        ? `Refresh ${session.refresh_token}`
        : "Refresh",
  };

  return headers;
};

// Implement the updateSession function to update the session with the new tokens
async function updateSession(accessToken: string, refreshToken: string) {
  // Update the session storage or state with the new tokens
  const currentSession = await auth();
  console.log(currentSession)
  if (currentSession) {
    await unstable_update({
      ...currentSession,
      access_token: accessToken,
      refresh_token: refreshToken,
    })
  }
}
