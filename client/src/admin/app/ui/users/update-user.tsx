import { notFound } from "next/navigation";
import Breadcrumbs from "@/app/ui/shared/breadcrumbs";
import { fetchUserById, fetchUserProfile, fetchUserTypes } from "@/app/lib/requests";
import { updateUser } from "@/app/lib/actions";
import { updateUserFields } from "@/constants/users.constants";
import Forms from "../shared/common-form";

interface _IUpdate {
  id: string;
  label: string;
  href: string;
  formType?: 'group' | 'single';
}

export default async function UpdateUser({ id, label, href, formType  }: _IUpdate) {
  const [{ data: user }, { data: userTypes }, { data: profile }] =
    await Promise.all([
      fetchUserById(id),
      fetchUserTypes(),
      fetchUserProfile(id),
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
      <Forms
        id={id}
        route={href}
        type={label}
        actionType="update"
        action={updateUser}
        formType="group"
        data={user}
        fieldConfigs={updateUserFields(
          userTypes,
          user.isVerified,
          user,
          profile,
          formType
        )}
      />
    </main>
  );
}
