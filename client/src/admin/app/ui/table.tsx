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
import ApplicantStatus from "./users/status";
import Image from "next/image";
import { UserType } from "../lib/constants";
import {
  DeleteCustomer,
  DeleteOwner,
  DeleteUser,
  EditCustomer,
  EditOwner,
  EditUser,
} from "./users/buttons";
import { cardBorder, cardsBg, providerBtnClass } from "./themes";

const TableImage = ({ user }: { user: _TableRowType }) => (
  <div className="flex-shrink-0">
    <Image
      className="h-8 w-8 rounded-full"
      src={user?.image ?? "https://avatar.vercel.sh/leerob"}
      height={32}
      width={32}
      alt={`user's avatar`}
    />
  </div>
);

export default function TableComponent({
  data,
  columnData,
  type,
  entityType,
}: _ITableProps) {
  const router = useRouter();

  return (
    <Table
      className={`mt-8 border border-t-0 rounded-sm min-h-[20rem] ${cardBorder} ${cardsBg}`}
    >
      <TableHead
        className={`align-middle border border-solid font-semibold py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap text-left ${cardBorder} ${cardsBg}`}
      >
        <TableRow>
          {columnData.map((column, index) => (
            <TableHeaderCell key={`__${index}__${column}`} className="px-6 ">
              {column}
            </TableHeaderCell>
          ))}
          <TableHeaderCell className="relative px-12">
            <span className=" sr-only">Edit</span>
          </TableHeaderCell>
          <TableHeaderCell className="relative px-2">
            <span className=" sr-only">Delete</span>
          </TableHeaderCell>
        </TableRow>
      </TableHead>
      {data && data?.length > 0 ? (
        <TableBody className="">
          {data.map((item, index) => {
            const columns = Object.keys(item);
            return (
              <TableRow
                key={index}
                className="px-6 align-middle border-none text-xs whitespace-nowrap p-4"
              >
                {columns
                  .filter((column) => column !== "_id")
                  .map((column, columnIndex) => (
                    <TableCell key={columnIndex} className="px-6">
                      {renderCell(entityType, column, item)}
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
            <TableCell colSpan={columnData.length} className="py-4">
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
}

const renderCell = (
  entityType: string,
  column: string,
  item: _TableRowType
) => {
  if (column === "image") {
    return <TableImage user={item} />;
  }

  if (column === "isVerified") {
    return <ApplicantStatus status={item[column]} />;
  }

  const additionalClassName =
    (entityType === "users" &&
      (column === "vehicles" || column === "centers")) ||
    (entityType === "centers" && column === "slots")
      ? "text-center"
      : "";

  return (
    <Text className={additionalClassName}>
      {renderCellContent(entityType, column, item)}
    </Text>
  );
};

const renderCellContent = (
  entityType: string,
  column: string,
  item: _TableRowType
) => {
  switch (entityType) {
    case "users":
      return item[column];
    case "parkingCenter":
      return item[column];
    default:
      return item[column];
  }
};

const TableButtonHelper = ({
  id,
  entityType,
  type,
}: {
  type?: string;
  id: string;
  entityType: string;
}) => {
  return (
    <>
      {entityType === "users" ? (
        type === UserType.ALL ? (
          <div className="flex justify-end gap-3">
            <EditUser id={id} />
            <DeleteUser id={id} />
          </div>
        ) : type === UserType.CUSTOMER ? (
          <div className="flex justify-end gap-3">
            <EditCustomer id={id} />
            <DeleteCustomer id={id} />
          </div>
        ) : (
          <div className="flex justify-end gap-3">
            <EditOwner id={id} />
            <DeleteOwner id={id} />
          </div>
        )
      ) : entityType === "centers" ? (
        <div className="flex justify-end gap-3">
          <EditCustomer id={id} />
          <EditCustomer id={id} />
        </div>
      ) : (
        // Add cases for other entity types as needed
        <div className="flex justify-end gap-3">
          {/* Add appropriate components for other entity types */}
        </div>
      )}
    </>
  );
};
