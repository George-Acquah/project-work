import { Metadata } from "next";
import { dashboardRoutes } from "@/app/lib/routes";
import UserUpdate from "../../../update";

export const metadata: Metadata = {
  title: "Edit Customer",
};

export default async function CustomerPage({ params }: _IdParams) {
  const id = params.id;

  return (
    <UserUpdate
      id={id}
      href={dashboardRoutes.USERS.CUSTOMERS.BASE}
      label="Customer"
    />
  );
}
