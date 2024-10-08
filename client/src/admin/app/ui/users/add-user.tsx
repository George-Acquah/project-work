import { fetchUserTypes } from "@/app/lib/requests";
import Breadcrumbs from "../shared/breadcrumbs";
import Forms from "../shared/common-form";
import { addUserFields } from "@/constants/users.constants";

interface _IAddPages {
  breadcrumbs: Breadcrumb[];
  route: string;
  type: "user" | "customer" | "owner";
  addFunction: any;
}

export default async function AddUser({ breadcrumbs, route, type, addFunction }: _IAddPages) {
  const { data: userTypes } = await fetchUserTypes();
  return (
    <main>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <Forms
        action={addFunction}
        actionType="add"
        type={type}
        formType="single"
        route={route}
        fieldConfigs={addUserFields(userTypes)}
      />
    </main>
  );
}
