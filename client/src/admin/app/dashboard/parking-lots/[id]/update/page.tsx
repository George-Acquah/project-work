import { notFound } from "next/navigation";

import { Metadata } from "next";
import { dashboardRoutes } from "@/app/lib/routes";
import Breadcrumbs from "@/app/ui/breadcrumbs";
// import EditApplicantForm from "@/app/ui/users/applicants/edit-form";
import { fetchUserById, fetchUserTypes } from "@/app/lib/requests";

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
            label: "Parking Centers",
            href: `${dashboardRoutes.PARKING_LOTS.BASE}`,
          },
          {
            label: "Update Parking Centers",
            href: `${dashboardRoutes.PARKING_LOTS.BASE}/${id}/update`,
            active: true,
          },
        ]}
      />
      {/* <EditApplicantForm applicant={applicant} roles={roles} /> */}
    </main>
  );
}
