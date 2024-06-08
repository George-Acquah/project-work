import "axios";

declare module "axios" {
  export interface InternalAxiosRequestConfig {
    showToast?: boolean;
    callbackUrl?: string;
  }
}
