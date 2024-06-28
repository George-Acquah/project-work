import { Title } from "@tremor/react";
import { auth } from "@/auth";
import { notFound } from "next/navigation";
import { fetchUserById, fetchUserProfile, fetchUserTypes, verifyUser } from "@/app/lib/requests";
import { updateUser } from "@/app/lib/actions";
import { dashboardRoutes } from "@/app/lib/routes";
import { updateUserFields } from "@/constants/users.constants";
import EditForms from "@/app/ui/shared/edit-forms";

const UpdateAdminProfile = async () => {
  const session = await auth();
  console.log(session?.user);
  if (!session) {
    console.log('NO SESSION')
  }
  const [{ data: admin }, { data: userTypes }, { data: profile }] = await Promise.all([
    fetchUserById(session?.user._id!),
    fetchUserTypes(),
    fetchUserProfile(session?.user._id!),
  ]);
  
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
        formType="group"
        data={admin}
        fieldConfigs={updateUserFields(userTypes, admin.isVerified, admin, profile, 'group')}
      />
    </main>
  );
};

export default UpdateAdminProfile;
