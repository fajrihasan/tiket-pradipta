import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendTicketEmail(
  to: string,
  buyerName: string,
  qrBuffers: { qrCode: string; buffer: Buffer }[],
) {
  const attachments = qrBuffers.map((qr, i) => ({
    filename: `tiket-${i + 1}.png`,
    content: qr.buffer,
    cid: `qr-${i}`,
  }));

  const qrImagesHtml = qrBuffers
    .map(
      (_, i) =>
        `<div style="text-align:center;margin:16px 0;">
          <p style="font-size:14px;color:#666;">Tiket ${i + 1}</p>
          <img src="cid:qr-${i}" width="200" height="200" alt="QR Tiket ${i + 1}" />
        </div>`,
    )
    .join("");

  await transporter.sendMail({
    from: `"PRADIPTA 2026" <${process.env.SMTP_USER}>`,
    to,
    subject: "🎫 Tiket PRADIPTA 2026 — Pembayaran Berhasil!",
    html: `
      <div style="font-family:Arial,sans-serif;max-width:500px;margin:0 auto;padding:24px;">
        <h1 style="color:#7c3aed;text-align:center;">PRADIPTA 2026</h1>
        <p>Halo <strong>${buyerName}</strong>,</p>
        <p>Pembayaran tiket kamu sudah berhasil! 🎉</p>
        <p>Berikut QR Code tiket kamu. Tunjukkan QR code ini saat masuk venue.</p>
        ${qrImagesHtml}
        <hr style="border:none;border-top:1px solid #eee;margin:24px 0;" />
        <p style="font-size:12px;color:#999;text-align:center;">
          © PRADIPTA 2026 — Spark of Radiance<br/>
          SMK Negeri 5 Malang
        </p>
      </div>
    `,
    attachments,
  });
}
