// import { AuthRequiredError, NetworkError } from "@/public/lib/exceptions";

import { auth } from "@/auth";
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

export const API = process.env.NODE_ENV === "development" ? DEV : PROD;

function switchErrRes(status: number, errorData: _IApiResponse<{}>) {
  switch (status) {
    case 401:
      throw new AuthRequiredError(
        errorData.message || ErrorMessages.AUTH_REQUIRED
      );
    case 404:
      throw new NotFoundError(errorData.message || ErrorMessages.NOT_FOUND);
    case 403:
      throw new UnauthorizedError(
        errorData.message || ErrorMessages.UNAUTHORIZED
      );
    case 422:
      throw new ValidationError(
        errorData.message || ErrorMessages.VALIDATION_ERROR
      );
    case 500:
      throw new ServerError(errorData.message || ErrorMessages.SERVER_ERROR);
    default:
      throw new Error(`Unhandled error status: ${status}`);
  }
}

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

    if (!res.ok) {
      const errorData = (await res.json()) as _IApiResponse<{}>;

      // switch (res.status) {
      //   case 401:
      //     throw new AuthRequiredError(
      //       errorData.message || ErrorMessages.AUTH_REQUIRED
      //     );
      //   case 404:
      //     throw new NotFoundError(errorData.message || ErrorMessages.NOT_FOUND);
      //   case 403:
      //     throw new UnauthorizedError(
      //       errorData.message || ErrorMessages.UNAUTHORIZED
      //     );
      //   case 422:
      //     throw new ValidationError(
      //       errorData.message || ErrorMessages.VALIDATION_ERROR
      //     );
      //   case 500:
      //     throw new ServerError(
      //       errorData.message || ErrorMessages.SERVER_ERROR
      //     );
      //   default:
      //     throw new Error(`Unhandled error status: ${res.status}`);
      // }
      switchErrRes(res.status, errorData);
    }

    const data = (await res.json()) as _IApiResponse<T>;
    return data;
  } catch (err: any) {
    if (err.message.toLowerCase() === "fetch failed") {
      throw new NetworkError();
    }

    throw new Error(`${err.code || "Unknown"}: ${err.message}`);
  }
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
      switchErrRes(res.status, errorData);
    }
    return res;
  } catch (err: any) {
    console.log(err.message);
    return err.message;
  }
}

export const authHeader = async (isUpload?: boolean) => {
  const session = await auth();

  const headers = {
    "Content-Type": "application/json",
    authorization:
      session && session.access_token
        ? `Bearer ${session.access_token}`
        : `Bearer invalid-token`,
  };

  if (isUpload) {
    headers["Content-Type"] = "multipart/form-data";
  }

  return headers;
};
