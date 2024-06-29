import { Metadata } from "next";
import { dashboardRoutes } from "@/app/lib/routes";
import UpdateUser from "@/app/ui/users/update-user";

export const metadata: Metadata = {
  title: "Edit Customer",
};

export default async function UpdateCustomerPage({ params }: _IdParams) {
  const id = params.id;

  return (
    <UpdateUser id={id} href={dashboardRoutes.USERS.CUSTOMERS.BASE} label="Customer" formType="group"/>
  );
}
