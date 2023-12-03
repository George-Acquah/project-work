"use client";

import { useState } from "react";
import {
  AreaChart,
  Card,
  Flex,
  Text,
  Title,
  Icon,
  TabGroup,
  TabList,
  Tab,
} from "@tremor/react";

import { InformationCircleIcon } from "@heroicons/react/24/solid";
import { cardOutline, cardsBg } from "../themes";

interface IObject {
  date: string;
  value: string;
}

interface IProps {
  revenue: IObject[];
  applications: IObject[];
  applicants: IObject[];
}

// Basic formatters for the chart values
const dollarFormatter = (value: number) =>
  `$ ${Intl.NumberFormat("us").format(value).toString()}`;

const numberFormatter = (value: number) =>
  `${Intl.NumberFormat("us").format(value).toString()}`;

const formatDate = new Intl.DateTimeFormat("en-US", {
  month: "short",
  year: "numeric",
  day: "numeric",
});

export function ChartView({ revenue, applications, applicants }: IProps) {
  const [selectedKpi, setSelectedKpi] = useState(0);

  // map formatters by selectedKpi
  const formatters: { [key: string]: any } = {
    revenue: dollarFormatter,
    orders: numberFormatter,
    customers: numberFormatter,
  };

  let data = revenue;
  if (selectedKpi === 1) {
    data = applications;
  }

  if (selectedKpi === 2) {
    data = applicants;
  }

  const transformedData = data.map((dataObj) => {
    const date = new Date(dataObj.date);
    dataObj.date = formatDate.format(date);

    return dataObj;
  });

  return (
    <Card className={`${cardsBg} ${cardOutline}`}>
      <div className="md:flex justify-between">
        <div>
          <Flex
            justifyContent="start"
            className="space-x-0.5"
            alignItems="center"
          >
            <Title> Performance History </Title>
            <Icon
              icon={InformationCircleIcon}
              variant="simple"
              tooltip="Shows daily performance change"
            />
          </Flex>
          <Text> Daily increase or decrease per domain </Text>
        </div>
        <div className="mt-6 md:mt-0">
          <TabGroup
            index={selectedKpi}
            onIndexChange={(idx) => setSelectedKpi(idx)}
          >
            <TabList>
              <Tab className="hover:border-gray-400 dark:hover:border-blue-400">
                Revenue
              </Tab>
              <Tab className="hover:border-gray-400 dark:hover:border-blue-400">
                Applications
              </Tab>
              <Tab className="hover:border-gray-400 dark:hover:border-blue-400">
                Applicants
              </Tab>
            </TabList>
          </TabGroup>
        </div>
      </div>
      <AreaChart
        data={transformedData}
        index="date"
        categories={["value"]}
        colors={["blue"]}
        showLegend={true}
        valueFormatter={formatters[selectedKpi]}
        yAxisWidth={56}
        className="h-96 mt-8"
      />
    </Card>
  );
}
