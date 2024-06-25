import { notFound } from "next/navigation";
import Breadcrumbs from "@/app/ui/shared/breadcrumbs";
import { fetchUserById, fetchUserTypes } from "@/app/lib/requests";
import { updateUser } from "@/app/lib/actions";
import EditForms from "../shared/edit-forms";

export default async function UpdateCenter({ id, label, href }: _IUpdate) {
  const [{ data: user }, { data: userTypes }] = await Promise.all([
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
        route={href}
        options={userTypes}
        type={label}
        updateFunction={updateUser}
        entityData={user}
        isVerified={user.isVerified}
        selecteds={user.userType}
      />
    </main>
  );
}
