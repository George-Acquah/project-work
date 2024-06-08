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

export default ParkingCenterSchema;
