import { z } from 'zod'

const AuthSchema = z.object({
  email: z.string().email("Please provide a valid email address."),
  password: z
    .string({
      required_error: "Please input password.",
    })
    .min(6, "Password must be greater than 6 characters."),
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
});

export default AuthSchema;