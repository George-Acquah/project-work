import axios from "axios";

function switchErrRes(
  status: number,
  message: string
): { code: number; message: string } {
  switch (status) {
    case 400:
      throw { code: 400, message: message || "Bad Request" };
    case 401:
      throw { code: 401, message: message || "Authentication required" };
    case 404:
      throw { code: 404, message: message || "Resource not found" };
    case 403:
      throw { code: 403, message: message || "Unauthorized" };
    case 422:
      throw { code: 422, message: message || "Validation error" };
    case 500:
      throw { code: 500, message: message || "Server error" };
    default:
      throw { code: status, message: message || "An error occurred" };
  }
}

function handleApiError(error: any): void {
  if (error.response) {
    const { status, data } = error.response;
    switchErrRes(status, data.msg);
  } else {
    throw { code: -1, message: "An unexpected error occurred" };
  }
}

export async function callApi<T, D = any>(
  config: _IApiConfig<D>
): Promise<_IApiResponse<T>> {
  try {
    const response = await axios<_IApiResponse<T>>({
      url: config.url,
      method: config.method,
      data: config.data,
      withCredentials: true,
      // headers: {
      //   Accept: "application/json",
      //   "Content-Type": "application/json",
      // },
    });

    // Check if the server response indicates an error
    if (
      response.data &&
      response.data.statusCode &&
      response.data.statusCode !== 200
    ) {
      throw {
        response: {
          code: response.data.statusCode,
          data: {
            msg: response.data.message,
          },
        },
      };
    }
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
}
