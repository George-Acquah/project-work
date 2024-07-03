import {
  fetchFilteredParkingCenters,
  fetchFilteredSlots,
  fetchFilteredUsers,
  fetchVehicles,
} from "@/app/lib/requests";
import TableComponent from "./table";
import { UserType, tableColumns } from "@/app/lib/constants";
import { deleteUser } from "@/app/lib/actions";

const UsersTable = async ({
  query,
  currentPage,
  pageSize,
  type = UserType.ALL,
}: _ISpecificTableProps) => {
  const users = (await fetchFilteredUsers(
    query,
    currentPage,
    pageSize,
    type
  )) as _IFormattedUser[];

  return (
    <TableComponent
      columnData={tableColumns.usersTableColumn}
      query={query}
      currentPage={currentPage}
      type={type}
      data={users}
      entityType="users"
      deleteAction={deleteUser}
    />
  );
};

export const CentersTable = async ({
  query,
  currentPage,
  pageSize,
}: _ISpecificTableProps) => {
  const centers = (await fetchFilteredParkingCenters(
    query,
    currentPage,
    pageSize
  )) as _IFormattedCenter[];

  return (
    <TableComponent
      columnData={tableColumns.centersTableColumn}
      query={query}
      currentPage={currentPage}
      data={centers}
      entityType="centers"
      deleteAction={deleteUser}
    />
  );
};

export const SlotsTable = async ({
  query,
  currentPage,
  pageSize,
}: _ISpecificTableProps) => {
  const centers = (await fetchFilteredSlots(
    query,
    currentPage,
    pageSize
  )) as _IFormattedSlot[];

  return (
    <TableComponent
      columnData={tableColumns.slotsTableColumn}
      query={query}
      currentPage={currentPage}
      data={centers}
      entityType="slots"
      deleteAction={deleteUser}
    />
  );
};

export const VehiclesTable = async ({
  query,
  currentPage,
  pageSize,
}: _ISpecificTableProps) => {
  const vehicles = (await fetchVehicles(
    query,
    currentPage,
    pageSize
  )) as _IFormattedVehicle[];

  console.log(vehicles);

  return (
    <TableComponent
      columnData={tableColumns.vehiclesTableColumn}
      query={query}
      currentPage={currentPage}
      data={vehicles}
      entityType="vehicles"
      deleteAction={deleteUser}
    />
  );
};

export default UsersTable;
