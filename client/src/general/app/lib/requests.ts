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

async function fetchUserById(id: string) {
  const url = `${endpoints.USERS.GET_SINGLE_USER}/${id}`;
  const response = await fetcher<_IUser>(url, "GET", "no-store");
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
  centers: string = "",
  currentPage: number = 1,
  pageSize: number = 5,
) {
  const url = endpoints.PARKING_CENTER.GET_ALL_PARKING_CENTERS;
  const response = await fetcher<_IParkingCenter[]>(
    `${url}?centers=${centers}&currentPage=${currentPage}&size=${pageSize}`,
    "GET",
    "no-store"
  );
  return response;
}

async function fetchSingleParkingCenter(center_id: string) {
  const url = `${endpoints.PARKING_CENTER.BASE}/${center_id}`;

    const response = await fetcher<_IParkingCenter>(
      url,
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


async function fetchAvailableSlots(
  center_id: string,
  start_time: Date,
  duration: number,
  currentPage: number,
  pageSize: number,
) {
  const url = `${endpoints.PARKING_CENTER.BASE}/${center_id}/available-slots`;
  const response = await fetcher<_ISlot[]>(
    `${url}?currentPage=${currentPage}&size=${pageSize}`,
    "GET",
    "no-store",
    { start_time, duration }
  );
  return response;
}
//END SLOTS


// PAGES

async function fetchSlotsPage(
  applicant: string,
  pageSize: number,
) {
  const url = `${endpoints.USERS.GET_USERS_PAGE}`;
  const response = await fetcher<number>(
    `${url}?users=${applicant}&size=${pageSize}`,
    "GET",
    "no-cache"
  );
  return response.data;
}

// END PAGES

// RESERVATIONS
  async function fetchSingleReservation(
    center_id: string,
    slot_id: string,
    reservation_id: string,
  ) {
    const url = `${endpoints.PARKING_CENTER.BASE}/${center_id}/slots/${slot_id}/reservations/${reservation_id}`;
    const response = await fetcher<_IReservationResponse>(
      url,
      "GET",
      "no-store"
    );
    return response.data;
  }
//END RESERVATIONS

export {
  verifyUser,
  fetchUserById,
  fetchUserTypes,
  fetchFilteredParkingCenters,
  fetchSingleParkingCenter,
  fetchFilteredSlots,
  fetchAvailableSlots,
  fetchSingleReservation,
};