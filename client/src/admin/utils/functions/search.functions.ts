import { ENTITY_TYPES } from "@/constants/search-params.constants";

const getAddbtnLabel = (helper: string) => {
  console.log('helper: ', helper);
  switch (helper) {
    case ENTITY_TYPES.USERS.ALL:
      return "user";
    case ENTITY_TYPES.USERS.ADMIN:
      return "admin";
    case ENTITY_TYPES.USERS.OWNERS:
      return "owner";
    case ENTITY_TYPES.USERS.CUSTOMERS:
      return "customer";

    default:
      return undefined;
  }
};


export { getAddbtnLabel }