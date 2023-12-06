import { notFound } from "next/navigation";

import { Metadata } from "next";
import { dashboardRoutes } from "@/app/lib/routes";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import EditApplicantForm from "@/app/ui/users/users/edit-form";
import { fetchApplicantById, fetchRoles } from "@/app/lib/requests";

export const metadata: Metadata = {
  title: "Edit Applicant",
};

export default async function Page({ params }: _IdParams) {
  const id = params.id;
  const [applicant, roles] = await Promise.all([
    fetchApplicantById(id),
    fetchRoles(),
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
            href: `${dashboardRoutes.USERS.APPLICANTS.BASE}`,
          },
          {
            label: "Update Applicant",
            href: `${dashboardRoutes.USERS.APPLICANTS.BASE}/${id}/update`,
            active: true,
          },
        ]}
      />
      <EditApplicantForm applicant={applicant} roles={roles} />
    </main>
  );
}
