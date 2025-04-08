import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "dev.naveen.rajan.m@gmail.com",
    pass: process.env.NEXT_PUBLIC_EMAIL_PASS,
  },
});
