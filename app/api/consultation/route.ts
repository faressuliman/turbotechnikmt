import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

const consultationSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  vesselType: z.string().min(2),
  serviceCategory: z.string().min(1),
  requirements: z.string().min(10),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = consultationSchema.parse(body);

    // Check if SMTP is configured
    if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
      console.error("SMTP credentials not configured");
      // In development, you might want to log the email instead of failing
      if (process.env.NODE_ENV === "development") {
        console.log("Email would be sent to:", process.env.CONTACT_EMAIL || "info@turbotechnik.com");
        console.log("Email content:", validated);
        return NextResponse.json(
          { message: "Consultation request received (email not configured)" },
          { status: 200 }
        );
      }
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    // Create transporter - configure with your email service
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.SMTP_USER || "noreply@turbotechnik.com",
      to: process.env.CONTACT_EMAIL || "info@turbotechnik.com", // You'll provide this later
      subject: `New Consultation Request from ${validated.fullName}`,
      html: `
        <h2>New Consultation Request</h2>
        <p><strong>Full Name:</strong> ${validated.fullName}</p>
        <p><strong>Email:</strong> ${validated.email}</p>
        <p><strong>Phone:</strong> ${validated.phone}</p>
        <p><strong>Vessel Type:</strong> ${validated.vesselType}</p>
        <p><strong>Service Category:</strong> ${validated.serviceCategory}</p>
        <p><strong>Requirements:</strong></p>
        <p>${validated.requirements.replace(/\n/g, "<br>")}</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Consultation request submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.issues },
        { status: 400 }
      );
    }

    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to submit consultation request" },
      { status: 500 }
    );
  }
}
