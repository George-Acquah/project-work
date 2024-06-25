import {
  Card,
  Text,
  Metric,
  Flex,
  ProgressBar,
  BadgeDelta,
  DeltaType,
} from "@tremor/react";
import { cardOutline, cardsBg } from "../../themes";

// Utility function to format numbers with a maximum of 2 decimal places
const formatNumber = (value: number | string, maximumFractionDigits = 2) => {
  const number = typeof value === "string" ? parseFloat(value) : value;
  return isNaN(number)
    ? "0"
    : Intl.NumberFormat("en-US", {
        maximumFractionDigits,
      }).format(number);
};

const getDeltaType = (trend: number): DeltaType => {
  if (trend < -35) return "decrease";
  if (trend < 0) return "moderateDecrease";
  if (trend === 0) return "unchanged";
  if (trend < 30) return "moderateIncrease";
  return "increase";
};

export const KpiCard = ({
  title,
  total,
  trend,
  target,
  percentage,
}: {
  title: string;
  total: string | number;
  trend: number;
  target: string | number;
  percentage: number;
}) => {
  return (
    <Card className={`max-w-lg ${cardsBg} rounded-lg ${cardOutline}`}>
      <Flex alignItems="start">
        <div>
          <Text>{title}</Text>
          <Metric>{formatNumber(total)}</Metric>
        </div>
        <BadgeDelta
          className="rounded-full"
          deltaType={getDeltaType(trend)}
        >{`${formatNumber(trend)}%`}</BadgeDelta>
      </Flex>
      <Flex className="mt-4">
        <Text className="truncate">{`${formatNumber(
          percentage
        )}% (${formatNumber(total)})`}</Text>
        <Text>{`Target (${formatNumber(target)})`}</Text>
      </Flex>
      <ProgressBar value={percentage} color="sky" className="mt-2" />
    </Card>
  );
};
