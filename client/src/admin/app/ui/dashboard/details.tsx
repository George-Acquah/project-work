import React from "react";

import {
  Card,
  Text,
  Title,
  Button,
  Flex,
  DeltaType,
  BadgeDelta,
} from "@tremor/react";
// import TableComponent from "../table";
import { HelperIconTooltip } from "./details-helper";
import Pagination from "../pagination";
import { cardOutline, cardsBg } from "../themes";

// const formatCurrency = Intl.NumberFormat("en-US", {
//   style: "currency",
//   currency: "USD",
// });

// const formatDate = Intl.DateTimeFormat("en-US", {
//   dateStyle: "medium",
//   timeStyle: "medium",
// });

// const getDeltaType = (status: number): DeltaType => {
//   // Order is Pending or Ready
//   if (status === 1 || status === 2) return "unchanged";
//   // Order is on its way
//   if (status === 3) return "moderateIncrease";
//   // Order has been delivered
//   if (status === 4) return "increase";
//   // Order has been cancelled
//   if (status === 5) return "decrease";
//   // Status is unknown
//   return "decrease";
// };

export const Details = async ({ data }: any) => {
    
  // const applicants = await fetchFilteredApplicants(applicant, currentPage);

  return (
    <Card className={`${cardsBg} ${cardOutline}`}>
      <Flex justifyContent="start" className="space-x-0.5" alignItems="center">
        <Title>Customer Orders</Title>
        <HelperIconTooltip />
      </Flex>

      {/* <TableComponent
        columnData={applicantsTableColumn}
        query={applicant}
        currentPage={currentPage}
        data={applicants}
      /> */}

      <Flex className="mt-5 w-full flex-wrap gap-2 space-x-10" justifyContent="center" alignItems="center">
        <Pagination totalPages={10} />
      </Flex>
    </Card>
  );
};
