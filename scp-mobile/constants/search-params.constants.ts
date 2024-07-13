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
  ENTITY_TYPE: string;
  VEHICLES: string;
  RESERVATIONS: string;
  FORM_STEP: string;
}

export const SEARCH_PARAMS: _ISearchParams = {
  SESSION: "session-modals",
  ERROR: "error-modals",
  ERR_MSG: "err-msg",
  ERR_DESC: "err-description",
  BTN_LABEL: "btn-label",
  APPLICANTS: "applicant",
  USERS: "users",
  ENTITY_TYPE: "type",
  CENTERS: "centers",
  SLOTS: "slots",
  VEHICLES: "vehicles",
  RESERVATIONS: "reservations",
  FORM_STEP: "step",
};
