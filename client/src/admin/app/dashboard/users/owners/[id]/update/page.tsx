import { Metadata } from "next";
import { dashboardRoutes } from "@/app/lib/routes";
import UpdateUser from "@/app/ui/users/update-user";

export const metadata: Metadata = {
  title: "Edit Owner",
};

export default async function Page({ params }: _IdParams) {
  const id = params.id;

  return (
    <UpdateUser
      id={id}
      href={dashboardRoutes.USERS.OWNERS.BASE}
      label="Owner"
    />
  );
}
