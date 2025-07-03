import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "Gmail", // or your preferred email service
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendEmail = async ({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) => {
  await transporter.sendMail({
    from: `"No Reply" <${process.env.SMTP_USER}>`,
    to,
    subject,
    html,
  });
};
