import { notFound } from "next/navigation";

import { Metadata } from "next";
import { fetchCenterById } from "@/app/lib/requests";
import Breadcrumbs from "@/app/ui/shared/breadcrumbs";
import CENTERS_BREADCRUMBS from "@/constants/centers.constants";
import UpdateCenter from "@/app/ui/centers/update-center";
import { dashboardRoutes } from "@/app/lib/routes";

export const metadata: Metadata = {
  title: "Edit Center",
};

export default async function Page({ params }: _IdParams) {
  const id = params.id;
  const center = await fetchCenterById(id);

  if (!center) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs breadcrumbs={CENTERS_BREADCRUMBS(id).UPDATE_CENTER} />
      {/* <EditApplicantForm applicant={applicant} roles={roles} /> */}
      <h1 className="text-center text-3xl">{JSON.stringify(center)}</h1>
      <UpdateCenter id={id} label={"Center"} href={dashboardRoutes.PARKING_LOTS.BASE} />
    </main>
  );
}
