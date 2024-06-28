import { z } from "zod";

const UserSchema = z.object({
  email: z
    .string()
    .min(1, "Please input email address before proceeding")
    .email("Please provide a valid email address."),
  name: z.string().min(1, "Please input name before proceeding"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long.")
    .max(100, "Description cannot exceed 100 characters."),
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

export default UserSchema;
