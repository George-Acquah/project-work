import * as z from "zod";

const PaymentSchema = z.object({
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
  amount: z.coerce.number().min(1, "Amount must be greater than zero"),
});

export default PaymentSchema;
