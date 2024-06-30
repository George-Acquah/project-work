import { fetchUserTypes } from "@/app/lib/requests";
import Breadcrumbs from "../shared/breadcrumbs";
import Forms from "../shared/common-form";
import { addUserFields } from "@/constants/users.constants";
import { dashboardRoutes } from "@/app/lib/routes";

interface _IAddCenters {
  breadcrumbs: Breadcrumb[];
  // route: string;
  addFunction: any;
}

export default async function AddCenter({
  breadcrumbs,
  // route,
  addFunction,
}: _IAddCenters) {
  const { data: userTypes } = await fetchUserTypes();
  return (
    <main>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <Forms
        action={addFunction}
        actionType="add"
        type="Parking Center"
        formType="single"
        route={dashboardRoutes.PARKING_LOTS.BASE}
        fieldConfigs={addUserFields(userTypes)}
      />
    </main>
  );
}
