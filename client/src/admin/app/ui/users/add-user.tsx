import { fetchUserTypes } from "@/app/lib/requests";
import EditForms from "../shared/edit-forms";

export default async function AddUser() {
  const userTypes = await fetchUserTypes();

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
          checked: false,
          value: "true",
          label: "Verified",
        },
        {
          id: "unverified",
          checked: true,
          value: "false",
          label: "Unverified",
        },
      ],
    },
  ];

  return (
    <main>
      <EditForms
        id={""}
        fields={[]}
        updateEntity={undefined}
        entityData={undefined}
        selecteds={undefined}
      />
    </main>
  );
}
