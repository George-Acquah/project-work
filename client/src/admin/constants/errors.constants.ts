import { SEARCH_PARAMS } from "./search-params.constants";

const AUTH_ERRORS = {
  NEXTAUTH_ERROR_URL: `/auth/login?${[SEARCH_PARAMS.ERROR]}=${
    SEARCH_PARAMS.ERROR
  }&${[
    SEARCH_PARAMS.ERR_MSG,
  ]}=Wrong Credentials, Please check if your password and email is correct.&${[
    SEARCH_PARAMS.ERR_DESC,
  ]}=If you think your credentials are correct, make sure you're an admin.&${[
    SEARCH_PARAMS.BTN_LABEL,
  ]}=Try Again`,
  GENERAL: `/auth/login?${[SEARCH_PARAMS.ERROR]}=${SEARCH_PARAMS.ERROR}`,
  SESSION: `${[SEARCH_PARAMS.SESSION]}=${SEARCH_PARAMS.SESSION}`,
};

const redirectDynamicUrls = (
  url: string,
  err_msg: string,
  err_desc: string,
  err_btn?: string
) => {
  return {
    ERROR_URL: `${url}?${[SEARCH_PARAMS.ERROR]}=${SEARCH_PARAMS.ERROR}&${[
      SEARCH_PARAMS.ERR_MSG,
    ]}=${err_msg}.&${[SEARCH_PARAMS.ERR_DESC]}=${err_desc}.&${[
      SEARCH_PARAMS.BTN_LABEL,
    ]}=${err_btn ?? "Try Again"}`,
  };
};

export { AUTH_ERRORS, redirectDynamicUrls };
