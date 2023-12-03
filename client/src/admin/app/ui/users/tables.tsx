import { fetchFilteredUsers } from "@/app/lib/requests"
import TableComponent from "../table";
import { UserType, usersTableColumn } from "@/app/lib/constants";

const UsersTable = async ({
  applicant,
  currentPage,
  pageSize,
  type = UserType.ALL,
}: _ISpecificTableProps) => {
  const users = await fetchFilteredUsers(
    applicant,
    currentPage,
    pageSize,
    type
  ) as _IFormattedUser[];

  return (
    <TableComponent
      columnData={usersTableColumn}
      query={applicant}
      currentPage={currentPage}
      type={type}
      data={users}
    />
  );
};

export default UsersTable;