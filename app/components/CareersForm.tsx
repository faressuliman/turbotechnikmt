"use client";

import { motion } from "framer-motion";
import { CheckCircle, Upload, ArrowDownRight, Info } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { careersSchema, careersTextFieldsSchema, type CareersFormData } from "../validation/careers";

export default function CareersForm() {
  const [formData, setFormData] = useState<CareersFormData>({
    fullName: "",
    email: "",
    phone: "",
    cv: null,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof CareersFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof CareersFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, cv: file }));
      if (errors.cv) {
        setErrors((prev) => ({ ...prev, cv: undefined }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      // Validate text fields
      const textFieldsValidated = careersTextFieldsSchema.parse({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
      });

      // Check CV
      if (!formData.cv) {
        setErrors({ cv: "CV/Security Clearance is required" });
        return;
      }

      const validated = {
        ...textFieldsValidated,
        cv: formData.cv,
      };

      setIsSubmitting(true);

      const formDataToSend = new FormData();
      formDataToSend.append("fullName", validated.fullName);
      formDataToSend.append("email", validated.email);
      formDataToSend.append("phone", validated.phone);
      formDataToSend.append("cv", validated.cv);

      const response = await fetch("/api/careers", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to submit form");
      }

      setIsSuccess(true);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        cv: null,
      });

      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof CareersFormData, string>> = {};
        error.issues.forEach((err: z.ZodIssue) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof CareersFormData] = err.message;
          }
        });
        // Also check CV if it's missing
        if (!formData.cv) {
          fieldErrors.cv = "CV/Security Clearance is required";
        }
        setErrors(fieldErrors);
      } else {
        const errorMessage = error instanceof Error ? error.message : "Failed to submit. Please try again.";
        // Only show CV error if CV is missing; otherwise rely on general messaging/UI
        if (!formData.cv) {
          setErrors({ cv: errorMessage });
        } else {
          setErrors({ cv: undefined });
        }
        console.error(errorMessage);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      className="mx-auto max-w-2xl"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-4 sm:mb-6">
        <div className="mb-2 flex flex-wrap items-center gap-2 sm:gap-3">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#07254B]">Join the Elite Fleet</h2>
          <ArrowDownRight className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-[#07254B]" />
        </div>
        <p className="text-xs sm:text-sm md:text-base text-[#4B6F9B]">
          We are looking for the next generation of technical minds who understand that Marine Trading is an engineering discipline. If you are a Mariner with a passion for &quot;Technik&quot; and global logistics, transmit your dossier.
        </p>
      </div>
      {isSuccess ? (
        <motion.div
          className="flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-50 to-green-50 border-2 border-emerald-200/50 p-12 shadow-lg"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <CheckCircle className="mb-4 h-16 w-16 text-emerald-500" />
          </motion.div>
          <p className="text-xl font-semibold text-[#07254B] mb-2">Thank you!</p>
          <p className="text-[#4B6F9B]">We&apos;ll review your application soon.</p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
            <div>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full border-2 border-[#CEF3FF] bg-white px-4 py-3 text-[#07254B] transition-all duration-150 focus:border-[#0A3251] focus:outline-none placeholder:text-xs sm:placeholder:text-base placeholder:text-[#4B6F9B]/50"
                placeholder="Full Name"
              />
              {errors.fullName && (
                <p className="mt-1 flex items-center gap-1 text-xs sm:text-base text-red-500">
                  <Info className="text-red-700 w-3 h-3" />
                  {errors.fullName}
                </p>
              )}
            </div>
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border-2 border-[#CEF3FF] bg-white px-4 py-3 text-[#07254B] transition-all duration-150 focus:border-[#0A3251] focus:outline-none placeholder:text-xs sm:placeholder:text-base placeholder:text-[#4B6F9B]/50"
                placeholder="Email Address"
              />
              {errors.email && (
                <p className="mt-1 flex items-center gap-1 text-xs sm:text-base text-red-500">
                  <Info className="text-red-700 w-3 h-3" />
                  {errors.email}
                </p>
              )}
            </div>
          </div>
          <div>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border-2 border-[#CEF3FF] bg-white px-4 py-3 text-[#07254B] transition-all duration-300 delay-75 focus:border-[#07254B] focus:outline-none placeholder:text-xs sm:placeholder:text-base placeholder:text-[#4B6F9B]/50"
              placeholder="Phone Number"
            />
            {errors.phone && (
              <p className="mt-1 flex items-center gap-1 text-sm text-red-500">
                <Info className="text-red-700 w-3 h-3" />
                {errors.phone}
              </p>
            )}
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-[#07254B]">
              Upload Security Clearance / CV *
            </label>
            <div className="relative">
              <input
                type="file"
                name="cv"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
                className="absolute inset-0 w-full cursor-pointer opacity-0"
              />
              <div className="flex items-center gap-3 border-2 border-dashed border-[#CEF3FF] bg-white p-4 sm:p-6 transition-all duration-150 hover:border-[#0A3251] focus-within:border-[#0A3251]">
                <Upload className="h-6 w-6 text-[#07254B]" />
                <div>
                  <p className="text-sm font-medium text-[#07254B]">
                    {formData.cv ? formData.cv.name : "Click to upload or drag and drop"}
                  </p>
                  <p className="text-xs text-[#4B6F9B]">PDF, DOC, DOCX (MAX. 10MB)</p>
                </div>
              </div>
            </div>
            {errors.cv && (
              <p className="mt-1 flex items-center gap-1 text-sm text-red-500">
                <Info className="text-red-700 w-3 h-3" />
                {errors.cv}
              </p>
            )}
          </div>
          <motion.button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-gradient-to-r from-[#0A3251] to-[#07254B] px-6 py-4 font-semibold text-white transition-all hover:shadow-lg disabled:cursor-not-allowed disabled:hover:bg-gradient-to-r disabled:hover:from-[#0A3251] disabled:hover:to-[#07254B] cursor-pointer mt-2 sm:mt-0 flex items-center justify-center"
            whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
          >
            {isSubmitting ? (
              <>
                <svg
                  className="mr-3 -ml-1 w-5 h-5 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span className="text-sm sm:text-base">Submitting...</span>
              </>
            ) : (
              <span className="text-sm sm:text-base">Submit Application</span>
            )}
          </motion.button>
        </form>
      )}
    </motion.div>
  );
}
