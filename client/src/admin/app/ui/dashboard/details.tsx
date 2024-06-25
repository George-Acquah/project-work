import {
  Card,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Title,
  Text,
  Flex,
} from "@tremor/react";
import { cardOutline, cardsBg } from "../themes";

// Sample data for the details component
const slotDetails = [
  { id: 1, status: "Occupied", vehicle: "Car - ABC123", time: "2 hours" },
  { id: 2, status: "Available", vehicle: "-", time: "-" },
  { id: 3, status: "Reserved", vehicle: "Car - XYZ789", time: "1 hour" },
  { id: 4, status: "Occupied", vehicle: "Bike - MNO456", time: "30 mins" },
  { id: 5, status: "Available", vehicle: "-", time: "-" },
];

const recentActivities = [
  { time: "10:00 AM", action: "Car - ABC123 parked in Slot 1" },
  { time: "10:30 AM", action: "Car - XYZ789 reserved Slot 3" },
  { time: "11:00 AM", action: "Bike - MNO456 parked in Slot 4" },
  { time: "11:30 AM", action: "Car - ABC123 left Slot 1" },
  { time: "12:00 PM", action: "Slot 1 marked available" },
];

export const Details = () => {
  return (
    <div className={`grid gap-6 md:grid-cols-2`}>
      {/* Slot Details */}
      <Card className={`${cardsBg} ${cardOutline} rounded-lg`}>
        <Title>Parking Slot Details</Title>
        <Text className="mb-4">Current status of parking slots</Text>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Vehicle</TableCell>
              <TableCell>Time Occupied</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {slotDetails.map((slot) => (
              <TableRow key={slot.id}>
                <TableCell>{slot.id}</TableCell>
                <TableCell>{slot.status}</TableCell>
                <TableCell>{slot.vehicle}</TableCell>
                <TableCell>{slot.time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Recent Activities */}
      <Card className={`${cardsBg} ${cardOutline} rounded-lg`}>
        <Title>Recent Activities</Title>
        <Text className="mb-4">Logs of recent parking activities</Text>
        <div>
          {recentActivities.map((activity, index) => (
            <Flex key={index} justifyContent="start" className="space-x-4 my-2">
              <Text>{activity.time}</Text>
              <Text className="truncate">{activity.action}</Text>
            </Flex>
          ))}
        </div>
      </Card>
    </div>
  );
};
