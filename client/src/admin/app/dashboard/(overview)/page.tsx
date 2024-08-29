import {
  TabGroup,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Grid,
  Title,
  Text,
} from "@tremor/react";
import { KpiCard } from "@/app/ui/dashboard/cards/kpi-card";
import { ChartView } from "@/app/ui/dashboard/charts";
import { Details } from "@/app/ui/dashboard/details";
import { textColor } from "@/app/ui/themes";
import { inter } from "@/app/ui/font";
import { Suspense } from "react";
import { ChartSkeleton } from "@/app/ui/shared/skeletons";

interface KpiData {
  totalSlots: number;
  occupiedSlots: number;
  availableSlots: number;
  dailyReservations: number;
  weeklyRevenue: number;
  monthlyRevenue: number;
}

interface IObject {
  date: string;
  value: number;
}

interface ChartData {
  revenue: IObject[];
  vehicles: IObject[];
  centers: IObject[];
  slots: IObject[];
}

interface DetailData {
  id: number;
  type: string;
  user: string;
  time: string;
}

interface DashboardData {
  kpis: KpiData;
  charts: ChartData;
  details: DetailData[];
}

// Simulate fetching data function
const fetchData = async (): Promise<DashboardData> => {
  return {
    kpis: {
      totalSlots: 120,
      occupiedSlots: 85,
      availableSlots: 35,
      dailyReservations: 30,
      weeklyRevenue: 3000,
      monthlyRevenue: 12000,
    },
    charts: {
      revenue: [
        { date: "2024-01-01", value: 1500 },
        { date: "2024-01-02", value: 2300 },
        // more data points...
      ],
      centers: [
        { date: "2024-01-01", value: 5 },
        { date: "2024-01-02", value: 6 },
        { date: "2024-01-03", value: 7 },
        { date: "2024-01-04", value: 5 },
        { date: "2024-01-05", value: 8 },
        { date: "2024-01-06", value: 9 },
        { date: "2024-01-07", value: 6 },
        { date: "2024-01-08", value: 7 },
        { date: "2024-01-09", value: 10 },
        { date: "2024-01-10", value: 5 },
        { date: "2024-01-11", value: 6 },
        { date: "2024-01-12", value: 8 },
        { date: "2024-01-13", value: 7 },
        { date: "2024-01-14", value: 9 },
        { date: "2024-01-15", value: 10 },
      ],
      vehicles: [
        { date: "2024-01-01", value: 20 },
        { date: "2024-01-02", value: 25 },
        { date: "2024-01-03", value: 22 },
        { date: "2024-01-04", value: 28 },
        { date: "2024-01-05", value: 24 },
        { date: "2024-01-06", value: 30 },
        { date: "2024-01-07", value: 26 },
        { date: "2024-01-08", value: 29 },
        { date: "2024-01-09", value: 23 },
        { date: "2024-01-10", value: 27 },
        { date: "2024-01-11", value: 31 },
        { date: "2024-01-12", value: 29 },
        { date: "2024-01-13", value: 26 },
        { date: "2024-01-14", value: 32 },
        { date: "2024-01-15", value: 28 },
      ],
      slots: [
        { date: "2024-01-01", value: 50 },
        { date: "2024-01-02", value: 48 },
        { date: "2024-01-03", value: 47 },
        { date: "2024-01-04", value: 49 },
        { date: "2024-01-05", value: 46 },
        { date: "2024-01-06", value: 45 },
        { date: "2024-01-07", value: 47 },
        { date: "2024-01-08", value: 48 },
        { date: "2024-01-09", value: 46 },
        { date: "2024-01-10", value: 49 },
        { date: "2024-01-11", value: 50 },
        { date: "2024-01-12", value: 44 },
        { date: "2024-01-13", value: 45 },
        { date: "2024-01-14", value: 48 },
        { date: "2024-01-15", value: 47 },
      ],
    },
    details: [
      { id: 1, type: "Reservation", user: "User A", time: "10:00 AM" },
      { id: 2, type: "Reservation", user: "User B", time: "11:00 AM" },
      // ...more data
    ],
  };
};

