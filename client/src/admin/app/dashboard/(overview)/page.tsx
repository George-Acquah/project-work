// import CardWrapper from "@/app/ui/dashboard/cards";
// import RevenueChart from "@/app/ui/dashboard/revenue-chart";
// import LatestInvoices from "@/app/ui/dashboard/latest-invoices";
import { lusitana } from "@/app/ui/font";
import { Suspense } from 'react';
import {
  RevenueChartSkeleton,
  LatestInvoicesSkeleton,
  CardsSkeleton,
} from "@/app/ui/skeletons";
import { TabGroup, TabList, Tab, TabPanels, TabPanel, Grid, Card, Title, Text } from "@tremor/react";
import { KpiCard } from "@/app/ui/dashboard/cards/kpi-card";
import { ChartView } from "@/app/ui/dashboard/charts";
import { Details } from "@/app/ui/dashboard/details";
import { textColor } from "@/app/ui/themes";

export default async function Page() {

  return (
    <main className={`${textColor}`}>
      <Title>Dashboard</Title>
      <Text>View core metrics on the state of your company.</Text>
      <TabGroup className="mt-6">
        <TabList>
          <Tab>Overview</Tab>
          <Tab>Slots</Tab>
          <Tab>Details</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Grid numItemsMd={2} numItemsLg={3} className="gap-6 mt-6">
              <KpiCard
                title={"Total Admitted Applicants"}
                total={"1000"}
                trend={20}
                target={"$ 10,500"}
                percentage={80}
              />
              <KpiCard
                title={"Total Un-Admitted Applicants"}
                total={"10"}
                trend={-20}
                target={"$ 10,500"}
                percentage={8}
              />
              <KpiCard
                title={"Weekly Application Form Downloads"}
                total={"0"}
                trend={0}
                target={"$ 10,500"}
                percentage={20}
              />
              <KpiCard
                title={"New Applications"}
                total={"0"}
                trend={-5}
                target={"$ 10,500"}
                percentage={50}
              />
            </Grid>
            <div className="mt-6">
              <ChartView
                revenue={[]}
                vehicles={[]}
                centers={[]}
                slots={[]}
              />
            </div>
          </TabPanel>
          <TabPanel>
            <Grid numItemsMd={2} numItemsLg={3} className="gap-6 mt-6">
              <KpiCard
                title={"Total Slots"}
                total={"1000"}
                trend={20}
                target={"$ 10,500"}
                percentage={80}
              />
              <KpiCard
                title={"Total Slots Available"}
                total={"10"}
                trend={-20}
                target={"$ 10,500"}
                percentage={8}
              />
              <KpiCard
                title={"Daily Slots Reserved"}
                total={"0"}
                trend={0}
                target={"$ 10,500"}
                percentage={20}
              />
              <KpiCard
                title={"Weekly Slots Reserved"}
                total={"0"}
                trend={0}
                target={"$ 10,500"}
                percentage={20}
              />
              <KpiCard
                title={"Monthly Slots Reserved"}
                total={"0"}
                trend={0}
                target={"$ 10,500"}
                percentage={20}
              />
            </Grid>
          </TabPanel>
          <TabPanel>
            <div className="mt-6">
              <Details />
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>

      {/* <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices />
        </Suspense>
      </div> */}
    </main>
  );
}
