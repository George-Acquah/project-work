import * as z from "zod";

const PaymentSchema = z.object({
  phone_number: z
    .string({
      required_error: "Please input your phone number before proceeding",
    })
    .min(1, "Please input your phone number before proceeding"),
  amount: z.coerce.number().min(1, "Amount must be greater than zero"),
});

export default PaymentSchema;
