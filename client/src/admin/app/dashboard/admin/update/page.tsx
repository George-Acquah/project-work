import { Title } from "@tremor/react";
import { auth } from "@/auth";
import { notFound } from "next/navigation";
import { verifyUser } from "@/app/lib/requests";
import EditForms from "@/app/ui/shared/edit-forms";
import { updateAdmin, updateUser } from "@/app/lib/actions";
import { dashboardRoutes } from "@/app/lib/routes";

const UpdateAdminProfile = async () => {
  const session = await auth();
  const admin = await verifyUser() as _IUser;
      if (!admin) {
        notFound();
      }

  return (
    <main>
      <Title>Edit Your Profile Here</Title>
      <div className="mt-8" />
      <EditForms
        id={admin._id}
        route={`${dashboardRoutes.ADMIN.BASE}`}
        type="user"
        updateFunction={updateUser}
        entityData={admin}
        isVerified={admin.isVerified}
        selecteds={admin.userType}
      />
      {/* <EditForms
        id={""}
        fields={[]}
        updateEntity={updateAdmin}
        entityData={undefined}
        selecteds={undefined}
      /> */}
    </main>
  );
};

export default UpdateAdminProfile;
