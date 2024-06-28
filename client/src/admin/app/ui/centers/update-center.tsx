import { notFound } from "next/navigation";
import Breadcrumbs from "@/app/ui/shared/breadcrumbs";
import { fetchCenterById } from "@/app/lib/requests";
import { updateCenter, updateUser } from "@/app/lib/actions";
import EditForms from "../shared/edit-forms";
import CENTERS_BREADCRUMBS, { updateParkingCenterFields } from "@/constants/centers.constants";

// Slot Interface
interface Slot {
  _id: string;
  type: string;
  slot_name: string;
  description: string;
  isAvailable: boolean;
  center_id: string;
  __v: number;
}

// Center Image Interface
interface CenterImage {
  _id: string;
  file_id: string;
  filename: string;
  mimetype: string;
  center_id: string;
  __v: number;
}

// Parking Center Interface
interface ParkingCenter {
  _id: string;
  center_name: string;
  description: string;
  type: string;
  owner: string;
  __v: number;
  slots: Slot[];
  center_images: CenterImage[];
}

export default async function UpdateCenter({ id, label, href }: _IUpdate) {
  const { data: center } = await fetchCenterById(id);
  const a = ["Class A", "Class B", "Class C"];

  if (!center) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs breadcrumbs={CENTERS_BREADCRUMBS(id).UPDATE_CENTER} />
      <EditForms
        id={id}
        updateFunction={updateCenter}
        type="Parking Center"
        // entityData={center}
        formType="single"
        route="/parking-centers"
        fieldConfigs={updateParkingCenterFields(a, center.isVerified, center)}
      />
    </main>
  );
}
