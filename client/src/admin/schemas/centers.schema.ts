import { z } from "zod";

// Enum for CenterTypes as per the server schema
const CenterTypes = z.enum(["Type1", "Type2", "Type3"]); // Replace with actual types

// Schema for Parking Center
const ParkingCenterSchema = z.object({
  center_name: z
    .string()
    .min(1, "Center name is required.")
    .max(100, "Center name cannot exceed 100 characters."),

  description: z
    .string()
    .min(10, "Description should be at least 10 characters long.")
    .max(500, "Description cannot exceed 500 characters."),

  type: CenterTypes,

  owner: z
    .string()
    .min(1, "Owner ID is required.")
    .regex(/^[0-9a-fA-F]{24}$/, "Owner ID must be a valid ObjectId."),
});
