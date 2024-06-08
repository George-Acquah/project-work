import { z } from "zod";

const AccountSchema = z.object({
  first_name: z
    .string({
      required_error: "Please input your first name before proceeding",
    })
    .min(1, "Please input your first name before proceeding"),

  last_name: z
    .string({
      required_error: "Please input your last name before proceeding",
    })
    .min(1, "Please input your first name before proceeding"),
  phone_number: z
    .string({
      required_error: "Please input your phone number before proceeding",
    })
    .min(1, "Please input your phone number before proceeding")
    // Check if the phone number starts with 0
    .refine((val) => val.startsWith("0"), {
      message: "Phone number must start with 0",
    })
    // Check if the phone number is exactly 10 digits long
    .refine((val) => /^\d{10}$/.test(val), {
      message: "Phone number must be exactly 10 digits long",
    }),
  state: z.string().optional(),
  area: z.string().optional(),
  pinCode: z.string().optional(),
});

export default AccountSchema;