export default async function Page() {
  // Initialize state with the correct type
  const data = await fetchData();

  return (
    <main className={`${textColor}`}>
      <Title className={`${inter.className} text-[28px]`}>
        Smart Car Parking Dashboard
      </Title>
      <Text>Monitor and manage your parking operations efficiently.</Text>

      <TabGroup className="mt-6">
        <TabList>
          <Tab>Overview</Tab>
          <Tab>Slots</Tab>
          <Tab>Details</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {/* Overview of key metrics */}
            <Grid numItemsMd={2} numItemsLg={3} className="gap-6 mt-6">
              <KpiCard
                title={"Total Slots"}
                total={data.kpis.totalSlots.toString()}
                trend={0}
                target={data.kpis.totalSlots.toString()}
                percentage={100}
              />
              <KpiCard
                title={"Occupied Slots"}
                total={data.kpis.occupiedSlots.toString()}
                trend={10}
                target={data.kpis.totalSlots.toString()}
                percentage={
                  (data.kpis.occupiedSlots / data.kpis.totalSlots) * 100
                }
              />
              <KpiCard
                title={"Available Slots"}
                total={data.kpis.availableSlots.toString()}
                trend={-5}
                target={data.kpis.totalSlots.toString()}
                percentage={
                  (data.kpis.availableSlots / data.kpis.totalSlots) * 100
                }
              />
              <KpiCard
                title={"Daily Reservations"}
                total={data.kpis.dailyReservations.toString()}
                trend={15}
                target={"50"}
                percentage={(data.kpis.dailyReservations / 50) * 100}
              />
              <KpiCard
                title={"Weekly Revenue"}
                total={`${data.kpis.weeklyRevenue}`}
                trend={25}
                target={"4000"}
                percentage={(data.kpis.weeklyRevenue / 4000) * 100}
              />
              <KpiCard
                title={"Monthly Revenue"}
                total={`${data.kpis.monthlyRevenue}`}
                trend={5}
                target={"15000"}
                percentage={(data.kpis.monthlyRevenue / 15000) * 100}
              />
            </Grid>

            {/* Charts for visualization */}
            <div className="mt-6">
              <Suspense fallback={<ChartSkeleton />}>
                <ChartView
                  revenue={data.charts.revenue}
                  vehicles={data.charts.vehicles}
                  centers={data.charts.centers}
                  slots={data.charts.slots}
                />
              </Suspense>
            </div>
          </TabPanel>
          <TabPanel>
            {/* Slot management */}
            <Grid numItemsMd={2} numItemsLg={3} className="gap-6 mt-6">
              <KpiCard
                title={"Total Slots"}
                total={data.kpis.totalSlots.toString()}
                trend={0}
                target={data.kpis.totalSlots.toString()}
                percentage={100}
              />
              <KpiCard
                title={"Occupied Slots"}
                total={data.kpis.occupiedSlots.toString()}
                trend={10}
                target={data.kpis.totalSlots.toString()}
                percentage={
                  (data.kpis.occupiedSlots / data.kpis.totalSlots) * 100
                }
              />
              <KpiCard
                title={"Available Slots"}
                total={data.kpis.availableSlots.toString()}
                trend={-5}
                target={data.kpis.totalSlots.toString()}
                percentage={
                  (data.kpis.availableSlots / data.kpis.totalSlots) * 100
                }
              />
              <KpiCard
                title={"Daily Reservations"}
                total={data.kpis.dailyReservations.toString()}
                trend={15}
                target={"50"}
                percentage={(data.kpis.dailyReservations / 50) * 100}
              />
              <KpiCard
                title={"Weekly Reservations"}
                total={"200"}
                trend={5}
                target={"250"}
                percentage={80}
              />
              <KpiCard
                title={"Monthly Reservations"}
                total={"800"}
                trend={5}
                target={"1000"}
                percentage={80}
              />
            </Grid>
          </TabPanel>
          <TabPanel>
            {/* Detailed information and analytics */}
            <div className="mt-6">
              <Details />
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </main>
  );
}
