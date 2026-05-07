/**
 * VoxPop Contact Form API Route
 *
 * Handles contact form submissions and sends email notifications.
 * For now, stores submissions in memory and logs them.
 * TODO: Add email sending via SendGrid/Resend when ready.
 *
 * @route POST /api/contact
 */

import { NextRequest, NextResponse } from "next/server";

interface ContactSubmission {
  name: string;
  email: string;
  organization?: string;
  subject: string;
  message: string;
  timestamp: string;
}

// In-memory store for contact submissions (replace with DB later)
const submissions: ContactSubmission[] = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const { name, email, subject, message, organization } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, subject, message" },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Valid subjects
    const validSubjects = ["demo", "pricing", "partnership", "press", "other"];
    if (!validSubjects.includes(subject)) {
      return NextResponse.json(
        { error: "Invalid subject" },
        { status: 400 }
      );
    }

    // Store submission
    const submission: ContactSubmission = {
      name,
      email,
      organization: organization || undefined,
      subject,
      message,
      timestamp: new Date().toISOString(),
    };

    submissions.push(submission);

    // Log for now (replace with email sending later)
    console.log("[VoxPop Contact]", JSON.stringify(submission, null, 2));

    return NextResponse.json(
      {
        success: true,
        message: "Your message has been received. We will respond within 24 business hours.",
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}

// GET endpoint for admin to list submissions (protected in production)
export async function GET() {
  return NextResponse.json({
    count: submissions.length,
    submissions: submissions.slice(-10), // Last 10
  });
}
