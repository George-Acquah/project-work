"use client";

import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text,
  Title,
} from "@tremor/react";
import { useRouter } from "next/navigation";
import { FaceFrownIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useState } from "react";
import { Checkbox } from "@headlessui/react";
import { UserType } from "../lib/constants";
import {
  DeleteCenter,
  DeleteCustomer,
  DeleteOwner,
  DeleteSlot,
  DeleteUser,
  EditCenter,
  EditCustomer,
  EditOwner,
  EditSlot,
  EditUser,
  VerificationButton,
} from "./users/buttons";
import { cardBorder, cardsBg, providerBtnClass } from "./themes";
import StatusBadge, { _IStatus } from "./users/status";

// Reusable component for rendering the image cell
const TableImage = ({ data }: { data: _TableRowType }) => (
  <div className="flex-shrink-0">
    <Image
      className="h-8 w-8 rounded-full"
      src={data?.image ?? "https://avatar.vercel.sh/leerob"}
      height={32}
      width={32}
      alt="user's avatar"
    />
  </div>
);

// Component to render individual table cells based on column type and entity type
const renderCell = (
  entityType: string,
  column: string,
  item: _TableRowType,
  id: string,
  type = UserType.ALL
) => {
  switch (column) {
    case "image":
      return <TableImage data={item} />;
    case "isVerified":
      return (
        <div className="flex items-center gap-x-2">
          <StatusBadge status={item[column] as unknown as _IStatus} />
          <TableButtonHelper
            id={id}
            entityType={entityType}
            type={type}
            verify
          />
        </div>
      );
    case "isAvailable":
      return <StatusBadge status={item[column] as unknown as _IStatus} />;
    default:
      const additionalClassName =
        (entityType === "users" &&
          (column === "vehicles" || column === "centers")) ||
        (entityType === "centers" &&
          (column === "slots" || column === "capacity")) ||
        (entityType === "slots" &&
          (column === "capacity" || column === "price"))
          ? "text-center"
          : "";
      return <Text className={additionalClassName}>{item[column]}</Text>;
  }
};

const TableButtonHelper = ({
  id,
  entityType,
  type,
  verify,
  status,
}: {
  id: string;
  entityType: string;
  type?: string;
  verify?: boolean;
  status?: boolean;
}) => {
  const isVerification = verify && (
    <VerificationButton id={id} status={status ?? false} action={undefined} />
  );
  const userActions = (
    <div className="flex justify-end gap-3">
      <EditUser id={id} />
      <DeleteUser id={id} />
    </div>
  );

  if (entityType === "users") {
    if (type === UserType.ALL || type === UserType.CUSTOMER) {
      return isVerification || userActions;
    }
  }

  // Add more entity type cases as needed
  // For now, let's default to user actions if no special cases match
  return isVerification || userActions;
};

// Main table component
const TableComponent = ({
  data,
  columnData,
  type,
  entityType,
}: _ITableProps) => {
  const router = useRouter();
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  // Function to handle individual row selection
  const handleRowSelection = (id: string, checked: boolean) => {
    setSelectedRows((prevSelected) =>
      checked
        ? [...prevSelected, id]
        : prevSelected.filter((rowId) => rowId !== id)
    );
  };

  // Function to handle selecting all rows
  const handleSelectAllRows = (checked: boolean) => {
    if (data) {
      if (checked) {
        setSelectedRows(data.map((item) => item._id!));
      } else {
        setSelectedRows([]);
      }
    }
  };

  // Function to perform bulk delete action
  const handleBulkDelete = () => {
    // Implement your bulk delete logic here
    console.log("Deleting rows:", selectedRows);
    // Clear selected rows after deletion
    setSelectedRows([]);
  };

  // Function to handle row selection state and avoid re-renders for the table
  const isRowSelected = (id: string) => selectedRows.includes(id);

  return (
    <div>
      {selectedRows.length > 0 && (
        <div className="flex justify-between items-center mb-4">
          <Title className="text-md font-semibold">
            {selectedRows.length} rows selected
          </Title>
          <button
            onClick={handleBulkDelete}
            className={`${providerBtnClass} py-2 px-4 rounded`}
          >
            Delete Selected
          </button>
        </div>
      )}

      <Table
        className={`mt-8 border border-t-0 rounded-sm min-h-[20rem] ${cardBorder} ${cardsBg}`}
      >
        <TableHead
          className={`align-middle border border-solid font-semibold py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap text-left ${cardBorder} ${cardsBg}`}
        >
          <TableRow>
            <TableHeaderCell className="px-6">
              <Checkbox
                checked={selectedRows.length === data?.length}
                onChange={(checked) => handleSelectAllRows(checked)}
                className="group block size-4 rounded border bg-white transition data-[checked]:bg-blue-500"
              >
                <svg
                  className="stroke-white opacity-0 transition group-data-[checked]:opacity-100"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <path
                    d="M3 8L6 11L11 3.5"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Checkbox>
            </TableHeaderCell>
            {columnData.map((column, index) => (
              <TableHeaderCell key={`__${index}__${column}`} className="px-6">
                {column}
              </TableHeaderCell>
            ))}
            <TableHeaderCell className="relative px-12">
              <span className="sr-only">Edit</span>
            </TableHeaderCell>
            <TableHeaderCell className="relative px-2">
              <span className="sr-only">Delete</span>
            </TableHeaderCell>
          </TableRow>
        </TableHead>
        {data && data.length > 0 ? (
          <TableBody>
            {data.map((item, index) => {
              const columns = Object.keys(item);
              return (
                <TableRow
                  key={index}
                  className={`px-6 align-middle border-none text-xs whitespace-nowrap p-4 ${
                    selectedRows.includes(item._id!) ? "bg-gray-200" : ""
                  }`}
                >
                  <TableCell className="px-6">
                    <Checkbox
                      checked={isRowSelected(item._id!)}
                      onChange={(checked) =>
                        handleRowSelection(item._id!, checked)
                      }
                      className="group block size-4 rounded border bg-white transition data-[checked]:bg-blue-500"
                    >
                      <svg
                        className="stroke-white opacity-0 transition group-data-[checked]:opacity-100"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path
                          d="M3 8L6 11L11 3.5"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Checkbox>
                  </TableCell>
                  {columns
                    .filter((column) => !column.includes("_id"))
                    .map((column, columnIndex) => (
                      <TableCell key={columnIndex} className="px-6">
                        {renderCell(entityType, column, item, item._id, type)}
                      </TableCell>
                    ))}
                  {/* Edit and Delete buttons */}
                  <TableCell className="px-6">
                    {item["role"] !== "admin" && (
                      <TableButtonHelper
                        type={type}
                        id={item._id!}
                        entityType={entityType}
                      />
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        ) : (
          <TableBody>
            <TableRow className="h-60 text-center">
              <TableCell colSpan={columnData.length + 3} className="py-4">
                <FaceFrownIcon className="w-10 text-gray-400 pos__center" />
                <Title className="text-center mb-4">No Content Found</Title>
                <Title
                  onClick={router.refresh}
                  className={`${providerBtnClass} w-fit pos__center dark:border-custom-primary/50 cursor-pointer`}
                >
                  Retry
                </Title>
              </TableCell>
            </TableRow>
          </TableBody>
        )}
      </Table>
    </div>
  );
};

export default TableComponent;
