import { notFound } from "next/navigation";
import Breadcrumbs from "@/app/ui/shared/breadcrumbs";
import { fetchCenterById } from "@/app/lib/requests";
import { updateCenter } from "@/app/lib/actions";
import CENTERS_BREADCRUMBS, { updateParkingCenterFields } from "@/constants/centers.constants";
import Forms from "../shared/common-form";
import { dashboardRoutes } from "@/app/lib/routes";

export default async function UpdateCenter({ id }: _Id) {
  const { data: center } = await fetchCenterById(id);
  const a = ["Class A", "Class B", "Class C"];

  if (!center) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs breadcrumbs={CENTERS_BREADCRUMBS(id).UPDATE_CENTER} />
      <Forms
        id={id}
        action={updateCenter}
        actionType="update"
        type="Parking Center"
        formType="single"
        route={dashboardRoutes.PARKING_LOTS.BASE}
        fieldConfigs={updateParkingCenterFields(a, center.isVerified, center)}
      />
    </main>
  );
}
