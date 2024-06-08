import { z } from "zod";

const ReservationSchema = z.object({
  duration: z.coerce.number().min(10, "You can only reserve a slot for above"),
});

export default ReservationSchema;
