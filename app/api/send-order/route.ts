import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { CartItem } from "@/context/CartContext";
import { CustomerDetails } from "@/lib/whatsapp";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items, totalStr, customerDetails, discountPercentage } = body as {
      items: CartItem[];
      totalStr: string;
      customerDetails: CustomerDetails;
      discountPercentage?: number;
    };

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, error: "Cart items are empty." },
        { status: 400 }
      );
    }

    const recipientEmail =
      process.env.ORDER_NOTIFICATION_EMAIL || "ashiryeyy@gmail.com";
    const orderId = `VG-${Date.now().toString().slice(-6)}`;
    const orderDate = new Date().toLocaleString("en-GB", {
      dateStyle: "full",
      timeStyle: "short",
    });

    // Generate HTML Email Content
    const itemsHtml = items
      .map((item, idx) => {
        let customDetailsHtml = "";
        if (item.customMeasurements) {
          const { chest, length, armLength, notes } = item.customMeasurements;
          customDetailsHtml = `
            <div style="margin-top: 6px; padding: 6px 10px; background: #2a221b; border-left: 2px solid #c8a064; font-size: 12px; color: #d4c5b3;">
              <strong>📐 Tailored Made-to-Measure:</strong><br/>
              ${chest ? `• Chest: ${chest}<br/>` : ""}
              ${length ? `• Length: ${length}<br/>` : ""}
              ${armLength ? `• Arm Length: ${armLength}<br/>` : ""}
              ${notes ? `• Special Notes: <em>"${notes}"</em>` : ""}
            </div>
          `;
        }

        return `
          <tr style="border-bottom: 1px solid #2e261f;">
            <td style="padding: 12px 16px; color: #f4ede3; font-weight: 500;">
              ${idx + 1}. ${item.name}
              <div style="font-size: 12px; color: #a39585; margin-top: 2px;">Size: ${item.size}</div>
              ${customDetailsHtml}
            </td>
            <td style="padding: 12px 16px; color: #d4c5b3; text-align: center;">${item.qty}</td>
            <td style="padding: 12px 16px; color: #d4c5b3; text-align: right;">${item.price}</td>
          </tr>
        `;
      })
      .join("");

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8"/>
        <title>New Order ${orderId} — VERGE Studio</title>
      </head>
      <body style="background-color: #120e0b; color: #f4ede3; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; margin: 0; padding: 24px;">
        <div style="max-width: 600px; margin: 0 auto; background: #1a1410; border: 1px solid #332a22; border-radius: 6px; overflow: hidden; box-shadow: 0 16px 40px rgba(0,0,0,0.5);">
          
          <!-- Header -->
          <div style="background: #241c16; padding: 24px; text-align: center; border-bottom: 1px solid #332a22;">
            <h1 style="color: #c8a064; font-size: 24px; letter-spacing: 0.15em; text-transform: uppercase; margin: 0 0 6px 0;">VERGE STUDIO</h1>
            <p style="color: #a39585; font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; margin: 0;">New Atelier Order Notification</p>
          </div>

          <!-- Order Summary Badge -->
          <div style="padding: 24px;">
            <div style="background: rgba(200, 160, 100, 0.08); border: 1px dashed #c8a064; border-radius: 4px; padding: 16px; margin-bottom: 24px; display: flex; justify-content: space-between;">
              <div>
                <span style="font-size: 12px; color: #a39585; text-transform: uppercase; letter-spacing: 0.05em; display: block;">Order Reference</span>
                <strong style="font-size: 18px; color: #f4ede3;">${orderId}</strong>
              </div>
              <div style="text-align: right;">
                <span style="font-size: 12px; color: #a39585; text-transform: uppercase; letter-spacing: 0.05em; display: block;">Date</span>
                <span style="font-size: 13px; color: #d4c5b3;">${orderDate}</span>
              </div>
            </div>

            <!-- Customer Details -->
            <h2 style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; color: #c8a064; border-bottom: 1px solid #332a22; padding-bottom: 8px; margin-top: 0;">👤 Customer Information</h2>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px; color: #d4c5b3;">
              <tr><td style="padding: 4px 0; color: #a39585; width: 120px;">Name:</td><td><strong>${customerDetails.fullName || "N/A"}</strong></td></tr>
              <tr><td style="padding: 4px 0; color: #a39585;">Phone:</td><td><a href="tel:${customerDetails.phone}" style="color: #25D366; text-decoration: none;">${customerDetails.phone || "N/A"}</a></td></tr>
              ${customerDetails.email ? `<tr><td style="padding: 4px 0; color: #a39585;">Email:</td><td><a href="mailto:${customerDetails.email}" style="color: #c8a064; text-decoration: none;">${customerDetails.email}</a></td></tr>` : ""}
              <tr><td style="padding: 4px 0; color: #a39585;">City:</td><td>${customerDetails.city || "N/A"}</td></tr>
              <tr><td style="padding: 4px 0; color: #a39585;">Address:</td><td>${customerDetails.address || "N/A"}</td></tr>
              ${customerDetails.notes ? `<tr><td style="padding: 4px 0; color: #a39585; vertical-align: top;">Special Notes:</td><td style="font-style: italic; color: #f4ede3;">"${customerDetails.notes}"</td></tr>` : ""}
            </table>

            <!-- Items Table -->
            <h2 style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; color: #c8a064; border-bottom: 1px solid #332a22; padding-bottom: 8px; margin-top: 0;">📄 Itemized Order Breakdown</h2>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 13px;">
              <thead>
                <tr style="background: #241c16; color: #a39585; text-align: left; text-transform: uppercase; font-size: 11px; letter-spacing: 0.05em;">
                  <th style="padding: 10px 16px;">Product</th>
                  <th style="padding: 10px 16px; text-align: center;">Qty</th>
                  <th style="padding: 10px 16px; text-align: right;">Price</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
            </table>

            <!-- Total Breakdown -->
            <div style="background: #241c16; padding: 16px 20px; border-radius: 4px; border: 1px solid #332a22; text-align: right;">
              ${discountPercentage && discountPercentage > 0 ? `<div style="font-size: 12px; color: #c8a064; margin-bottom: 4px;">Promo Discount Applied: ${(discountPercentage * 100).toFixed(0)}%</div>` : ""}
              <div style="font-size: 18px; color: #f4ede3; font-weight: bold;">
                TOTAL AMOUNT: <span style="color: #c8a064;">${totalStr}</span>
              </div>
            </div>

            <!-- Footer -->
            <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #2e261f; text-align: center; font-size: 12px; color: #736556;">
              This notification was generated automatically from your VERGE Leather Store online concierge checkout.
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    const plainTextContent = `NEW ORDER NOTIFICATION (${orderId})\n` +
      `Date: ${orderDate}\n\n` +
      `CUSTOMER DETAILS:\n` +
      `Name: ${customerDetails.fullName}\n` +
      `Phone: ${customerDetails.phone}\n` +
      (customerDetails.email ? `Email: ${customerDetails.email}\n` : "") +
      `City: ${customerDetails.city}\n` +
      `Address: ${customerDetails.address}\n` +
      (customerDetails.notes ? `Notes: ${customerDetails.notes}\n` : "") +
      `\nORDER ITEMS:\n` +
      items.map((i, idx) => `${idx + 1}. ${i.name} (${i.size}) x${i.qty} - ${i.price}`).join("\n") +
      `\n\nTOTAL AMOUNT: ${totalStr}`;

    // Check if SMTP credentials exist in environment variables
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
        from: `"VERGE Orders" <${smtpUser}>`,
        to: recipientEmail,
        replyTo: customerDetails.email || recipientEmail,
        subject: `🛒 New Order ${orderId} — ${customerDetails.fullName} (${totalStr})`,
        text: plainTextContent,
        html: htmlContent,
      });

      console.log(`[Order Email] Order ${orderId} sent successfully to ${recipientEmail}`);

      return NextResponse.json({
        success: true,
        orderId,
        recipient: recipientEmail,
        emailSent: true,
        message: `Order email sent successfully to ${recipientEmail}`,
      });
    } else {
      // Log for developer awareness when SMTP credentials are not configured yet
      console.log(
        `[Order Email Simulation] Order ${orderId} created for ${recipientEmail}.\n` +
        `To send real emails, set SMTP_USER and SMTP_PASS in .env.local`
      );

      return NextResponse.json({
        success: true,
        orderId,
        recipient: recipientEmail,
        emailSent: false,
        simulated: true,
        message: `Order processed for ${recipientEmail}. Configure SMTP_USER and SMTP_PASS in .env.local for live SMTP delivery.`,
      });
    }
  } catch (error: any) {
    console.error("[Order Email Error]", error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Failed to process order notification email.",
      },
      { status: 500 }
    );
  }
}
