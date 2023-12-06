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
  total: string;
  trend: number;
  target: string;
  percentage: number;
}) => {
  return (
    <Card className={`max-w-lg ${cardsBg} rounded-lg ${cardOutline}`}>
      <Flex alignItems="start">
        <div>
          <Text>{title}</Text>
          <Metric>{total}</Metric>
        </div>
        <BadgeDelta
          className="rounded-full"
          deltaType={getDeltaType(trend)}
        >{`${trend}%`}</BadgeDelta>
      </Flex>
      <Flex className="mt-4">
        <Text className="truncate">{`${percentage}% (${total})`}</Text>
        <Text>{`Target(${target})`}</Text>
      </Flex>
      <ProgressBar value={percentage} className="mt-2" />
    </Card>
  );
};
