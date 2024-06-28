import { notFound } from "next/navigation";
import Breadcrumbs from "@/app/ui/shared/breadcrumbs";
import { fetchUserById, fetchUserProfile, fetchUserTypes } from "@/app/lib/requests";
import { updateUser } from "@/app/lib/actions";
import EditForms from "../shared/edit-forms";
import { updateUserFields } from "@/constants/users.constants";

export default async function UpdateUser({ id, label, href }: _IUpdate) {
  const [{ data: user }, { data: userTypes }, { data: profile }] =
    await Promise.all([
      fetchUserById(id),
      fetchUserTypes(),
      fetchUserProfile(id),
    ]);
  
  console.log(user);

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
        type={label}
        updateFunction={updateUser}
        formType="group"
        data={user}
        fieldConfigs={updateUserFields(userTypes, user.isVerified, user, profile)}
      />
    </main>
  );
}
