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

const TableImage = ({ user }: { user: _IFormattedUser }) => (
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
}: _ITableProps) {
  const router = useRouter();
  const defBtnClass =
    "pos__center bg-tremor-border w-fit py-1 px-6 rounded-tremor-default tracking-wide cursor-pointer hover:bg-tremor-content-subtle hover:text-tremor-brand-inverted";

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
                {columns.map(
                  (column, columnIndex) =>
                    // Exclude the 'id' field
                    column !== "_id" && (
                      <TableCell key={columnIndex} className="px-6">
                        {column === "image" ? (
                          <TableImage user={item} />
                        ) : column === "isVerified" ? (
                          <ApplicantStatus status={item[column]} />
                        ) : (
                          <Text
                            className={
                              column === "vehicles" || column === "centers"
                                ? "text-center"
                                : ""
                            }
                          >
                            {item[column]}
                          </Text>
                        )}
                      </TableCell>
                    )
                )}

                {/* Edit and Delete buttons */}
                <TableCell className="px-6">
                  {item["role"] !== "admin" && (
                    <TableButtonHelper type={type} id={item._id!} />
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

const TableButtonHelper = ({ type, id }: { type: string; id: string }) => {
  return (
    <>
      {type === UserType.ALL ? (
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
      )}
    </>
  );
};
