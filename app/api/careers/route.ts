import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";
// Removed file system imports - using email attachment instead
// For cloud storage, you would import: import { v2 as cloudinary } from 'cloudinary';

const careersSchema = z.object({
  fullName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(10),
});

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

    const validated = careersSchema.parse({ fullName, email, phone });

    // Convert file to buffer for email attachment
    const bytes = await cvFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // For production: Use cloud storage (Cloudinary, AWS S3, etc.) instead of server storage
    // Serverless platforms (Vercel, Netlify) don't support persistent file storage
    // Option 1: Attach directly to email (current approach - works but has size limits)
    // Option 2: Upload to cloud storage and send download link in email (recommended)

    // Check if SMTP is configured
    if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
      console.error("SMTP credentials not configured");
      if (process.env.NODE_ENV === "development") {
        console.log("Email would be sent to:", process.env.CAREERS_EMAIL || "careers@turbotechnik.com");
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
      from: process.env.SMTP_USER || "noreply@turbotechnik.com",
      to: process.env.CAREERS_EMAIL || "careers@turbotechnik.com",
      subject: `New Career Application from ${validated.fullName}`,
      html: `
        <h2>New Career Application</h2>
        <p><strong>Full Name:</strong> ${validated.fullName}</p>
        <p><strong>Email:</strong> ${validated.email}</p>
        <p><strong>Phone:</strong> ${validated.phone}</p>
        <p><strong>CV File:</strong> ${cvFile.name} (${(cvFile.size / 1024 / 1024).toFixed(2)} MB)</p>
        <p><em>The CV is attached to this email. For better reliability with large files, consider using cloud storage (Cloudinary/S3) and sending a download link instead.</em></p>
      `,
      attachments: [
        {
          filename: cvFile.name,
          content: buffer,
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
    return NextResponse.json(
      { error: "Failed to submit application" },
      { status: 500 }
    );
  }
}
