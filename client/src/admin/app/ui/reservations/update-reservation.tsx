import { notFound } from "next/navigation";
import Breadcrumbs from "@/app/ui/shared/breadcrumbs";
import { fetchCenterById, fetchSingleReservation } from "@/app/lib/requests";
import { updateCenter } from "@/app/lib/actions";
import CENTERS_BREADCRUMBS, {
  updateParkingCenterFields,
} from "@/constants/centers.constants";
import Forms from "../shared/common-form";
import { dashboardRoutes } from "@/app/lib/routes";
import { RESERVATIONS_BREADCRUMBS, updateReservationFields } from "@/constants/reservations.constants";

export default async function UpdateReservation({ id }: _Id) {
  const reservation = await fetchSingleReservation(id);
  const a = ["Class A", "Class B", "Class C"];

  if (!reservation) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs breadcrumbs={RESERVATIONS_BREADCRUMBS(id).VIEW_RESERVATION} />
      <Forms
        id={id}
        action={updateCenter}
        actionType="update"
        type="Reservation"
        formType="group"
        route={dashboardRoutes.RESERVATIONS.BASE}
        fieldConfigs={updateReservationFields(a, reservation)}
      />
    </main>
  );
}
