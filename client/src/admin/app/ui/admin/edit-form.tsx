"use client";

import React from "react";
import { useFormState } from "react-dom";
import { updateAdmin } from "@/app/lib/actions";
import { formatAdminDetails } from "@/app/lib/utils";
import CommonDivComp, { EditBtn, GlobalError } from "./edit-form-helper";
import { dashboardRoutes } from "@/app/lib/routes";

export default function EditAdminForm({
  applicant,
}: { applicant: _IUser }) {

  const admin = formatAdminDetails(applicant);

  // Initial state for form
  const initialState: any = {
    message: null,
    errors: {},
  };

  // Function to update applicant with its ID
  const updateApplicantWithId = updateAdmin.bind(
    null,
    admin._id,
  );
  
  // Use useFormState hook for form state
  const [state, dispatch] = useFormState(updateApplicantWithId, initialState);

  return (
    <form action={dispatch}>
      <div className="space-y-4">
        <CommonDivComp
          admin={admin}
          title="User Details"
          errors={state.errors ?? null}
        />
        <CommonDivComp
          admin={admin}
          title="Profile Details"
          errors={state.errors ?? null}
        />
        <CommonDivComp
          admin={admin}
          title="Contact Details"
          errors={state.errors ?? null}
        />
        <CommonDivComp admin={admin} title="Others" errors={null} />
      </div>

      <EditBtn href={dashboardRoutes.ADMIN.BASE} text="Updating Profile" label="Update Profile"/>
      <GlobalError message={state.message ?? null} />
    </form>
  );
}
