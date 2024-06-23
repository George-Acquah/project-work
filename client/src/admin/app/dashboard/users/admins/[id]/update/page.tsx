import { Metadata } from "next";
import { dashboardRoutes } from "@/app/lib/routes";
import UpdateUser from "@/app/ui/users/updates/update-user";

export const metadata: Metadata = {
  title: "Edit Admin",
};

export default async function UserPage({ params }: _IdParams) {
  const id = params.id;

  return (
    <UpdateUser id={id} href={dashboardRoutes.USERS.ALL.BASE} label="User" />
  );
}
