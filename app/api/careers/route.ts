import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";
import { careersApiSchema } from "../../validation/careers";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const cvFile = formData.get("cv") as File;

    if (!cvFile) {
      return NextResponse.json(
        { error: "CV file is required" },
        { status: 400 }
      );
    }

    const validated = careersApiSchema.parse({ fullName, email, phone });

    // Validate file size (10MB limit)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (cvFile.size > maxSize) {
      return NextResponse.json(
        { error: "File size exceeds 10MB limit" },
        { status: 400 }
      );
    }

    // Convert file to buffer for email attachment
    const bytes = await cvFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Sanitize filename to prevent issues
    const sanitizedFilename = cvFile.name.replace(/[^a-zA-Z0-9._-]/g, '_');

    // Check if SMTP is configured
    if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
      console.error("SMTP credentials not configured");
      console.error("SMTP_USER:", process.env.SMTP_USER ? "Set" : "Missing");
      console.error("SMTP_PASSWORD:", process.env.SMTP_PASSWORD ? "Set" : "Missing");
      if (process.env.NODE_ENV === "development") {
        console.log("Email would be sent to:", process.env.CAREERS_EMAIL);
        console.log("Application data:", validated);
        console.log("CV file:", cvFile.name, `(${(cvFile.size / 1024 / 1024).toFixed(2)} MB)`);
        return NextResponse.json(
          { message: "Application received (email not configured)" },
          { status: 200 }
        );
      }
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.SMTP_USER,
      replyTo: validated.email, // So replies go to the form submitter
      to: process.env.CAREERS_EMAIL,
      subject: `New Career Application from ${validated.fullName}`,
      html: `
        <h2>New Career Application</h2>
        <p><strong>Full Name:</strong> ${validated.fullName}</p>
        <p><strong>Email:</strong> ${validated.email}</p>
        <p><strong>Phone:</strong> ${validated.phone}</p>
        <p><strong>CV File:</strong> ${cvFile.name} (${(cvFile.size / 1024 / 1024).toFixed(2)} MB)</p>
      `,
      attachments: [
        {
          filename: sanitizedFilename,
          content: buffer,
          contentType: cvFile.type || 'application/pdf',
        },
      ],
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Application submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.issues },
        { status: 400 }
      );
    }

    console.error("Error processing application:", error);
    
    // Provide more specific error messages
    let errorMessage = "Failed to submit application";
    if (error && typeof error === 'object' && 'code' in error) {
      if (error.code === 'EAUTH') {
        errorMessage = "Email authentication failed. Please check SMTP credentials.";
      } else if (error.code === 'EMESSAGE') {
        errorMessage = "Email message error. File may be too large.";
      }
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
