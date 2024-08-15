import { z } from "zod";

// Define the schema for the parking center
const ParkingCenterSchema = z.object({
  center_name: z.string().min(1, "Parking center name is required"),
  description: z.string().min(1, "Description is required"),
  address: z
    .string()
    .min(1, "Address is required"),
  latitude: z.number().refine((val) => val >= -90 && val <= 90, {
    message: "Latitude must be between -90 and 90",
  }),
  longitude: z.number().refine((val) => val >= -180 && val <= 180, {
    message: "Longitude must be between -180 and 180",
  }),
});

// Define the schema
const vehicleSchema = z.object({
  make: z
    .string()
    .min(1, { message: "Make is required" })
    .max(50, { message: "Make should not exceed 50 characters" }),
  model: z
    .string()
    .min(1, { message: "Model is required" })
    .max(50, { message: "Model should not exceed 50 characters" }),
  year: z
    .string()
    .regex(/^\d{4}$/, { message: "Year should be a 4-digit number" })
    .refine(
      (year) => {
        const currentYear = new Date().getFullYear();
        return parseInt(year) >= 1886 && parseInt(year) <= currentYear;
      },
      {
        message: "Year should be between 1886 and the current year",
      }
    ),
  vin: z
    .string()
    .length(17, { message: "VIN must be exactly 17 characters long" }),
  color: z
    .string()
    .min(1, { message: "Color is required" })
    .max(30, { message: "Color should not exceed 30 characters" }),
  type: z
    .string()
    .min(1, { message: "Type is required" })
    .max(30, { message: "Type should not exceed 30 characters" }),
});

// Export the schema
export { vehicleSchema };


export default ParkingCenterSchema;
