import { notFound } from "next/navigation";

import { Metadata } from "next";
import { fetchSingleReservation } from "@/app/lib/requests";
import UpdateReservation from "@/app/ui/reservations/update-reservation";

export const metadata: Metadata = {
  title: "Edit Reservation",
};

export default async function UpdateReservationPage({ params }: _IdParams) {
  const id = params.id;
  const reservation = await fetchSingleReservation(id);

  if (!reservation) {
    notFound();
  }

  return (
    <main>
      <UpdateReservation id={id} />
    </main>
  );
}
