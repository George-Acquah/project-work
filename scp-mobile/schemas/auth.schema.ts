import { z } from 'zod'

const AuthSchema = z.object({
  email: z
    .string()
    
    .email("Please provide a valid email address."),
  password: z
    .string({
      required_error: "Please input password.",
    })
    .min(6, "Password must be greater than 6 characters."),
  phone_number: z.coerce.number({
    invalid_type_error: "Please input valid phone number.",
    required_error: "Please input phone number.",
  }),
});

export default AuthSchema;