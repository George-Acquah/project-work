import { notFound } from "next/navigation";
import Breadcrumbs from "@/app/ui/shared/breadcrumbs";
import { fetchUserById, fetchUserTypes } from "@/app/lib/requests";
import { updateUser } from "@/app/lib/actions";
import EditForms from "../../shared/edit-forms";
import { dashboardRoutes } from "@/app/lib/routes";

export default async function UpdateUser({ id, label, href }: _IUpdate) {
  const [user, userTypes] = await Promise.all([
    fetchUserById(id),
    fetchUserTypes(),
  ]);

  if (!user) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          {
            label,
            href,
          },
          {
            label: `Update ${label}`,
            href: `${href}/${id}/update`,
            active: true,
          },
        ]}
      />
      <EditForms
        id={id}
        route={`${dashboardRoutes.USERS.ALL.BASE}`}
        options={userTypes.data}
        type="user"
        updateFunction={updateUser}
        entityData={user.data}
        isVerified={user.data.isVerified}
        selecteds={user.data.userType}
      />
    </main>
  );
}
