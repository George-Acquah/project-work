import { UserType } from "./constants";
import { fetcher } from "./data";
import { endpoints } from "./endpoints";
import { formatAdminDetails, formatCentersTable, formatSlotsTable, formatusersTable } from "./utils";

//USERS
async function fetchFilteredUsers(
  users: string,
  currentPage: number,
  pageSize: number,
  type = UserType.ALL,
) {
  // await new Promise((resolve) => setTimeout(resolve, 5000));
  const url = endpoints.USERS.GET_FILTERED_USERS;
  const response = await fetcher<_IUser[]>(
    `${url}?users=${users}&currentPage=${currentPage}&size=${pageSize}&type=${type}`,
    "GET",
    "no-store"
  );
  return formatusersTable(response.data);
}

async function fetchUserById(id: string, type = UserType.ALL) {
  console.log(id);

  const url = endpoints.USERS.GET_SINGLE_USER;
  const response = await fetcher<_IUser>(
    `${url}/${id}?type=${type}`,
    "GET",
    "default"
  );
  return response;
}

async function verifyUser(admin?: boolean) {
  const url = endpoints.USERS.VERIFY_USER;
  const response = await fetcher<_IUser>(
    url,
    "GET",
    "no-store"
  );
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

async function fetchUsersPage(applicant: string, pageSize: number, type = UserType.ALL) {
  const url = `${endpoints.USERS.GET_USERS_PAGE}`;
  const response = await fetcher<number>(
    `${url}?users=${applicant}&size=${pageSize}&type=${type}`, "GET", "no-cache"
  );
  return response.data;
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
  return formatCentersTable(response.data);
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
  return formatSlotsTable(response.data);
}
//END SLOTS

export {
  fetchFilteredUsers,
  fetchUsersPage,
  fetchUserById,
  fetchUserTypes,
  fetchFilteredParkingCenters,
  fetchFilteredSlots,
  verifyUser,
};