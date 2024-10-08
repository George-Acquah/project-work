import { redirectDynamicUrls } from "@/constants/errors.constants";
import { UserType } from "./constants";
import { fetcher } from "./data";
import { endpoints } from "./endpoints";
import {
  formatAdminDetails,
  // formatCentersTable,
  formatSlotsTable,
  formatusersTable,
} from "./utils";
import { redirect } from "next/navigation";

//USERS
async function fetchFilteredUsers(
  users: string,
  currentPage: number,
  pageSize: number,
  type = UserType.ALL
) {
  try {
    // await new Promise((resolve) => setTimeout(resolve, 5000));
    const url = endpoints.USERS.GET_FILTERED_USERS;
    const response = await fetcher<_IFormattedUser[]>(
      `${url}?users=${users}&currentPage=${currentPage}&size=${pageSize}&type=${type}`,
      "GET",
      "no-store"
    );
    return response.data;
  } catch (error: any) {
    console.log(error.code);
  }
}

async function fetchUserById(id: string, type = UserType.ALL) {
  try {
    const url = endpoints.USERS.GET_SINGLE_USER;
    const response = await fetcher<_IUser>(
      `${url}/${id}?type=${type}`,
      "GET",
      "default"
    );
    return response;
  } catch (error: any) {
    console.log(error);
    const { ERROR_URL } = redirectDynamicUrls(
      "/dashboard",
      error.message ?? 'test',
      'something random'
    );
    redirect(ERROR_URL);
  }
}

async function fetchUserProfile(id: string) {
  try {
    const url = endpoints.USERS.BASE;
    const response = await fetcher<_IProfile>(
      `${url}/${id}/profile`,
      "GET",
      "default"
    );
    return response;
  } catch (error: any) {
    console.log(error);
    const { ERROR_URL } = redirectDynamicUrls(
      "/dashboard",
      error.message ?? "test",
      "something random"
    );
    console.log(error.name);
    console.log(error.message);
    redirect(ERROR_URL);
  }
}

async function verifyUser(admin?: boolean) {
  const url = endpoints.USERS.VERIFY_USER;
  const response = await fetcher<_IUser>(url, "GET", "no-store");
  if (admin) {
    return formatAdminDetails(response.data);
  }
  return response.data;
}

async function fetchUserTypes() {
  const url = endpoints.USERS.GET_ALL_ROLES;
  const response = await fetcher<string[]>(`${url}`, "GET", "no-store");

  return response;
}

async function fetchUsersPage(
  applicant: string,
  pageSize: number,
  type = UserType.ALL
) {
  const url = `${endpoints.USERS.GET_USERS_PAGE}`;
  const response = await fetcher<number>(
    `${url}?users=${applicant}&size=${pageSize}&type=${type}`,
    "GET",
    "no-cache"
  );
  return response.data;
}
//END OF USERS

//BEGIN PARKING CENTERS
async function fetchFilteredParkingCenters(
  centers: string,
  currentPage: number,
  pageSize: number
) {
  const url = endpoints.PARKING_CENTER.GET_ALL_PARKING_CENTERS;
  const response = await fetcher<_IFormattedCenter[]>(
    `${url}?centers=${centers}&currentPage=${currentPage}&size=${pageSize}`,
    "GET",
    "no-store"
  );
  return response.data;
}

async function fetchCenterById(centers_id: string) {
  try {
    const url = `${endpoints.PARKING_CENTER.BASE}/${centers_id}`;
    const response = await fetcher<_IParkingCenter>(url, "GET", "no-store");
    return response;
  } catch (error: any) {
    const { ERROR_URL } = redirectDynamicUrls(
      "/dashboard/users/parking-lots",
      error.message ?? "test",
      "something random"
    );
    console.log(error.name);
    console.log(error.message);
    redirect(ERROR_URL);
  }
}

//END PARKING CENTERS

