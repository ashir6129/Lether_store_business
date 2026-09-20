import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

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
      process.env.ORDER_NOTIFICATION_EMAIL || "ashiryeyy@gmail.com";

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

    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const smtpPort = parseInt(process.env.SMTP_PORT || "465");
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      await transporter.sendMail({
        from: \`"VERGE Contact" <\${smtpUser}>\`,
        to: recipientEmail,
        replyTo: email,
        subject: \`📩 New Inquiry: \${topic || "General"} — \${fullName}\`,
        text: plainTextContent,
        html: htmlContent,
      });

      console.log(\`[Contact Email] Message from \${fullName} sent successfully to \${recipientEmail}\`);

      return NextResponse.json({
        success: true,
        message: "Message sent successfully.",
      });
    } else {
      console.log(
        \`[Contact Email Simulation] Message from \${fullName} to \${recipientEmail}. \n` +
        \`To send real emails, set SMTP_USER and SMTP_PASS in .env.local\`
      );

      return NextResponse.json({
        success: true,
        simulated: true,
        message: "Message processed. Configure SMTP_USER and SMTP_PASS for live delivery.",
      });
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
