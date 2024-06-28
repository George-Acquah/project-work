import { z } from "zod";

const stringToBoolean = (stringVal: string): boolean => {
  return stringVal.toLowerCase() === "true";
};

const FullUserSchema = z.object({
  email: z
    .string()
    .min(1, "Please input email address before proceeding")
    .email("Please provide a valid email address."),
  fullName: z.string().min(1, "Please input name before proceeding"),
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
  area: z.string().min(1, "Please input your area before proceeding"),
  city: z.string().min(1, "Please input your city before proceeding"),
  state: z.string().min(1, "Please input your state before proceeding"),
  isActive: z.string().transform((val: string) => stringToBoolean(val)),
  userType: z.enum(["ParkOwner", "Customer"]),
});

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

export { FullUserSchema }
export default UserSchema;
