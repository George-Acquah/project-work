import { Metadata } from "next";
import { dashboardRoutes } from "@/app/lib/routes";
import UserUpdate from "../../../update";

export const metadata: Metadata = {
  title: "Edit User",
};

export default async function UserPage({ params }: _IdParams) {
  const id = params.id;

  return (
    <UserUpdate
      id={id}
      href={dashboardRoutes.USERS.ALL.BASE}
      label="User"
    />
  );
}
