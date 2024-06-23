import { fetchUserTypes } from "@/app/lib/requests";
import { updateUser } from "@/app/lib/actions";
import Breadcrumbs from "../shared/breadcrumbs";
import AddForms from "../shared/add-forms";

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
      <AddForms
        options={userTypes}
        route={route}
        type={type}
        addFunction={addFunction}
      />
    </main>
  );
}
