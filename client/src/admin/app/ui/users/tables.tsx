import {
  fetchFilteredParkingCenters,
  fetchFilteredSlots,
  fetchFilteredUsers,
} from "@/app/lib/requests";
import TableComponent from "../shared/table";
import { UserType, tableColumns } from "@/app/lib/constants";

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
    />
  );
};

export default UsersTable;
