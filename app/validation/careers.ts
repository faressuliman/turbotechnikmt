import { z } from "zod";

// Schema for form validation (includes CV)
export const careersSchema = z.object({
  fullName: z.string().min(4, "Full Name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  phone: z.string().min(1, "Phone is required").min(10, "Phone number must be at least 10 digits"),
  cv: z.instanceof(File, { message: "CV/Security Clearance is required" }),
});

// Schema for text fields validation only (used in form before checking CV)
export const careersTextFieldsSchema = z.object({
  fullName: z.string().min(4, "Full Name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  phone: z.string().min(1, "Phone is required").min(10, "Phone number must be at least 10 digits"),
});

// Schema for API validation (text fields only, CV handled separately)
export const careersApiSchema = z.object({
  fullName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(10),
});

export type CareersFormData = {
  fullName: string;
  email: string;
  phone: string;
  cv: File | null;
};
