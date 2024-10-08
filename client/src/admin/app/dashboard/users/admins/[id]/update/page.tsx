import { Metadata } from "next";
import { dashboardRoutes } from "@/app/lib/routes";
import UpdateUser from "@/app/ui/users/update-user";

export const metadata: Metadata = {
  title: "Edit Admin",
};

export default async function UserPage({ params }: _IdParams) {
  const id = params.id;

  return (
    <UpdateUser id={id} href={dashboardRoutes.USERS.ADMINS.BASE} label="Admin" formType={"group"} />
  );
}