//BEGIN SLOTS
async function fetchFilteredSlots(
  slots: string,
  currentPage: number,
  pageSize: number
) {
  const url = endpoints.PARKING_CENTER.GET_ALL_SLOTS;
  const response = await fetcher<_IFormattedSlot[]>(
    `${url}?slots=${slots}&currentPage=${currentPage}&size=${pageSize}`,
    "GET",
    "no-store"
  );
  return response.data;
}
//END SLOTS

//BEGIN VEHICLES
async function fetchVehicles(
  vehicles: string,
  currentPage: number,
  pageSize: number
) {
try {
  const url = endpoints.VEHICLES.BASE;
  const response = await fetcher<_IFormattedVehicle[]>(
    `${url}?vehicles=${vehicles}&currentPage=${currentPage}&size=${pageSize}`,
    "GET",
    "no-store"
  );
  // return formatCentersTable(response.data);
  return response.data;
} catch (error: any) {
  console.log(error)
  const { ERROR_URL } = redirectDynamicUrls(
    "/dashboard",
    error.message ?? "test",
    "something random"
  );
  // redirect(ERROR_URL);
}
}

async function fetchVehicleById(centers_id: string) {
  try {
    const url = `${endpoints.PARKING_CENTER.BASE}/${centers_id}`;
    const response = await fetcher<_IParkingCenter>(url, "GET", "no-store");
    return response;
  } catch (error: any) {
    const { ERROR_URL } = redirectDynamicUrls(
      "/dashboard/users/parking-lots",
      error.message ?? "test",
      "something random"
    );
    console.log(error.name);
    console.log(error.message);
    redirect(ERROR_URL);
  }
}

//END VEHICLES

//BEGIN RESERVATION
async function fetchReservations(
  reservations: string,
  currentPage: number,
  pageSize: number
) {
  try {
    const url = endpoints.PARKING_CENTER.GET_ALL_SLOT_RESERVATIONS;
    const response = await fetcher<_IFormattedReservation[]>(
      `${url}?reservations=${reservations}&currentPage=${currentPage}&size=${pageSize}`,
      "GET",
      "no-store"
    );
    return response.data;
  } catch (error: any) {
    console.log(error);
    const { ERROR_URL } = redirectDynamicUrls(
      "/dashboard",
      error.message ?? "test",
      "something random"
    );
    // redirect(ERROR_URL);
  }
}
//reservation_id
//0545409069

async function fetchSingleReservation(
  reservation_id: string
) {
  try {
    const url = endpoints.PARKING_CENTER.GET_ALL_SLOT_RESERVATIONS;
    const response = await fetcher<_IFormattedReservation>(
      `${url}/${reservation_id}`,
      "GET",
      "no-store"
    );
    return response.data;
  } catch (error: any) {
    console.log(error);
    const { ERROR_URL } = redirectDynamicUrls(
      "/dashboard",
      error.message ?? "test",
      "something random"
    );
    // redirect(ERROR_URL);
  }
}

async function fetchReservationsPage(
  reservations: string,
  pageSize: number
) {
  try {
    const url = endpoints.PARKING_CENTER.GET_RESERVATIONS_PAGE;
    const response = await fetcher<number>(
      `${url}?reservations=${reservations}&size=${pageSize}`,
      "GET",
      "no-store"
    );
    return response.data;
  } catch (error: any) {
    console.log(error);
    const { ERROR_URL } = redirectDynamicUrls(
      "/dashboard",
      error.message ?? "test",
      "something random"
    );
    // redirect(ERROR_URL);
  }
}


//END RESERVATION

export {
  fetchFilteredUsers,
  fetchUsersPage,
  fetchUserById,
  fetchUserProfile,
  fetchUserTypes,
  fetchFilteredParkingCenters,
  fetchCenterById,
  fetchFilteredSlots,
  verifyUser,

  fetchVehicles,
  fetchReservations,
  fetchSingleReservation,
  fetchReservationsPage
};
