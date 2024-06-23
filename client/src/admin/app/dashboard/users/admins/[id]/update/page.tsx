import { notFound } from "next/navigation";

import { Metadata } from "next";
import { dashboardRoutes } from "@/app/lib/routes";
import Breadcrumbs from "@/app/ui/shared/breadcrumbs";
import { fetchUserById, fetchUserTypes } from "@/app/lib/requests";
import EditForms from "@/app/ui/shared/edit-forms";

export const metadata: Metadata = {
  title: "Edit Applicant",
};

export default async function Page({ params }: _IdParams) {
  const id = params.id;
  const [applicant, roles] = await Promise.all([
    fetchUserById(id),
    fetchUserTypes(),
  ]);

  console.log(applicant);

  if (!applicant) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          {
            label: "Applicants",
            href: `${dashboardRoutes.USERS.ADMINS.BASE}`,
          },
          {
            label: "Update Applicant",
            href: `${dashboardRoutes.USERS.ADMINS.BASE}/${id}/update`,
            active: true,
          },
        ]}
      />
      <EditForms id={""} fields={[]} updateEntity={undefined} entityData={undefined} selecteds={undefined}  />
    </main>
  );
}
