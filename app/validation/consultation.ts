import { z } from "zod";

export const consultationSchema = z.object({
  fullName: z.string().min(1, "Full Name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  phone: z.string().min(1, "Phone is required").min(10, "Phone number must be at least 10 digits"),
  vesselType: z.string().min(1, "Vessel Type is required"),
  serviceCategory: z.string().min(1, "Service Category is required"),
  requirements: z.string().min(1, "Requirements is required").min(10, "Please provide detailed requirements"),
});

export type ConsultationFormData = z.infer<typeof consultationSchema>;
