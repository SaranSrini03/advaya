import { transporter } from "@/app/utils/transporter";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const { email, name, events, id } = await req.json();

    if (!email || !name || !events || !id) {
      return NextResponse.json(
        {
          error: "All fields are required",
        },
        { status: 400 }
      );
    }

    const qrObject = {
      name,
      id,
      events,
    };

    const qrData = encodeURIComponent(JSON.stringify(qrObject));
    const QR_CODE = `<img src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${qrData}" alt="QR Code" />`;

    const mailOptions = {
      from: '"Advaya2k25" <noreply@gmail.com>',
      to: email,
      subject: `MR/MS ${name} #${id} Registration Confirmation`,
      html: `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <title>Advaya 2025 Pass</title>
    <style>
      body {
        background-color: #0e0e25;
        margin: 0;
        padding: 0;
        font-family: 'Arial', sans-serif;
        color: #f1f1f1;
      }
      .container {
        max-width: 500px;
        margin: 40px auto;
        padding: 20px;
        background: linear-gradient(145deg, #1a1a3b, #121230);
        border-radius: 16px;
        border: 2px solid #2c2c5a;
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
      }
      .header {
        text-align: center;
        font-size: 24px;
        font-weight: bold;
        color: #ffffff;
        margin-bottom: 10px;
        text-transform: uppercase;
        letter-spacing: 1px;
      }
      .sub-header {
        text-align: center;
        font-size: 16px;
        color: #ffb400;
        font-weight: bold;
        margin-bottom: 30px;
      }
      .info-row {
        display: flex;
        justify-content: space-between;
        margin: 10px 0;
        padding: 8px 12px;
        background-color: #19193a;
        border-radius: 8px;
        font-size: 14px;
      }
      .info-row span.label {
        color: #bbbbbb;
      }
      .info-row span.value {
        font-weight: 600;
        color: #ffffff;
      }
      .qr {
        width: 120px;
        height: 120px;
        background: #2f2f58;
        color: #cccccc;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 12px;
        margin: 30px auto;
        font-size: 12px;
        border: 1px dashed #555;
      }
      .footer {
        text-align: center;
        font-size: 12px;
        color: #999;
        margin-top: 30px;
        line-height: 1.4;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">${name}</div>
      <div class="sub-header">Event Participant</div>

      <div class="info-row">
        <span class="label">Event Dates:</span>
        <span class="value"> 06 - 07 May 2025</span>
      </div>
      <div class="info-row">
        <span class="label">Location:</span>
        <span class="value"> Bangalore, IN</span>
      </div>
      <div class="info-row">
        <span class="label">Pass Type:</span>
        <span class="value"> General Admission</span>
      </div>

      <div class="qr">${QR_CODE}</div>

      <div class="footer">
        Present this pass at the event entrance.<br />
        Screenshots are valid.<br />
        For assistance, contact student or faculty coordinators.
      </div>
    </div>
  </body>
  </html>
  `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      {
        message: "Email sent successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
