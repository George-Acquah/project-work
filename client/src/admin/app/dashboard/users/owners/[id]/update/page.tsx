import { Metadata } from "next";
import { dashboardRoutes } from "@/app/lib/routes";
import UserUpdate from "../../../update";

export const metadata: Metadata = {
  title: "Edit Owner",
};

export default async function Page({ params }: _IdParams) {
  const id = params.id;

  return (
    <UserUpdate
      id={id}
      href={dashboardRoutes.USERS.OWNERS.BASE}
      label="Owner"
    />
  );
}
