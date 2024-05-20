import { Title } from "@tremor/react";
import { auth } from "@/auth";
import { notFound } from "next/navigation";
import EditAdminForm from "@/app/ui/admin/edit-form";
import { verifyUser } from "@/app/lib/requests";

const UpdateAdminProfile = async () => {
  const session = await auth();
  const applicant = await verifyUser() as _IUser;
  
      if (!applicant) {
        notFound();
      }

  return (
    <main>
      <Title>Edit Your Profile Here</Title>
      <EditAdminForm applicant={ applicant} />
    </main>
  );
};

export default UpdateAdminProfile;
