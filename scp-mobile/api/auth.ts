import { BASE_URL } from "./root";
import { callApi } from "./shared";

const AUTH_BASE_URL = `${BASE_URL}/auth`;
const USER_BASE_URL = `${BASE_URL}/users`;
// const AUTH_BASE_URL = `https://api.developbetterapps.com`;


export interface LoginParams {
  email: string;
  password: string;
}

export interface RegisterParams {
  password: string;
  email: string;
}

export interface ILogoutResponse {
  message: string;
}

export interface RegisterResponse {
  msg: string;
  user: {
    id: string;
    role: string;
  };
}

export async function loginUser(params: LoginParams) {
  const config: _IApiConfig<typeof params> = {
    url: `${AUTH_BASE_URL}/login`,
    method: "POST",
    data: params,
  };

  return callApi<_ILoginResponse, typeof params>(config);
}

export async function registerUser(params: RegisterParams) {
  const config: _IApiConfig<typeof params> = {
    url: `${AUTH_BASE_URL}/users/customer`,
    method: "POST",
    data: params,
  };

  return callApi<_IPostApiResponse, typeof params>(config);
}

export async function refreshToken() {
  const config: _IApiConfig = {
    url: `${AUTH_BASE_URL}/refresh`,
    method: "POST",
  };

  return callApi<_IRefresh>(config);
}

export async function verifyuser() {
  const config: _IApiConfig = {
    url: `${USER_BASE_URL}/me-mobile`,
    method: "GET",
  };

  return callApi<_IVerifyUser>(config);
}

export async function updateUser(params: any) {
  const config: _IApiConfig<typeof params> = {
    url: `${AUTH_BASE_URL}/update-details`,
    method: "PUT",
    data: params,
  };

  return callApi<_IApiResponse<_ILoginResponse>, typeof params>(config);
}

export async function logoutUser() {
  const config: _IApiConfig = {
    url: `${AUTH_BASE_URL}/users`,
    method: "POST",
  };

  return callApi<ILogoutResponse>(config);
}
