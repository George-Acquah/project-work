import Breadcrumbs from "../shared/breadcrumbs";
import Forms from "../shared/common-form";

interface _IAddForm {
  breadcrumbs: Breadcrumb[];
  entityType: string;
  formType: "single" | "group";
  route: string;
  addFunction: any;
  fieldConfigs: (options: string[]) => _IDetail[];
  fetchOptionsFn?: () => Promise<_IApiResponse<string[]>>;
}

export default async function AddForm({
  breadcrumbs,
  entityType,
  formType,
  route,
  addFunction,
  fieldConfigs,
  fetchOptionsFn,
}: _IAddForm) {
  const { data: userTypes } = fetchOptionsFn ? await fetchOptionsFn() : { data: [] };
  return (
    <main>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <Forms
        action={addFunction}
        actionType="add"
        type={entityType}
        formType={formType}
        route={route}
        fieldConfigs={fieldConfigs(userTypes)}
      />
    </main>
  );
}
