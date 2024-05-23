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
import { chartData } from "@/app/lib/constants";

interface IObject {
  date: string;
  value: string;
}

interface IProps {
  revenue: IObject[];
  centers: IObject[];
  vehicles: IObject[];
  slots: IObject[];
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

export function ChartView({
  revenue,
  centers,
  slots,
  vehicles,
}: IProps) {
  const [selectedKpi, setSelectedKpi] = useState(0);

  // map formatters by selectedKpi
  const formatters: { [key: string]: any } = {
    revenue: dollarFormatter,
    orders: numberFormatter,
    customers: numberFormatter,
    vehicles: numberFormatter,
  };

  let data = revenue;
  if (selectedKpi === 1) {
    data = centers;
  }

  if (selectedKpi === 2) {
    data = slots;
  }

  if (selectedKpi === 3) {
    data = vehicles;
  }

  const transformedData = data.map((dataObj) => {
    const date = new Date(dataObj.date);
    dataObj.date = formatDate.format(date);

    return dataObj;
  });

  return (
    <Card className={`${cardsBg} ${cardOutline} rounded-md`}>
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
              {chartData.CHART_COLUMN.map((item) => (
                <Tab
                  key={item}
                  className="hover:border-gray-400 dark:hover:border-blue-400"
                >
                  {item}
                </Tab>
              ))}
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
