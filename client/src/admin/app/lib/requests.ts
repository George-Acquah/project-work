import { UserType } from "./constants";
import { fetcher } from "./data";
import { endpoints } from "./endpoints";
import { formatCentersTable, formatusersTable } from "./utils";

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

async function fetchApplicantById(id: string, type = UserType.ALL) {

  const url = endpoints.USERS.GET_SINGLE_USER;
  const response = await fetcher<_IUser>(
    `${url}/${id}?type=${type}`,
    "GET",
    "no-store"
  );
  return response;
}

async function fetchRoles() {
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

export {
  fetchFilteredUsers,
  fetchUsersPage,
  fetchApplicantById,
  fetchRoles,

  fetchFilteredParkingCenters,
};