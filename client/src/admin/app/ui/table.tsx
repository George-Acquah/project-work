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
import { useState } from "react";
import { Checkbox } from "@headlessui/react";

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
    case "select": // New column for checkbox
      return (
        <Checkbox
          onChange={(e) => handleCheckboxChange(e, item._id)}
        />
      );
    default:
      const additionalClassName =
        (entityType === "users" &&
          (column === "vehicles" || column === "centers")) ||
        (entityType === "centers" && (column === "slots" || column === "capacity")) ||
        (entityType === "slots" && (column === "capacity" || column === "price"))
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

// Function to handle checkbox change
const handleCheckboxChange = (isChecked: boolean, itemId: string) => {
  // Update your state or logic here to track selected items based on isChecked and itemId
  console.log("Checkbox for item", itemId, "is", isChecked);
};

// Main table component
const TableComponent = ({
  data,
  columnData,
  type,
  entityType,
}: _ITableProps) => {
  const router = useRouter();
  const [selectedItems, setSelectedItems] = useState<string[]>([]); // State to store selected item IDs

  const handleCheckboxChange = (isChecked: boolean, itemId: string) => {
    setSelectedItems((prevItems) => {
      if (isChecked) {
        return [...prevItems, itemId];
      } else {
        return prevItems.filter((id) => id !== itemId);
      }
    });
  };

  return (
    <Table
      className={`mt-8 border border-t-0 rounded-sm min-h-[20rem] ${cardBorder} ${cardsBg}`}
    >
      <TableHead
        className={`align-middle border border-solid font-semibold py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap text-left ${cardBorder} ${cardsBg}`}
      >
        <TableRow>
          {/* Add checkbox header cell */}
          <TableHeaderCell className="px-6">
            <Checkbox
              onChange={
                (e) => handleCheckboxChange(e, "all") // Check/uncheck all
              }
            />
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
                className="px-6 align-middle border-none text-xs whitespace-nowrap p-4"
              >
                <TableCell className="px-6">
                  <Checkbox
                    checked={selectedItems.includes(item._id)} // Check if item is selected
                    onChange={(e) => handleCheckboxChange(e, item._id)}
                    className="group block size-4 rounded border bg-white data-[checked]:bg-blue-500"
                  >
                    {/* Checkmark icon */}
                    <svg
                      className="stroke-white opacity-0 group-data-[checked]:opacity-100"
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
                      id={item._id}
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
            <TableCell colSpan={columnData.length + 2} className="py-4">
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
  );
};

export default TableComponent;
