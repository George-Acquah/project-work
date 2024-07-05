import { fetchUserTypes } from "@/app/lib/requests";
import Breadcrumbs from "../shared/breadcrumbs";
import Forms from "../shared/common-form";
import { dashboardRoutes } from "@/app/lib/routes";
import { addVehicleFields } from "@/constants/vehicles.constants";
import Stepper from "../shared/stepper";
import StepForms from "../shared/common-step-form";

interface _IAddVehicles {
  breadcrumbs: Breadcrumb[];
  addFunction: any;
}

export default async function AddVehicle({
  breadcrumbs,
  addFunction,
}: _IAddVehicles) {
    const steps = [
      "Vehicle Details",
      "Insurance Details",
      "Registration Details",
    ];
  const { data: userTypes } = await fetchUserTypes();
  return (
    <main>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      {/* <Forms
        action={addFunction}
        actionType="add"
        type="Vehicle"
        formType="group"
        route={dashboardRoutes.PARKING_LOTS.BASE}
        fieldConfigs={addVehicleFields( 'group' ,userTypes)}
      /> */}
      <Stepper steps={steps} />
      <StepForms
        action={addFunction}
        actionType="add"
        type="Vehicle"
        formType="group"
        route={dashboardRoutes.PARKING_LOTS.BASE}
        fieldConfigs={addVehicleFields("group", userTypes)}
      />
    </main>
  );
}
