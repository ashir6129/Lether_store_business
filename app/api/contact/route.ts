import { NextResponse } from "next/server";
import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY as string;
const resend = new Resend(resendApiKey);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, topic, message } = body as {
      fullName: string;
      email: string;
      topic: string;
      message: string;
    };

    if (!fullName || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    const recipientEmail =
      process.env.ORDER_NOTIFICATION_EMAIL || "ashir6129@gmail.com";

    const plainTextContent = `NEW CONTACT INQUIRY\n\n` +
      `From: ${fullName} (${email})\n` +
      `Topic: ${topic || "General"}\n\n` +
      `Message:\n${message}\n`;

    const htmlContent = `
      <h2>New Contact Inquiry - VERGE Studio</h2>
      <p><strong>From:</strong> ${fullName} (${email})</p>
      <p><strong>Topic:</strong> ${topic || "General"}</p>
      <hr />
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, "<br/>")}</p>
    `;

    try {
      const { data, error } = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: recipientEmail,
        replyTo: email,
        subject: `📩 New Inquiry: ${topic || "General"} — ${fullName}`,
        text: plainTextContent,
        html: htmlContent,
      });

      if (error) {
        throw new Error(error.message);
      }

      console.log(`[Contact Email] Message from ${fullName} sent successfully to ${recipientEmail}`);

      return NextResponse.json({
        success: true,
        message: "Message sent successfully.",
      });
    } catch (err: any) {
      console.error("[Contact Email Error]", err);
      throw err; // throw to outer catch block
    }
  } catch (error: any) {
    console.error("[Contact Email Error]", error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Failed to process contact email.",
      },
      { status: 500 }
    );
  }
}
