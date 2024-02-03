import { z } from "zod";

const AdminSchema = z.object({
  id: z.string(),
  username: z.string({
    invalid_type_error: "Please input username",
    required_error: "Please input first name.",
  }),
  email: z
    .string({
      invalid_type_error: "Please provide a valid email.",
      required_error: "Please provide email.",
    })
    .email("Please provide email."),
  first_name: z
    .string({
      invalid_type_error: "Please input valid first name.",
      required_error: "Please input first name.",
    })
    .min(4, "Please input first name."),
  last_name: z
    .string({
      invalid_type_error: "Please input last name.",
      required_error: "Please input last name.",
    })
    .min(4, "Please input last name."),
  contact_no: z.string({
    invalid_type_error: "Please provide your contact.",
  }),
  // .min(10, "Please input valid contact no."),
  area: z.string({
    invalid_type_error: "Please provide your area.",
  }),
  // .min(4, "Please provide your area."),
  city: z.string({
    invalid_type_error: "Please provide your city.",
  }),
  // .min(4, "Please provide your city.")
  state: z.string({
    invalid_type_error: "Please provide your state.",
  }),
  //     .min(4, "Please provide your state."),
  //   pinCode: z.string({
  //     invalid_type_error: "Please provide your pin code.",
  //   }),
});

const CenterSchema = z.object({
  id: z.string(),
  center_name: z.string({
    invalid_type_error: "Please input center name",
    required_error: "Please input center name.",
  }),
  address: z.string({
    invalid_type_error: "Please provide a valid addresss.",
    required_error: "Please provide address.",
  }),
  description: z.string({
    invalid_type_error: "Please provide a valid description.",
    required_error: "Please provide description.",
  }),
  latitude: z.coerce.number({
    invalid_type_error: "Please provide a latitude for the center.",
  }),
  longitude: z.coerce.number({
    invalid_type_error: "Please provide a longitude for the center.",
  }),
  // images: z.
});

const ApplicantSchema = z.object({
  id: z.string(),
  userType: z.enum(["admin", "applicant", "moderator", "student", "user"], {
    invalid_type_error: "Please select a user role.",
  }),
  isActive: z.enum(["true", "false"], {
    invalid_type_error: "Please select an active status.",
  }),
});

const RequestReservationSchema = z.object({
  reservation_duration: z.coerce.number({
    invalid_type_error: "Please provide a duration for the reservation.",
  }),
  start_time: z.coerce.date({
    invalid_type_error: "Please provide a starting time for the reservationr.",
  }),
});

const ReserveSlotSchema = z.object({
  center_id: z.string({
    invalid_type_error: "Please provide a valid description.",
    required_error: "Please provide description.",
  }),
  vehicle_id: z.string({
    invalid_type_error: "Please provide a valid description.",
    required_error: "Please provide description.",
  }),
  slot_id: z.string({
    invalid_type_error: "Please provide a valid description.",
    required_error: "Please provide description.",
  }),
  reservation_duration: z.coerce.number({
    invalid_type_error: "Please provide a duration for the reservation.",
  }),
  start_time: z.coerce.date({
    invalid_type_error: "Please provide a starting time for the reservationr.",
  }),
  current_page: z.coerce.number({
    invalid_type_error: "Please provide a duration for the reservation.",
  }),
  size: z.coerce.number({
    invalid_type_error: "Please provide a duration for the reservation.",
  }),
});

export { AdminSchema, ApplicantSchema, CenterSchema, RequestReservationSchema, ReserveSlotSchema };
