export interface _ISearchParams {
  SESSION: string;
  ERROR: string;
  ERR_MSG: string;
  ERR_DESC: string;
  BTN_LABEL: string;
  APPLICANTS: string;
  USERS: string;
  CENTERS: string;
  SLOTS: string;
}

const SEARCH_PARAMS: _ISearchParams = {
  SESSION: "session-modals",
  ERROR: 'error-modals',
  ERR_MSG: 'err-msg',
  ERR_DESC: 'err-description',
  BTN_LABEL: 'btn-label',
  APPLICANTS: "applicant",
  USERS: "users",
  CENTERS: "centers",
  SLOTS: "slots",
};

export { SEARCH_PARAMS };
