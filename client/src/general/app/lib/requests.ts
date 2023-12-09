import { UserType } from "./constants";
import { fetcher } from "./data";
import { endpoints } from "./endpoints";

//USERS
async function verifyUser() {
  const url = endpoints.USERS.VERIFY_USER;
  const response = await fetcher<_IUser>(
    url,
    "GET",
    "no-store"
  );
  return response.data;
}

async function fetchUserTypes() {
  const url = endpoints.USERS.GET_ALL_ROLES;
  const response = await fetcher<string[]>(`${url}`, "GET", "default");

  return response;
}
//END OF USERS


//BEGIN PARKING CENTERS
async function fetchFilteredParkingCenters(
  centers: string,
  currentPage: number,
  pageSize: number,
) {
  const url = endpoints.PARKING_CENTER.GET_ALL_PARKING_CENTERS;
  const response = await fetcher<_IParkingCenter[]>(
    `${url}?centers=${centers}&currentPage=${currentPage}&size=${pageSize}`,
    "GET",
    "no-store"
  );
  return response;
}

//END PARKING CENTERS

//BEGIN SLOTS
async function fetchFilteredSlots(
  slots: string,
  currentPage: number,
  pageSize: number
) {
  const url = endpoints.PARKING_CENTER.GET_ALL_SLOTS;
  const response = await fetcher<_ISlot[]>(
    `${url}?slots=${slots}&currentPage=${currentPage}&size=${pageSize}`,
    "GET",
    "no-store"
  );
  return response;
}
//END SLOTS

export {
  fetchUserTypes,
  fetchFilteredParkingCenters,
  fetchFilteredSlots,
  verifyUser,
};