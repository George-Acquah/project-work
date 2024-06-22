import { notFound } from "next/navigation";
import Breadcrumbs from "@/app/ui/shared/breadcrumbs";
import { fetchUserById, fetchUserTypes } from "@/app/lib/requests";
import { updateUser } from "@/app/lib/actions";
import EditForms from "../shared/edit-forms";

export default async function UpdateUser({ id, label, href }: _IUpdate) {
  const [user, userTypes] = await Promise.all([
    fetchUserById(id),
    fetchUserTypes(),
  ]);

  const userFields: _IField[] = [
    {
      label: "Email",
      key: "email",
      type: "email",
      disabled: true,
      icon: "email",
    },
    {
      label: "Full Name",
      key: "fullName",
      type: "text",
      disabled: false,
      icon: "user",
    },
    {
      label: "User Type",
      key: "userType",
      type: "select",
      disabled: false,
      options: userTypes.data,
    },
    {
      label: "Verified Status",
      key: "isActive",
      type: "radio",
      disabled: false,
      radio: [
        {
          id: "verified",
          checked: user?.data?.isVerified ?? false,
          value: "true",
          label: "Verified",
        },
        {
          id: "unverified",
          checked: user?.data?.isVerified ?? true,
          value: "false",
          label: "Unverified",
        },
      ],
    },
  ];

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
        fields={userFields}
        updateEntity={updateUser}
        entityData={user.data}
        selecteds={user.data.userType}
      />
    </main>
  );
}
